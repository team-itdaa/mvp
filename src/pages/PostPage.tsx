import { Fragment, useState } from 'react'
import Icon from '../components/Icon'
import { asset, communityPosts, places } from '../mocks/data'
import type { CommunityPost, Place } from '../mocks/data'

type Props = { postId?: string; posts?: CommunityPost[]; onOpenPlace: (place: Place) => void }

export default function PostPage({ postId, posts = communityPosts, onOpenPlace }: Props) {
  const post = posts.find(item => item.id === postId)
  const place = places.find(item => item.id === post?.placeId)
  const [likedPosts, setLikedPosts] = useState<string[]>([])
  if (!post || !place) return <section className="panel empty-state"><Icon name="search" size={40} /><h1>게시글을 찾을 수 없어요</h1><p>삭제되었거나 공개가 종료된 글이에요. 다른 이야기를 찾아보세요.</p><a className="btn button primary" href="#/search">통합 검색으로 이동</a></section>
  const liked = likedPosts.includes(post.id)
  return <div className="post-page">
    <div className="page-heading"><div><a className="back-link" href="#/search"><Icon name="chevron" size={16} />커뮤니티 이야기</a><h1>{post.title}</h1></div></div>
    <article className="panel post-article">
      <div className="community-comment-heading"><strong>{post.author}</strong>{post.rating > 0 && <span className="comment-rating" aria-label={`별점 5점 만점에 ${post.rating.toFixed(1)}점`}>★ {post.rating.toFixed(1)}</span>}</div>
      <p className="muted small"><time dateTime={post.publishedAt}>{post.publishedAt.slice(0, 10).replaceAll('-', '.')}</time> · {place.name}</p>
      <div className="post-body">{post.body.map((paragraph, index) => <Fragment key={index}>
        <p>{paragraph}</p>
        {post.photos?.filter(photo => photo.afterParagraph === index).map(photo => <figure className="post-photo" key={photo.image}>
          <img src={asset(photo.image)} alt={photo.alt} loading="lazy" decoding="async" />
          <figcaption>{photo.caption}</figcaption>
        </figure>)}
      </Fragment>)}</div>
      <footer className="post-footer">
        {post.tags && <div className="saved-tags">{post.tags.map(tag => <span key={tag}>{tag}</span>)}</div>}
        <div className="post-reactions"><button type="button" className={`post-like-button${liked ? ' is-liked' : ''}`} aria-pressed={liked} aria-label={`${liked ? '공감 취소' : '공감하기'}, ${post.likes + (liked ? 1 : 0)}명 공감`} onClick={() => setLikedPosts(current => liked ? current.filter(id => id !== post.id) : [...current, post.id])}><Icon name="heart" size={18} filled={liked} /><span>공감</span><span className="post-like-count" aria-live="polite">{post.likes + (liked ? 1 : 0)}</span></button></div>
      </footer>
    </article>
    <section className="panel post-place"><h2>이야기에 담긴 장소</h2><button className="recent-row post-place-link" onClick={() => onOpenPlace(place)}><img src={asset(place.image)} alt={place.name} /><span className="recent-title"><strong>{place.name}</strong><span>{place.neighborhood} · {place.category}</span><span>{place.address}</span></span><Icon name="chevron" size={20} /></button></section>
  </div>
}
