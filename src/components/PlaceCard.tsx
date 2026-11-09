import { asset } from '../mocks/data'
import type { Place } from '../mocks/data'
import Icon from './Icon'

type Props = { place: Place; saved: boolean; onOpen: (place: Place) => void }
export default function PlaceCard({ place, saved, onOpen }: Props) {
  return (
    <article className="place-card">
      <div className="place-photo">
        <button className="photo-open" onClick={() => onOpen(place)} aria-label={`${place.name} 상세 보기`}><img src={asset(place.image)} alt={`${place.name}의 분위기를 보여주는 예시 사진`} loading="lazy" width="600" height="400" /></button>
        <span className="photo-label">{place.category}</span>
        {saved && <span className="saved-place-badge"><Icon name="bookmark" size={15} filled />저장됨</span>}
      </div>
      <div className="place-content">
        <div className="place-meta"><span>{place.neighborhood}</span><span><Icon name="star" size={12} filled /> {place.rating}</span></div>
        <button className="place-title" onClick={() => onOpen(place)}>{place.name}<Icon name="chevron" size={16} /></button>
        <p>{place.description.split('.')[0]}.</p>
        <div className="place-bottom"><span className="place-tag">{place.tags[0]}</span><span><Icon name="pin" size={12} /> {place.distance}</span></div>
      </div>
    </article>
  )
}
