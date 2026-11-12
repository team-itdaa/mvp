import TextPreview from '../components/TextPreview'
import { useState } from 'react'
import Icon from '../components/Icon'
import PlaceCard from '../components/PlaceCard'
import { places, searchAll } from '../mocks/data'
import type { CommunityPost, Place } from '../mocks/data'

type Props = {
  query: string
  posts?: CommunityPost[]
  savedIds: string[]
  onOpenPlace: (place: Place) => void
  onOpenPost: (post: CommunityPost) => void
}
type SearchTab = '전체' | '장소' | '게시글'

function excerpt(post: CommunityPost, query: string) {
  const terms = query.toLocaleLowerCase().split(/\s+/).filter(Boolean)
  const paragraph = post.body.find(text => terms.some(term => text.toLocaleLowerCase().includes(term))) ?? post.body[0] ?? ''
  return paragraph.length > 150 ? paragraph.slice(0, 150) : paragraph
}

export default function SearchPage({ query, posts, savedIds, onOpenPlace, onOpenPost }: Props) {
  const [tab, setTab] = useState<SearchTab>('전체')
  const trimmedQuery = query.trim()
  const results = searchAll(trimmedQuery, posts)
  const total = results.places.length + results.posts.length
  const tabs: { label: SearchTab; count: number }[] = [
    { label: '전체', count: total },
    { label: '장소', count: results.places.length },
    { label: '게시글', count: results.posts.length },
  ]

  return <div className="integrated-search-page">
    <div className="page-heading"><div><h1>통합 검색</h1><p>장소 정보와 커뮤니티의 방문 기록을 함께 찾아보세요.</p></div></div>
    {!trimmedQuery ? <section className="panel empty-state"><Icon name="search" size={36} /><h2>어떤 장소가 궁금하세요?</h2><p>상단 검색창에 장소 이름, 지역이나 궁금한 내용을 입력해 주세요.</p></section> : <>
      <p className="integrated-search-summary" role="status"><strong>‘{trimmedQuery}’</strong> 검색 결과 <strong>{total}개</strong></p>
      <div className="category-row" aria-label="검색 결과 종류">{tabs.map(item => <button key={item.label} type="button" className={tab === item.label ? 'active' : ''} aria-pressed={tab === item.label} onClick={() => setTab(item.label)}>{item.label} {item.count}</button>)}</div>
      {total === 0 ? <section className="panel empty-state"><Icon name="search" size={36} /><h2>검색 결과가 없어요</h2><p>장소 이름이나 지역, 더 짧은 키워드로 다시 검색해 보세요.</p></section> : <>
        {(tab === '전체' || tab === '장소') && <section className="integrated-search-section" aria-labelledby="search-places-title">
          <div className="section-heading"><div><h2 id="search-places-title">장소 <span className="count">{results.places.length}</span></h2><p>장소 이름, 지역과 태그에서 찾았어요.</p></div></div>
          {results.places.length ? <div className="place-grid">{results.places.map(place => <PlaceCard key={place.id} place={place} saved={savedIds.includes(place.id)} onOpen={onOpenPlace} />)}</div> : <div className="empty-state"><p>일치하는 장소가 없어요. 커뮤니티 게시글도 확인해 보세요.</p></div>}
        </section>}
        {(tab === '전체' || tab === '게시글') && <section className="integrated-search-section" aria-labelledby="search-posts-title">
          <div className="section-heading"><div><h2 id="search-posts-title">커뮤니티 게시글 <span className="count">{results.posts.length}</span></h2><p>게시글 제목과 본문에서 찾았어요.</p></div></div>
          {results.posts.length ? <div className="search-post-list">{results.posts.map(post => {
            const place = places.find(item => item.id === post.placeId)
            return <button type="button" className="search-post-card panel" key={post.id} onClick={() => onOpenPost(post)} aria-label={`${post.title} 게시글 읽기`}>
              <span className="search-post-meta"><span>{post.author}</span><time dateTime={post.publishedAt}>{post.publishedAt.slice(0, 10).replaceAll('-', '.')}</time></span>
              <h3>{post.title}</h3>
              <TextPreview className="search-post-snippet" text={excerpt(post, trimmedQuery)} hasMore={post.body.join('').length > excerpt(post, trimmedQuery).length} />
              <span className="search-post-footer"><span><Icon name="pin" size={15} />{place?.name ?? '장소 방문 기록'}</span><span>{post.rating > 0 && <><Icon name="star" size={15} filled />{post.rating}<span>·</span></>}<Icon name="heart" size={15} />공감 {post.likes}</span></span>
            </button>
          })}</div> : <div className="empty-state"><p>일치하는 게시글이 없어요. 다른 키워드로 검색해 보세요.</p></div>}
        </section>}
      </>}
    </>}
  </div>
}
