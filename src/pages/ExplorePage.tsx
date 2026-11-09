import { useState } from 'react'
import SearchLocationDialog from '../components/SearchLocationDialog'
import { asset, findPlaces, resolveSearchArea } from '../mocks/data'
import type { Collection, Place } from '../mocks/data'
import Icon from '../components/Icon'
import PlaceCard from '../components/PlaceCard'

type Props = {
  query: string; onQuery: (value: string) => void; savedIds: string[]
  onOpen: (place: Place) => void
  collections: Collection[]; onCollection: (id: string) => void
}
export default function ExplorePage({ query, onQuery, savedIds, onOpen, collections, onCollection }: Props) {
  const [category, setCategory] = useState('전체')
  const [area, setArea] = useState('전체 지역')
  const [searched, setSearched] = useState(false)
  const [choosingArea, setChoosingArea] = useState(false)
  const searchArea = resolveSearchArea(query, area)
  const results = findPlaces(query, category, area)
  return (
    <div className="explore-page">
      <div className="page-heading"><div><p className="eyebrow">DISCOVER YOUR NEXT FAVORITE</p><h1>오늘은 어디로 떠나볼까요?<span className="heading-spark">✧</span></h1><p>나만 알고 싶은 장소부터, 함께 가고 싶은 곳까지.</p></div></div>
      <section className="discovery-hero" aria-label="AI 장소 검색">
        <div className="hero-decoration" aria-hidden="true"><span /><span /><span /></div>
        <div className="hero-copy"><span className="ai-label"><Icon name="spark" size={14} /> SNAPIN AI</span><h2>어떤 곳을 찾고 있나요?</h2><p>분위기도, 거리도, 취향도. 원하는 대로 말해 주세요.</p>
          <form className="hero-search" onSubmit={e => { e.preventDefault(); setSearched(true) }}><Icon name="search" size={20} /><input aria-label="원하는 장소 검색" placeholder="숭실대 근처 조용한 카공 카페 찾아줘" value={query} onChange={e => onQuery(e.target.value)} /><button aria-label="장소 검색" type="submit"><Icon name="arrow" size={20} /></button></form>
          <div className="search-location-context"><button onClick={() => setChoosingArea(true)} aria-haspopup="dialog" aria-label="검색 지역 변경"><Icon name="pin" size={15} />{searchArea === '전체 지역' ? '지역 지정' : searchArea}<Icon name="down" size={14} /></button><span>{searchArea === '전체 지역' ? '지역을 입력하거나 전체 지역에서 찾아보세요.' : `검색 기준 · ${searchArea} 주변`}</span></div>
          <div className="suggestions"><span>이렇게 찾아보세요</span>{['숭실대 카공 카페', '주말 피크닉', '친구랑 갈 맛집'].map(q => <button key={q} onClick={() => { onQuery(q); setSearched(true); setCategory('전체'); setArea('전체 지역') }}>{q} ↗</button>)}</div>
        </div>
        <div className="hero-postcard"><img src={asset('cafe.jpg')} alt="햇살이 드는 카페의 예시 사진" /><span><Icon name="pin" size={13} /> 오늘의 작은 발견</span><i>somewhere nice.</i></div>
      </section>
      <section className="discovery-results" aria-labelledby="results-title">
        <div className="section-heading"><div><h2 id="results-title">{query || searched ? '취향에 맞는 장소를 찾았어요' : '지금, 발견하기 좋은 장소'}<span className="count">{results.length}</span></h2><p>{searchArea !== '전체 지역' ? `${searchArea} 주변에서 찾았어요.` : query ? `“${query}”에 대한 장소 · 전체 지역` : '오늘의 기분에 꼭 맞는 곳을 찾아보세요.'}</p></div><span className="sort-label"><Icon name="settings" size={14} /> 추천순</span></div>
        <div className="category-row" aria-label="장소 카테고리">{[{ label: '전체', icon: 'grid' }, { label: '카페', icon: 'coffee' }, { label: '음식점', icon: 'star' }, { label: '공원', icon: 'pin' }, { label: '카공하기 좋은', icon: 'bookmark' }, { label: '주차 가능', icon: 'check' }].map(c => <button key={c.label} className={category === c.label ? 'active' : ''} onClick={() => setCategory(c.label)} aria-pressed={category === c.label}><Icon name={c.icon} size={15} />{c.label}</button>)}</div>
        {results.length ? <div className="place-grid">{results.map(place => <PlaceCard key={place.id} place={place} saved={savedIds.includes(place.id)} onOpen={onOpen} />)}</div> : <div className="empty-state"><Icon name="search" size={36} /><h3>조건에 맞는 장소가 없어요</h3><p>다른 키워드나 지역으로 다시 찾아보세요.</p><button className="button secondary" onClick={() => { onQuery(''); setArea('전체 지역'); setCategory('전체'); setSearched(false) }}>전체 장소 보기</button></div>}
      </section>
      <section className="collection-section"><div className="section-heading"><div><h2>내가 모아둔 장소</h2><p>폴더별로 저장한 장소를 확인하세요.</p></div><button className="text-button" onClick={() => onCollection(collections[0].id)}>내 리스트 <Icon name="arrow" size={15} /></button></div><div className="collection-grid">{collections.slice(0, 3).map(list => <button className="collection-tile folder-tile" key={list.id} onClick={() => onCollection(list.id)}><span className="folder-mark"><Icon name="folder" size={25} /></span><div><strong>{list.name}</strong><span>{list.placeIds.length}개의 장소</span></div><Icon name="arrow" size={18} /></button>)}</div></section>
      {choosingArea && <SearchLocationDialog selectedArea={searchArea} onSelect={nextArea => { setArea(nextArea); setChoosingArea(false) }} onClose={() => setChoosingArea(false)} />}
    </div>
  )
}
