import { useEffect, useState } from 'react'
import { asset, places } from '../mocks/data'
import type { Collection, Place } from '../mocks/data'
import Icon from '../components/Icon'
import MemoEditDialog from '../components/MemoEditDialog'
import FolderThumbnailPicker from '../components/FolderThumbnailPicker'

type Props = { collections: Collection[]; activeId: string; onSelect: (id: string) => void; onCreate: (name: string, coverImage?: string) => void; onRemove: (id: string, listId: string) => void; memos: Record<string, string>; onMemo: (id: string, memo: string) => void; publicMemos: Record<string, boolean>; onVisibility: (id: string, visible: boolean) => void; onOpen: (place: Place) => void; onCopy: (place: Place) => void; onShare: (collection: Collection) => void; onExplore: () => void }
export default function ListsPage({ collections, activeId, onSelect, onCreate, onRemove, memos, onMemo, publicMemos, onVisibility, onOpen, onCopy, onShare, onExplore }: Props) {
  const [creating, setCreating] = useState(false)
  const [name, setName] = useState('')
  const [coverImage, setCoverImage] = useState<string>()
  const [editingId, setEditingId] = useState<string | null>(null)
  const [menuId, setMenuId] = useState<string | null>(null)
  useEffect(() => {
    if (!menuId) return
    const close = (event: KeyboardEvent) => { if (event.key === 'Escape') setMenuId(null) }
    document.addEventListener('keydown', close)
    return () => document.removeEventListener('keydown', close)
  }, [menuId])
  const selected = collections.find(c => c.id === activeId) || collections[0]
  return (
    <div className="lists-page"><div className="page-heading hero" data-enter><div><h1>내 리스트</h1><p>{collections.length}개의 폴더에 장소를 모아두었어요.</p></div><button className="btn button primary" onClick={() => setCreating(v => !v)} aria-expanded={creating}><Icon name="plus" size={17} />새 폴더</button></div>
      {creating && <form className="panel create-list" onSubmit={e => { e.preventDefault(); if (!name.trim()) return; onCreate(name.trim(), coverImage); setCoverImage(undefined); setName(''); setCreating(false) }}><label htmlFor="collection-name">폴더 이름</label><div className="inline-form"><input id="collection-name" placeholder="폴더 이름을 입력하세요" value={name} onChange={e => setName(e.target.value)} maxLength={40} required /><button className="btn button primary">만들기</button><button className="btn button secondary" type="button" onClick={() => setCreating(false)}>취소</button></div><FolderThumbnailPicker value={coverImage} onChange={setCoverImage} /></form>}
      <div className="collection-grid list-tabs" aria-label="내 폴더">{collections.map(c => <button className={`folder-preview m-zoom ${selected.id === c.id ? 'selected' : ''}`} key={c.id} onClick={() => onSelect(c.id)} aria-pressed={selected.id === c.id}><span className="folder-cover">{c.coverImage ? <img src={c.coverImage} alt="" /> : c.placeIds.length ? c.placeIds.slice(0, 2).map(id => { const p = places.find(place => place.id === id)!; return <img key={id} src={asset(p.image)} alt="" loading="lazy" /> }) : <Icon name="folder" size={36} />}</span><span className="folder-preview-info"><span className="folder-mark"><Icon name="folder" size={20} /></span><span><strong>{c.name}</strong><small>장소 {c.placeIds.length}개</small></span><span className="folder-selection">{selected.id === c.id ? <Icon name="check" size={16} /> : <Icon name="chevron" size={16} />}</span></span></button>)}</div>
      <section className="panel saved-list"><div className="section-heading"><div><h2><Icon name="folder" size={22} /> {selected.name}<span className="count">{selected.placeIds.length}</span></h2><p>저장한 장소의 통합페이지와 메모</p></div><button className="btn button secondary" disabled={!selected.placeIds.length} onClick={() => onShare(selected)}><Icon name="share" size={15} />폴더 공유</button></div>
        {!selected.placeIds.length && <div className="empty-state"><Icon name="bookmark" size={38} /><h3>첫 번째 장소를 담아보세요</h3><p>마음에 드는 장소의 통합페이지에서 저장할 수 있어요.</p><button className="btn button primary" onClick={onExplore}>장소 둘러보기<Icon name="arrow" size={16} /></button></div>}
        {selected.placeIds.map(id => { const p = places.find(p => p.id === id)!; return <article className="saved-place" key={id}><button className="saved-image" onClick={() => onOpen(p)} aria-label={`${p.name} 통합페이지 열기`}><img src={asset(p.image)} alt={`${p.name} 공간 사진`} /></button><div className="saved-content"><div className="saved-title"><div><span className="tiny-label">{p.neighborhood} · {p.category}</span><button className="place-title" onClick={() => onOpen(p)}>{p.name}</button></div><div className="place-menu"><button className="icon-button" aria-label={`${p.name} 더보기`} aria-haspopup="true" aria-expanded={menuId === id} onClick={() => setMenuId(menuId === id ? null : id)}><Icon name="more" /></button>{menuId === id && <><button className="place-menu-dismiss" aria-label="더보기 닫기" onClick={() => setMenuId(null)} /><div className="place-menu-popover"><button type="button" onClick={() => { setEditingId(id); setMenuId(null) }}><Icon name="edit" size={16} />편집</button><button type="button" onClick={() => { onRemove(p.id, selected.id); setMenuId(null) }}><Icon name="trash" size={16} />폴더에서 삭제</button></div></>}</div></div><p className="saved-address">{p.address}</p><div className="saved-link-actions"><button className="text-button m-link" onClick={() => onOpen(p)}><Icon name="link" size={15} />통합페이지 열기</button><button className="text-button m-link" onClick={() => onCopy(p)} aria-label={`${p.name} 통합 링크 복사`}><Icon name="copy" size={15} />링크 복사</button></div><div className="saved-memo"><span className="saved-memo-label"><Icon name={publicMemos[id] ? 'eye' : 'eye-off'} size={15} />{publicMemos[id] ? '공개 메모' : '나만 보는 메모'}</span><p>{memos[id] || '아직 메모가 없어요. 더보기에서 메모를 남겨보세요.'}</p></div></div></article> })}
      </section>
      {editingId && <MemoEditDialog placeName={places.find(place => place.id === editingId)!.name} memo={memos[editingId] || ''} isPublic={publicMemos[editingId] || false} onClose={() => setEditingId(null)} onSave={(memo, visible) => { onMemo(editingId, memo); onVisibility(editingId, visible); setEditingId(null) }} />}
    </div>
  )
}
