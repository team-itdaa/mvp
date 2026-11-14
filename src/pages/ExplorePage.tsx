import { useEffect, useRef, useState } from 'react'
import SearchLocationDialog from '../components/SearchLocationDialog'
import { asset, findPlaces, places, resolveSearchArea, isLaptopQuery, isGroupDinnerQuery, laptopDemoPrompt, groupDinnerDemoPrompt } from '../mocks/data'
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
  const [submitted, setSubmitted] = useState({ query: '', area: '전체 지역' })
  const [loading, setLoading] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current) }, [])
  const appliedArea = resolveSearchArea(submitted.query, submitted.area)
  const results = findPlaces(submitted.query, category, submitted.area)
  const submitSearch = () => {
    if (timer.current) clearTimeout(timer.current)
    const next = { query: query.trim(), area }
    setLoading(true)
    timer.current = setTimeout(() => { setSubmitted(next); setSearched(true); setLoading(false) }, 1000)
  }
  const text = submitted.query.toLowerCase()
  const condition = isGroupDinnerQuery(text) ? '회식 · 단체 · 주차 안내 후보' : isLaptopQuery(text) ? '노트북 · 콘센트 · 넓은 좌석' : text.includes('피크닉') || text.includes('산책') ? '피크닉·산책 태그 중 하나' : text.includes('맛집') || text.includes('식당') ? '브런치·저녁 태그 중 하나' : text.includes('카페') ? '카페' : text.includes('공원') ? '공원' : text.includes('음식점') ? '음식점' : resolveSearchArea(text) !== '전체 지역' ? '지역 일치' : text ? '입력 문구 일치' : '전체 장소'
  const criteria = [appliedArea, condition, category !== '전체' ? category : ''].filter(Boolean).join(' · ')
  return (
    <div className="explore-page">
      <section className="discovery-hero hero" data-enter aria-label="장소 검색">
        <div className="hero-copy"><span className="ai-label"><Icon name="spark" size={16} /> 장소 검색</span><h1>취향에 맞는 <br />장소 찾기</h1><p>원하는 분위기나 함께 갈 사람을 입력해 보세요.</p>
          <form onSubmit={e => { e.preventDefault(); submitSearch() }}><label className="search-field-label" htmlFor="discovery-query">찾고 싶은 장소</label><div className="hero-search"><Icon name="search" size={21} /><input id="discovery-query" placeholder="성수에서 콘센트 있고 좌석이 넓은 카페" value={query} onChange={e => onQuery(e.target.value)} /><button className="btn" aria-label={loading ? "장소 검색 중" : "장소 검색"} disabled={loading} type="submit">{loading ? "검색 중" : "확인"}</button></div></form>
          <div className="search-location-context"><button onClick={() => setChoosingArea(true)} aria-haspopup="dialog" aria-label="검색 지역 변경"><Icon name="pin" size={15} />{searchArea === '전체 지역' ? '지역 지정' : searchArea}<Icon name="down" size={14} /></button><span>{searchArea === '전체 지역' ? '지역을 입력하거나 전체 지역에서 찾아보세요.' : `검색 기준 · ${searchArea} 주변`}</span></div>
          <div className="suggestions">{[groupDinnerDemoPrompt, laptopDemoPrompt, '성수 카페'].map(q => <button key={q} onClick={() => { onQuery(q) }}>{q}<Icon name="arrow" size={14} /></button>)}</div>
        </div>
        <button className="featured-place m-zoom" onClick={() => onOpen(places[0])} aria-label={`${places[0].name} 통합페이지 열기`}><img src={asset(places[0].image)} alt={places[0].name} width="600" height="400" fetchPriority="high" /><span className="featured-place-info"><span><span className="featured-kicker">잠시 집중하고 싶은 날</span><strong>{places[0].name}</strong><span><Icon name="pin" size={14} />{places[0].neighborhood}</span></span><span className="featured-arrow"><Icon name="arrow" size={22} /></span></span></button>
      </section>
      <section className="discovery-results" aria-labelledby="results-title">
        <div className="section-heading"><div><h2 id="results-title">{searched ? '검색한 장소' : '발견하기 좋은 장소'}<span className="count">{results.length}</span></h2><p aria-live="polite">{loading ? "조건에 맞는 장소를 찾고 있어요…" : searched ? `적용한 조건 · ${criteria}` : "마음에 드는 카페를 찾아보세요."}</p></div><span className="sort-label">{appliedArea}<Icon name="pin" size={15} /></span></div>
        {searched && !loading && <section className="search-criteria" aria-label="추천 기준"><h3>추천 기준</h3><ol><li><span>지역 조건</span><strong>{appliedArea}</strong></li><li><span>일치 태그·키워드</span><strong>{condition}{category !== '전체' ? ' · ' + category : ''}</strong></li><li><span>검색 결과</span><strong>{results.length}곳</strong></li></ol><p>{isGroupDinnerQuery(text) ? '강남역 주변에서 룸·단체석이나 주차 안내가 소개된 곳을 모았어요. 소개 기준이라 방문 전 매장에 다시 확인해 주세요.' : isLaptopQuery(text) ? '지역과 커뮤니티에 남긴 작업 공간 이야기를 함께 살펴봤어요.' : '등록된 장소의 지역과 태그·키워드를 기준으로 찾았어요.'}</p></section>}
        <div className="category-row" aria-label="장소 카테고리">{[{ label: '전체', icon: 'grid' }, { label: '카페', icon: 'coffee' }, { label: '음식점', icon: 'star' }, { label: '공원', icon: 'pin' }, { label: '카공하기 좋은', icon: 'bookmark' }, { label: '주차 가능', icon: 'check' }].map(c => <button key={c.label} className={category === c.label ? 'active' : ''} onClick={() => setCategory(c.label)} aria-pressed={category === c.label}><Icon name={c.icon} size={15} />{c.label}</button>)}</div>
        {loading ? <div className="empty-state" role="status"><Icon name="search" size={36} /><h3>장소를 찾고 있어요</h3><p>지역과 키워드를 확인하고 있어요.</p></div> : results.length ? <div className="place-grid">{results.map(place => <PlaceCard key={place.id} place={place} saved={savedIds.includes(place.id)} onOpen={onOpen} />)}</div> : <div className="empty-state"><Icon name="search" size={36} /><h3>조건에 맞는 장소가 없어요</h3><p>다른 키워드나 지역으로 다시 찾아보세요.</p><button className="btn button secondary" onClick={() => { onQuery(''); setArea('전체 지역'); setCategory('전체'); setSearched(false); setSubmitted({ query: '', area: '전체 지역' }) }}>전체 장소 보기</button></div>}
      </section>
      <section className="collection-section"><div className="section-heading"><div><h2>내가 모아둔 장소</h2><p>폴더별로 저장한 장소를 확인하세요.</p></div><button className="text-button m-link" onClick={() => onCollection(collections[0].id)}>내 리스트 <Icon name="arrow" size={15} /></button></div><div className="collection-grid">{collections.slice(0, 3).map(list => <button className="collection-tile folder-tile" key={list.id} onClick={() => onCollection(list.id)}><span className="folder-mark"><Icon name="folder" size={25} /></span><div><strong>{list.name}</strong><span>{list.placeIds.length}개의 장소</span></div><Icon name="arrow" size={18} /></button>)}</div></section>
      {choosingArea && <SearchLocationDialog selectedArea={searchArea} onSelect={nextArea => { setArea(nextArea); setChoosingArea(false) }} onClose={() => setChoosingArea(false)} />}
    </div>
  )
}
