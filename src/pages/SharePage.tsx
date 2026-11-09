import { useState } from 'react'
import SavePlaceDialog from '../components/SavePlaceDialog'
import { asset, mapApps, places } from '../mocks/data'
import type { Collection, MapApp, Place } from '../mocks/data'
import Icon from '../components/Icon'
import MockMap from '../components/MockMap'

type Props = { place?: Place; collection?: Collection; isShared?: boolean; collections: Collection[]; mapApp: MapApp; onMap: (app: MapApp) => void; onSave: (id: string, folderIds: string[], newFolderName?: string) => void; onCopy: (place: Place) => void; onOpenMap: () => void; onBack: () => void }
export default function SharePage({ place, collection, isShared = true, collections, mapApp, onMap, onSave, onCopy, onOpenMap, onBack }: Props) {
  const [saving, setSaving] = useState(false)
  const savedFolders = collections.filter(folder => place && folder.placeIds.includes(place.id))
  const saved = savedFolders.length > 0
  if (!place) return <div className="panel empty-state"><Icon name="link" size={40} /><h1>장소를 찾을 수 없어요</h1><p>링크를 확인하거나 장소를 다시 검색해 주세요.</p><button className="button primary" onClick={onBack}>{isShared ? '통합 링크 만들기' : '장소 둘러보기'}</button></div>
  return (
    <div className="share-page"><div className="page-heading"><div><p className="eyebrow">PLACE DETAILS</p><h1>{collection ? collection.name : place.name}</h1><p>{collection ? `함께 가고 싶은 ${collection.placeIds.length}개의 장소` : `${place.neighborhood} · ${place.category}`}</p></div><span className="shared-label"><Icon name="link" size={15} />{isShared ? '스내핀으로 공유한 장소' : '장소 통합페이지'}</span></div>
      <section className="panel share-card"><div className="share-photo"><img src={asset(place.image)} alt={`${place.name}의 분위기를 보여주는 예시 사진`} /><span className="photo-label">{place.category}</span></div><div className="share-details"><div className="place-meta"><span>{place.neighborhood}</span><span><Icon name="star" size={13} filled />{place.rating}</span></div><h2>{place.name}</h2><p className="share-description">{place.description}</p><div className="address-row"><Icon name="pin" size={16} />{place.address}</div><div className="address-row"><Icon name="clock" size={16} />{place.hours}</div><div className="saved-tags">{place.tags.map(t => <span key={t}>{t}</span>)}</div><div className="map-picker"><h3>어떤 지도로 열까요?</h3><p>가장 익숙한 지도 앱에서 확인하세요.</p><div className="map-choice-row">{mapApps.map(app => <button key={app.id} onClick={() => onMap(app.id)} className={app.id === mapApp ? 'selected' : ''} aria-pressed={app.id === mapApp}><span className={`map-logo ${app.id}`}>{app.letter}</span><span>{app.name}</span>{app.id === mapApp && <Icon name="check" size={13} />}</button>)}</div><button className="button primary full" onClick={onOpenMap}>{mapApps.find(m => m.id === mapApp)!.name}에서 열기<Icon name="arrow" size={16} /></button></div><div className="share-actions"><button onClick={() => setSaving(true)} aria-haspopup="dialog"><Icon name="bookmark" size={16} filled={saved} />{saved ? '저장됨 · 폴더 변경' : '내 리스트에 저장'}</button><button onClick={() => onCopy(place)}><Icon name="copy" size={16} />링크 복사</button></div>{saved && <p className="saved-folder-note">{savedFolders.map(folder => folder.name).join(' · ')}에 저장됨</p>}</div></section>
      {collection ? <section className="panel shared-list"><h2>함께 담긴 장소</h2>{collection.placeIds.map(id => { const p = places.find(p => p.id === id)!; return <div className="recent-row" key={id}><img src={asset(p.image)} alt="" /><div className="recent-title"><strong>{p.name}</strong><span>{p.neighborhood} · {p.category}</span></div><button className="button secondary" onClick={onOpenMap}>지도로 보기<Icon name="arrow" size={15} /></button></div> })}</section> : <section className="panel location-panel"><div className="section-heading"><h2>찾아가는 길</h2><span className="muted small">{place.address}</span></div><MockMap /></section>}
      {saving && <SavePlaceDialog place={place} collections={collections} onClose={() => setSaving(false)} onConfirm={(folderIds, newFolderName) => { onSave(place.id, folderIds, newFolderName); setSaving(false) }} />}
    </div>
  )
}
