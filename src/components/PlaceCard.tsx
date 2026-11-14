import TextPreview from './TextPreview'
import { asset, getPlaceCommunity } from '../mocks/data'
import type { Place } from '../mocks/data'
import Icon from './Icon'

type Props = { place: Place; saved: boolean; onOpen: (place: Place) => void }
export default function PlaceCard({ place, saved, onOpen }: Props) {
  const community = getPlaceCommunity(place.id)
  const featured = community.representative
  return <a className="place-card card" href={`#/place/${place.id}`} aria-label={`${place.name} 장소 페이지 보기`} onClick={event => { if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return; event.preventDefault(); onOpen(place) }}>
    <div className="place-photo">
      <div className="photo-open m-zoom"><img src={asset(place.image)} alt={`${place.name} 공간과 분위기`} loading="lazy" width="600" height="400" /></div>
      <span className="photo-label">{place.category}</span>
      {saved && <span className="saved-place-badge"><Icon name="bookmark" size={15} filled />저장됨</span>}
    </div>
    <div className="place-content">
      <div className="place-meta"><span>{place.neighborhood}</span><span><Icon name="star" size={13} filled /> {community.reviewCount ? <>{community.rating}<span className="rating-count"> ({community.reviewCount})</span></> : '평점 미제공'}</span></div>
      <h3 className="place-title">{place.name}<Icon name="chevron" size={16} /></h3>
      <p>{place.description.split('.')[0]}.</p>
      {featured && (<div className="card-community-preview">
        <span className="community-preview-label">공감이 많은 이야기</span>
        <TextPreview text={`“${featured.text}”`} hasMore />
        <span className="community-preview-footer"><span>{featured.author}</span><span><Icon name="heart" size={14} /> {featured.likes}</span></span>
      </div>)}
      <div className="place-bottom"><span className="place-tag">{place.tags[0]}</span><span><Icon name="pin" size={12} /> {place.distance}</span></div>
    </div>
  </a>
}
