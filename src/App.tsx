import { useEffect, useState, useSyncExternalStore } from 'react'
import { collections as initialCollections, initialMemos, initialPublicMemos, mapApps, mockShareUrl, parseRoute, places, updatePlaceFolders, communityPosts } from './mocks/data'
import type { Collection, MapApp, Page, Place, CommunityPost } from './mocks/data'
import Icon from './components/Icon'
import ProfileDialog from './components/ProfileDialog'
import type { Profile } from './components/ProfileDialog'
import ProfileAvatar from './components/ProfileAvatar'
import SearchPage from './pages/SearchPage'
import PostPage from './pages/PostPage'
import HistoryPage from './pages/HistoryPage'
import type { HistoryEntry } from './pages/HistoryPage'
import MapBrand from './components/MapBrand'
import ExplorePage from './pages/ExplorePage'
import LinkPage from './pages/LinkPage'
import ListsPage from './pages/ListsPage'
import SharePage from './pages/SharePage'
import MapSettingsPage from './pages/MapSettingsPage'
import ReceiverPage from './pages/ReceiverPage'
import { clearDefaultMapApp, placeWebUrl, readDefaultMapApp, saveDefaultMapApp } from './lib/mapLinks'

const navigation: { page: Page; label: string; icon: string; group: string }[] = [
  { page: 'explore', label: '장소 둘러보기', icon: 'compass', group: '둘러보기' },
  { page: 'link', label: '통합 링크 만들기', icon: 'link', group: '내 워크스페이스' },
  { page: 'lists', label: '내 리스트', icon: 'folder', group: '내 워크스페이스' },
  { page: 'share', label: '공유받은 장소', icon: 'history', group: '내 워크스페이스' },
]
navigation.push({ page: 'mypage', label: '마이페이지', icon: 'user', group: '내 워크스페이스' })
const navigationGroups = ['둘러보기', '내 워크스페이스']
const subscribeToHash = (callback: () => void) => { window.addEventListener('hashchange', callback); return () => window.removeEventListener('hashchange', callback) }
const getHash = () => window.location.hash
const getServerHash = () => ''
const sharedIdsFromHash = (hash: string, folders: Collection[]) => {
  const route = parseRoute(hash)
  if ((route.page !== 'share' && route.page !== 'go') || !route.placeId) return []
  const folder = folders.find(item => `list-${item.id}` === route.placeId)
  return folder ? folder.placeIds : places.some(place => place.id === route.placeId) ? [route.placeId] : []
}

export default function App() {
  const hash = useSyncExternalStore(subscribeToHash, getHash, getServerHash)
  const route = parseRoute(hash)
  const [collections, setCollections] = useState<Collection[]>(initialCollections)
  const [activeListId, setActiveListId] = useState(initialCollections[0].id)
  const [memos, setMemos] = useState(initialMemos)
  const [publicMemos, setPublicMemos] = useState<Record<string, boolean>>(initialPublicMemos)
  const [profile, setProfile] = useState<Profile>({ nickname: '배고픈귤', email: 'gyul@snapin.kr' })
  const nickname = profile.nickname
  const [viewedIds, setViewedIds] = useState(['onuel', 'seoul-forest', 'table'])
  const [memoDates, setMemoDates] = useState<Record<string, string>>({})
  const [profileOpen, setProfileOpen] = useState(false)
  const [history, setHistory] = useState<HistoryEntry[]>(() => {
    const now = Date.now()
    return [...new Set([...sharedIdsFromHash(getHash(), initialCollections), 'sunset', 'paper'])].map((placeId, index) => ({ placeId, viewedAt: new Date(now - index * 86400000).toISOString() }))
  })
  // 이 브라우저에 저장된 기본 지도. 없으면 링크를 열 때마다 지도 앱 선택 화면을 보여 준다.
  const [defaultMap, setDefaultMap] = useState<MapApp | null>(readDefaultMapApp)
  const [mapApp, setMapApp] = useState<MapApp>(() => readDefaultMapApp() ?? 'naver')
  const updateDefaultMap = (app: MapApp | null) => {
    if (app) { saveDefaultMapApp(app); setMapApp(app) } else clearDefaultMapApp()
    setDefaultMap(app)
  }
  const [query, setQuery] = useState('')
  const [headerQuery, setHeaderQuery] = useState(() => parseRoute(getHash()).query || '')
  const [recent, setRecent] = useState(['onuel', 'seoul-forest'])
  const [notice, setNotice] = useState('')
  useEffect(() => { if (!notice) return; const timer = window.setTimeout(() => setNotice(''), 4500); return () => window.clearTimeout(timer) }, [notice])
  const activeList = collections.find(list => list.id === activeListId) || collections[0]
  const shareCollection = collections.find(list => `list-${list.id}` === route.placeId)
  const sharedPlace = places.find(place => place.id === (shareCollection?.placeIds[0] || route.placeId))
  useEffect(() => {
    const recordSharedVisit = () => {
      const ids = sharedIdsFromHash(getHash(), collections)
      if (ids.length) setHistory(previous => [...ids.map(placeId => ({ placeId, viewedAt: new Date().toISOString() })), ...previous.filter(entry => !ids.includes(entry.placeId))])
    }
    window.addEventListener('hashchange', recordSharedVisit)
    return () => window.removeEventListener('hashchange', recordSharedVisit)
  }, [collections])
  // 통합 링크를 받은 사람은 앱 메뉴 없이 수신자 화면만 본다.
  if (route.page === 'go') return <ReceiverPage targetId={route.placeId} collections={collections} defaultMap={defaultMap} onDefaultMap={updateDefaultMap} memos={memos} publicMemos={publicMemos} />
  const updateMemo = (id: string, memo: string) => { setMemos(previous => ({ ...previous, [id]: memo })); setMemoDates(previous => ({ ...previous, [id]: new Date().toISOString() })) }
  const updateVisibility = (id: string, visible: boolean) => setPublicMemos(previous => ({ ...previous, [id]: visible }))
  const ownPosts: CommunityPost[] = Object.entries(memos).flatMap(([placeId, text]) => publicMemos[placeId] && text.trim() ? [{ id: `memo-${placeId}`, placeId, author: nickname, title: `${places.find(place => place.id === placeId)?.name || '장소'}에서 남긴 메모`, body: [text], publishedAt: memoDates[placeId] || '2026-11-12T09:00:00+09:00', likes: 0, rating: 0, tags: ['방문 메모'] }] : [])
  const allPosts = [...communityPosts, ...ownPosts]
  const title = route.page === 'search' ? '통합검색' : route.page === 'post' ? '커뮤니티' : route.page === 'place' ? '장소 통합페이지' : route.page === 'settings' ? '기본 지도 설정' : navigation.find(n => n.page === route.page)!.label
  const sectionTitle = route.page === 'place' ? '장소 둘러보기' : navigation.find(n => n.page === route.page)?.group || '내 워크스페이스'
  const navigate = (page: Page, id?: string) => { window.location.assign(`#/${page}${id ? `/${id}` : ''}`); window.scrollTo({ top: 0 }) }
  const openCollection = (id: string) => { setActiveListId(id); navigate('lists') }
  const openPlace = (place: Place) => { setViewedIds(previous => [...new Set([...previous, place.id])]); navigate('place', place.id) }
  const openPost = (post: CommunityPost) => navigate('post', post.id)
  const sharePlace = (place: Place) => navigate('share', place.id)
  const savePlace = (placeId: string, folderIds: string[], newFolderName?: string, coverImage?: string) => {
    const newFolder: Collection | undefined = newFolderName ? { id: crypto.randomUUID(), name: newFolderName, emoji: '📍', color: 'lavender', coverImage, placeIds: [placeId] } : undefined
    setCollections(previous => updatePlaceFolders(previous, placeId, folderIds, newFolder))
    const count = folderIds.length + (newFolder ? 1 : 0)
    setNotice(count ? `${count}개의 폴더에 저장했어요.` : '폴더에서 장소를 뺐어요.')
  }
  const copyLink = async (place: Place, collection?: Collection) => {
    const url = mockShareUrl(collection ? `list-${collection.id}` : place.id)
    try { await navigator.clipboard.writeText(url); setNotice('통합 링크를 복사했어요.') }
    catch { setNotice('복사할 수 없어요. 브라우저 주소나 생성된 링크를 직접 복사해 주세요.') }
  }
  const createCollection = (name: string, coverImage?: string) => {
    const list: Collection = { id: crypto.randomUUID(), name, emoji: '📍', color: 'lavender', coverImage, placeIds: [] }
    setCollections(prev => [...prev, list]); setActiveListId(list.id); setNotice('새 폴더를 만들었어요.')
  }
  return (
    <div className="app-shell">
      <a className="skip-link" href="#main-content" onClick={event => { event.preventDefault(); document.getElementById('main-content')?.focus(); document.getElementById('main-content')?.scrollIntoView() }}>본문으로 이동</a>
      <aside className="sidebar">
        <a className="brand" href="#/explore" aria-label="스내핀 장소 둘러보기"><span className="brand-mark"><Icon name="pin" size={25} /></span><span>snapin<small>장소와 사람을 잇다</small></span></a>
        <nav className="main-nav" aria-label="주 메뉴">{navigationGroups.map(group => <div className="nav-group" key={group}>{group !== '둘러보기' && <span className="nav-eyebrow">{group}</span>}{navigation.filter(item => item.group === group && item.page !== 'mypage').map(item => <a key={item.page} className={`nav-item ${(item.page === route.page || (item.page === 'explore' && route.page === 'place')) ? 'active' : ''}`} href={`#/${item.page}`} aria-current={route.page === item.page || (item.page === 'explore' && route.page === 'place') ? 'page' : undefined}><Icon name={item.icon} size={19} /><span>{item.label}</span>{item.page === 'lists' && <small>{collections.length}</small>}</a>)}</div>)}</nav>
        <div className="sidebar-collections"><div className="sidebar-section-label"><span>내 폴더</span><a href="#/lists" aria-label="리스트 관리"><Icon name="plus" size={15} /></a></div>{collections.slice(0, 4).map(list => <button key={list.id} onClick={() => openCollection(list.id)} className="sidebar-list"><Icon name="folder" size={16} /><span>{list.name}</span><small>{list.placeIds.length}</small></button>)}</div>
        <div className="sidebar-promo"><span className="promo-icon"><Icon name="link" size={24} /></span><h3>다음 약속은 여기서</h3><p>가고 싶은 장소를 링크로 나눠요.</p><a href="#/link">장소 공유하기<Icon name="arrow" size={15} /></a></div>
        <div className="sidebar-bottom"><a className={`nav-item ${route.page === 'settings' ? 'active' : ''}`} href="#/settings" aria-current={route.page === 'settings' ? 'page' : undefined}><Icon name="settings" size={18} />기본 지도 설정<span className="mini-map"><MapBrand app={mapApp} /></span></a></div>
      </aside>
      <div className="workspace"><header className="topbar"><div className="breadcrumb">{route.page !== 'explore' && <>{sectionTitle}<Icon name="chevron" size={12} /></>}<strong>{title}</strong></div><form className="top-search" onSubmit={e => { e.preventDefault(); window.location.assign(`#/search?q=${encodeURIComponent(headerQuery.trim())}`); window.scrollTo({ top: 0 }) }}><Icon name="search" size={16} /><label className="top-search-label" htmlFor="global-search">통합검색</label><input id="global-search" aria-label="장소와 게시글 통합검색" placeholder="장소, 지역, 게시글 검색" value={headerQuery} onChange={e => setHeaderQuery(e.target.value)} /><kbd>↵</kbd></form><button className="user-profile" onClick={() => setProfileOpen(true)} aria-label={`${nickname} 프로필 설정`}><ProfileAvatar nickname={nickname} image={profile.image} /><strong>{nickname}</strong></button></header>
        <main id="main-content" tabIndex={-1} key={route.page}>
          {route.page === 'explore' && <ExplorePage query={query} onQuery={setQuery} savedIds={[...new Set(collections.flatMap(folder => folder.placeIds))]} onOpen={openPlace} collections={collections} onCollection={openCollection} />}
          {route.page === 'search' && <SearchPage key={hash} query={route.query || ''} posts={allPosts} savedIds={[...new Set(collections.flatMap(folder => folder.placeIds))]} onOpenPlace={openPlace} onOpenPost={openPost} />}
          {route.page === 'post' && <PostPage postId={route.postId} posts={allPosts} onOpenPlace={openPlace} />}
          {route.page === 'link' && <LinkPage recent={recent} onGenerate={place => { setRecent(prev => [place.id, ...prev.filter(id => id !== place.id)]); setNotice('통합 링크가 준비됐어요.') }} onShare={sharePlace} onPreview={place => navigate('go', place.id)} onCopy={copyLink} />}
          {route.page === 'lists' && <ListsPage collections={collections} activeId={activeList.id} onSelect={setActiveListId} onCreate={createCollection} onRemove={(id, listId) => { setCollections(prev => prev.map(list => list.id === listId ? { ...list, placeIds: list.placeIds.filter(p => p !== id) } : list)); setNotice('리스트에서 장소를 뺐어요.') }} memos={memos} publicMemos={publicMemos} onMemo={updateMemo} onVisibility={updateVisibility} onOpen={openPlace} onCopy={copyLink} onShare={list => navigate('share', `list-${list.id}`)} onExplore={() => navigate('explore')} />}
          {route.page === 'share' && !route.placeId && <HistoryPage entries={history} onOpen={openPlace} />}
          {(route.page === 'place' || (route.page === 'share' && !!route.placeId)) && <SharePage key={hash} place={sharedPlace} collection={shareCollection} isShared={route.page === 'share'} collections={collections} memos={memos} publicMemos={publicMemos} onMemo={updateMemo} onVisibility={updateVisibility} mapApp={mapApp} onMap={setMapApp} onSave={savePlace} onCopy={place => copyLink(place, shareCollection)} onOpenMap={target => window.open(placeWebUrl(mapApp, target), '_blank', 'noopener,noreferrer')} onBack={() => navigate(route.page === 'place' ? 'explore' : 'link')} />}
          {route.page === 'mypage' && <div className="mypage-page"><div className="page-heading"><div><h1>내 프로필</h1><p>내가 모은 장소와 이야기를 확인해요.</p></div><button className="btn button secondary" onClick={() => setProfileOpen(true)}>프로필 보기</button></div><section className="panel profile-panel"><ProfileAvatar nickname={nickname} image={profile.image} className="profile-avatar-large" /><h2>{nickname}</h2><p>{profile.email}</p><p>작성한 글 {ownPosts.length}개 · 둘러본 장소 {viewedIds.length}곳</p>{profile.socialUrl && <a className="profile-social-link" href={profile.socialUrl} target="_blank" rel="noreferrer">{profile.socialUrl}</a>}</section></div>}
          {route.page === 'settings' && <MapSettingsPage mapApp={mapApp} defaultMap={defaultMap} onMap={setMapApp} onConfirm={() => { updateDefaultMap(mapApp); setNotice(`${mapApps.find(m => m.id === mapApp)!.name}을(를) 기본 지도로 선택했어요.`) }} onReset={() => { updateDefaultMap(null); setNotice('기본 지도를 해제했어요. 링크를 열 때 지도 앱을 선택해요.') }} />}
        </main><footer className="workspace-footer"><span className="footer-brand">snapin</span><span>© Snapin 2026</span></footer>
      </div>
      {profileOpen && <ProfileDialog profile={profile} postCount={ownPosts.length} visitedCount={viewedIds.length} onSave={value => { setProfile(value); setNotice('프로필을 변경했어요.') }} onClose={() => setProfileOpen(false)} onSettings={() => { setProfileOpen(false); navigate('settings') }} />}
      {notice && <div className="toast" role="status"><span className="toast-check"><Icon name="check" size={15} /></span>{notice}<button aria-label="알림 닫기" onClick={() => setNotice('')}><Icon name="close" size={14} /></button></div>}
    </div>
  )
}
