import { asset, places } from '../mocks/data'
import type { Place } from '../mocks/data'
import Icon from '../components/Icon'

export type HistoryEntry = { placeId: string; viewedAt: string }
type Props = { entries: HistoryEntry[]; onOpen: (place: Place) => void }
const dateFormat = new Intl.DateTimeFormat('ko-KR', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })

export default function HistoryPage({ entries, onOpen }: Props) {
  const seen = new Set<string>()
  const history = entries.flatMap(entry => {
    const place = places.find(item => item.id === entry.placeId)
    if (!place || seen.has(place.id)) return []
    seen.add(place.id)
    return [{ place, viewedAt: entry.viewedAt }]
  })
  return <div className="history-page"><div className="page-heading"><div><h1>공유받은 장소</h1><p>통합 링크로 열어 본 장소를 최근 순서로 모았어요.</p></div></div>{history.length ? <section className="history-list" aria-label="공유받은 장소 기록">{history.map(({ place, viewedAt }) => <button type="button" className="panel history-item" key={place.id} onClick={() => onOpen(place)} aria-label={`${place.name} 통합페이지 열기`}><img src={asset(place.image)} alt="" /><div><time className="history-date" dateTime={viewedAt}>{dateFormat.format(new Date(viewedAt))}</time><h2>{place.name}</h2><p>{place.neighborhood} · {place.category}</p><span className="muted small">{place.address}</span></div><span className="history-chevron"><Icon name="chevron" size={22} /></span></button>)}</section> : <section className="panel empty-state"><h2>아직 공유받은 장소가 없어요</h2><p>친구가 보내 준 통합 링크를 열면 이곳에 모여요.</p></section>}</div>
}
