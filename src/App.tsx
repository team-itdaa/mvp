import { useEffect, useState, useSyncExternalStore } from 'react'
import { collections as initialCollections, initialMemos, mapApps, mockShareUrl, parseRoute, places, updatePlaceFolders } from './mocks/data'
import type { Collection, MapApp, Page, Place } from './mocks/data'
import Icon from './components/Icon'
import ExplorePage from './pages/ExplorePage'
import LinkPage from './pages/LinkPage'
import ListsPage from './pages/ListsPage'
import SharePage from './pages/SharePage'
import MapSettingsPage from './pages/MapSettingsPage'

const navigation: { page: Page; label: string; icon: string; group: string }[] = [
  { page: 'explore', label: '장소 둘러보기', icon: 'compass', group: '둘러보기' },
  { page: 'link', label: '통합 링크 만들기', icon: 'link', group: '내 워크스페이스' },
  { page: 'lists', label: '내 리스트', icon: 'folder', group: '내 워크스페이스' },
  { page: 'share', label: '공유받은 장소', icon: 'share', group: '내 워크스페이스' },
]
const navigationGroups = ['둘러보기', '내 워크스페이스']
const subscribeToHash = (callback: () => void) => { window.addEventListener('hashchange', callback); return () => window.removeEventListener('hashchange', callback) }
const getHash = () => window.location.hash
const getServerHash = () => ''

export default function App() {
  const hash = useSyncExternalStore(subscribeToHash, getHash, getServerHash)
  const route = parseRoute(hash)
  const [collections, setCollections] = useState<Collection[]>(initialCollections)
  const [activeListId, setActiveListId] = useState(initialCollections[0].id)
  const [memos, setMemos] = useState(initialMemos)
  const [mapApp, setMapApp] = useState<MapApp>('naver')
  const [query, setQuery] = useState('')
  const [headerQuery, setHeaderQuery] = useState('')
  const [recent, setRecent] = useState(['onuel', 'seoul-forest'])
  const [notice, setNotice] = useState('')
  useEffect(() => { if (!notice) return; const timer = window.setTimeout(() => setNotice(''), 4500); return () => window.clearTimeout(timer) }, [notice])
  const activeList = collections.find(list => list.id === activeListId) || collections[0]
  const shareCollection = collections.find(list => `list-${list.id}` === route.placeId)
  const sharedPlace = places.find(place => place.id === (shareCollection?.placeIds[0] || route.placeId))
  const title = route.page === 'place' ? '장소 통합페이지' : route.page === 'settings' ? '기본 지도 설정' : navigation.find(n => n.page === route.page)!.label
  const sectionTitle = route.page === 'place' ? '장소 둘러보기' : navigation.find(n => n.page === route.page)?.group || '내 워크스페이스'
  const navigate = (page: Page, id?: string) => { window.location.assign(`#/${page}${id ? `/${id}` : ''}`); window.scrollTo({ top: 0 }) }
  const openCollection = (id: string) => { setActiveListId(id); navigate('lists') }
  const openPlace = (place: Place) => navigate('place', place.id)
  const sharePlace = (place: Place) => navigate('share', place.id)
  const savePlace = (placeId: string, folderIds: string[], newFolderName?: string) => {
    const newFolder: Collection | undefined = newFolderName ? { id: crypto.randomUUID(), name: newFolderName, emoji: '📍', color: 'lavender', placeIds: [placeId] } : undefined
    setCollections(previous => updatePlaceFolders(previous, placeId, folderIds, newFolder))
    const count = folderIds.length + (newFolder ? 1 : 0)
    setNotice(count ? `${count}개의 폴더에 저장했어요.` : '폴더에서 장소를 뺐어요.')
  }
  const copyLink = async (place: Place, collection?: Collection) => {
    const url = mockShareUrl(collection ? `list-${collection.id}` : place.id)
    try { await navigator.clipboard.writeText(url); setNotice('통합 링크를 복사했어요.') }
    catch { setNotice('복사할 수 없어요. 브라우저 주소나 생성된 링크를 직접 복사해 주세요.') }
  }
  const createCollection = (name: string) => {
    const list: Collection = { id: crypto.randomUUID(), name, emoji: '📍', color: 'lavender', placeIds: [] }
    setCollections(prev => [...prev, list]); setActiveListId(list.id); setNotice('새 폴더를 만들었어요.')
  }
  return (
    <div className="app-shell">
      <a className="skip-link" href="#main-content">본문으로 이동</a>
      <aside className="sidebar">
        <a className="brand" href="#/explore" aria-label="스내핀 장소 둘러보기"><span className="brand-mark"><Icon name="pin" size={25} /></span><span>snapin<small>장소와 사람을 잇다</small></span></a>
        <nav className="main-nav" aria-label="주 메뉴">{navigationGroups.map(group => <div className="nav-group" key={group}>{group !== '둘러보기' && <span className="nav-eyebrow">{group}</span>}{navigation.filter(item => item.group === group).map(item => <a key={item.page} className={`nav-item ${(item.page === route.page || (item.page === 'explore' && route.page === 'place')) ? 'active' : ''}`} href={`#/${item.page}`} aria-current={route.page === item.page || (item.page === 'explore' && route.page === 'place') ? 'page' : undefined}><Icon name={item.icon} size={19} /><span>{item.label}</span>{item.page === 'lists' && <small>{collections.length}</small>}</a>)}</div>)}</nav>
        <div className="sidebar-collections"><div className="sidebar-section-label"><span>내 폴더</span><a href="#/lists" aria-label="리스트 관리"><Icon name="plus" size={15} /></a></div>{collections.slice(0, 4).map(list => <button key={list.id} onClick={() => openCollection(list.id)} className="sidebar-list"><Icon name="folder" size={16} /><span>{list.name}</span><small>{list.placeIds.length}</small></button>)}</div>
        <div className="sidebar-promo"><span>✧</span><h3>좋은 장소는 함께 나눠요</h3><p>어떤 지도를 쓰든, 링크 하나로.</p><a href="#/link">장소 공유하기<Icon name="arrow" size={15} /></a></div>
        <div className="sidebar-bottom"><a className={`nav-item ${route.page === 'settings' ? 'active' : ''}`} href="#/settings" aria-current={route.page === 'settings' ? 'page' : undefined}><Icon name="settings" size={18} />기본 지도 설정<span className={`mini-map ${mapApp}`}>{mapApps.find(m => m.id === mapApp)!.letter}</span></a><div className="sidebar-footer"><span>TEAM ITDAA</span><span>© Snapin 2026</span></div></div>
      </aside>
      <div className="workspace"><header className="topbar"><div className="breadcrumb">{route.page !== 'explore' && <>{sectionTitle}<Icon name="chevron" size={12} /></>}<strong>{title}</strong></div><form className="top-search" onSubmit={e => { e.preventDefault(); setQuery(headerQuery); navigate('explore') }}><Icon name="search" size={16} /><input aria-label="전체 장소 검색" placeholder="어떤 장소를 찾고 있나요?" value={headerQuery} onChange={e => setHeaderQuery(e.target.value)} /><kbd>↵</kbd></form><div className="user-profile"><span className="avatar" aria-hidden="true">배</span><strong>배고픈귤</strong></div></header>
        <main id="main-content" key={route.page}>
          {route.page === 'explore' && <ExplorePage query={query} onQuery={setQuery} savedIds={[...new Set(collections.flatMap(folder => folder.placeIds))]} onOpen={openPlace} collections={collections} onCollection={openCollection} />}
          {route.page === 'link' && <LinkPage recent={recent} onGenerate={place => { setRecent(prev => [place.id, ...prev.filter(id => id !== place.id)]); setNotice('통합 링크가 준비됐어요.') }} onShare={sharePlace} onCopy={copyLink} />}
          {route.page === 'lists' && <ListsPage collections={collections} activeId={activeList.id} onSelect={setActiveListId} onCreate={createCollection} onRemove={(id, listId) => { setCollections(prev => prev.map(list => list.id === listId ? { ...list, placeIds: list.placeIds.filter(p => p !== id) } : list)); setNotice('리스트에서 장소를 뺐어요.') }} memos={memos} onMemo={(id, memo) => setMemos(prev => ({ ...prev, [id]: memo }))} onOpen={openPlace} onCopy={copyLink} onShare={list => navigate('share', `list-${list.id}`)} onExplore={() => navigate('explore')} />}
          {(route.page === 'place' || route.page === 'share') && <SharePage key={hash} place={sharedPlace} collection={shareCollection} isShared={route.page === 'share'} collections={collections} mapApp={mapApp} onMap={setMapApp} onSave={savePlace} onCopy={place => copyLink(place, shareCollection)} onOpenMap={() => setNotice(`${mapApps.find(app => app.id === mapApp)!.name} 연결 화면 예시입니다. 실제 앱은 실행하지 않아요.`)} onBack={() => navigate(route.page === 'place' ? 'explore' : 'link')} />}
          {route.page === 'settings' && <MapSettingsPage mapApp={mapApp} onMap={setMapApp} onConfirm={() => setNotice(`${mapApps.find(m => m.id === mapApp)!.name}를 기본 지도로 선택했어요.`)} />}
        </main><footer className="workspace-footer"><span>좋은 장소를 잇는 작은 시작, <b>snapin</b></span><span>© Snapin 2026</span></footer>
      </div>
      {notice && <div className="toast" role="status"><span className="toast-check"><Icon name="check" size={15} /></span>{notice}<button aria-label="알림 닫기" onClick={() => setNotice('')}><Icon name="close" size={14} /></button></div>}
    </div>
  )
}
