import { useState } from 'react'
import { asset, places } from '../mocks/data'
import type { Collection, Place } from '../mocks/data'
import Icon from '../components/Icon'

type Props = { collections: Collection[]; activeId: string; onSelect: (id: string) => void; onCreate: (name: string) => void; onRemove: (id: string, listId: string) => void; memos: Record<string, string>; onMemo: (id: string, memo: string) => void; onOpen: (place: Place) => void; onCopy: (place: Place) => void; onShare: (collection: Collection) => void; onExplore: () => void }
export default function ListsPage({ collections, activeId, onSelect, onCreate, onRemove, memos, onMemo, onOpen, onCopy, onShare, onExplore }: Props) {
  const [creating, setCreating] = useState(false)
  const [name, setName] = useState('')
  const selected = collections.find(c => c.id === activeId) || collections[0]
  return (
    <div className="lists-page"><div className="page-heading"><div><h1>내 리스트</h1><p>{collections.length}개의 폴더에 장소를 모아두었어요.</p></div><button className="button primary" onClick={() => setCreating(v => !v)} aria-expanded={creating}><Icon name="plus" size={17} />새 폴더</button></div>
      {creating && <form className="panel create-list" onSubmit={e => { e.preventDefault(); if (!name.trim()) return; onCreate(name.trim()); setName(''); setCreating(false) }}><label htmlFor="collection-name">폴더 이름</label><div className="inline-form"><input id="collection-name" placeholder="폴더 이름을 입력하세요" value={name} onChange={e => setName(e.target.value)} maxLength={40} required /><button className="button primary">만들기</button><button className="button secondary" type="button" onClick={() => setCreating(false)}>취소</button></div></form>}
      <div className="collection-grid list-tabs" aria-label="내 폴더">{collections.map(c => <button className={`collection-tile folder-tile ${selected.id === c.id ? 'selected' : ''}`} key={c.id} onClick={() => onSelect(c.id)} aria-pressed={selected.id === c.id}><span className="folder-mark"><Icon name="folder" size={25} /></span><div><strong>{c.name}</strong><span>장소 {c.placeIds.length}개</span></div>{selected.id === c.id && <Icon name="check" size={18} />}</button>)}</div>
      <section className="panel saved-list"><div className="section-heading"><div><h2><Icon name="folder" size={22} /> {selected.name}<span className="count">{selected.placeIds.length}</span></h2><p>저장한 장소의 통합페이지와 메모</p></div><button className="button secondary" disabled={!selected.placeIds.length} onClick={() => onShare(selected)}><Icon name="share" size={15} />폴더 공유</button></div>
        {!selected.placeIds.length && <div className="empty-state"><Icon name="bookmark" size={38} /><h3>첫 번째 장소를 담아보세요</h3><p>장소 카드의 저장 버튼으로 리스트를 채울 수 있어요.</p><button className="button primary" onClick={onExplore}>장소 둘러보기<Icon name="arrow" size={16} /></button></div>}
        {selected.placeIds.map(id => { const p = places.find(p => p.id === id)!; return <article className="saved-place" key={id}><button className="saved-image" onClick={() => onOpen(p)} aria-label={`${p.name} 통합페이지 열기`}><img src={asset(p.image)} alt={`${p.name} 공간 사진`} /></button><div className="saved-content"><div className="saved-title"><div><span className="tiny-label">{p.neighborhood} · {p.category}</span><button className="place-title" onClick={() => onOpen(p)}>{p.name}</button></div><button className="text-button" onClick={() => onRemove(p.id, selected.id)} aria-label={`${p.name} 폴더에서 삭제`}>삭제</button></div><p className="saved-address">{p.address}</p><div className="saved-link-actions"><button className="text-button" onClick={() => onOpen(p)}><Icon name="link" size={15} />통합페이지 열기</button><button className="text-button" onClick={() => onCopy(p)} aria-label={`${p.name} 통합 링크 복사`}><Icon name="copy" size={15} />링크 복사</button></div><label htmlFor={`memo-${id}`}><Icon name="bookmark" size={12} />메모</label><textarea id={`memo-${id}`} placeholder="메모 남기기" value={memos[id] || ''} onChange={e => onMemo(id, e.target.value)} maxLength={500} /></div></article> })}
      </section>
    </div>
  )
}
