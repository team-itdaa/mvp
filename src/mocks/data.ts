import { postPhotos } from './post-photos'
import { neighborhoodStories } from './reviews-neighborhoods'
import { seongsuStories } from './reviews-seongsu'

export type Page = 'explore' | 'place' | 'link' | 'lists' | 'share' | 'settings' | 'mypage' | 'search' | 'post'
export type MapApp = 'naver' | 'kakao' | 'google'
export type Place = {
  id: string
  name: string
  category: '카페' | '음식점' | '공원'
  neighborhood: string
  address: string
  description: string
  image: string
  tags: string[]
  rating: string
  distance: string
  hours: string
  sourceUrl: string
  imageSource: string
}
export type Collection = { id: string; name: string; emoji: string; color: string; coverImage?: string; placeIds: string[] }
export const asset = (file: string) => `${import.meta.env.BASE_URL}images/places/${file}`
export const places: Place[] = [
  {
    "id": "onuel",
    "name": "앤트러사이트 연희점",
    "category": "카페",
    "neighborhood": "서울 연희동",
    "address": "서울 서대문구 연희로 135",
    "description": "어두운 실내와 넓은 창이 인상적인 로스터리 카페. 연희동을 걷다 커피 한 잔을 즐겨보세요.",
    "image": "anthracite-yeonhui.jpg",
    "tags": [
      "커피",
      "공간",
      "연희동"
    ],
    "rating": "평점 미제공",
    "distance": "연희동",
    "hours": "매일 08:50 – 22:00",
    "sourceUrl": "https://www.anthracitecoffee.com/visit",
    "imageSource": "https://cdn.imweb.me/thumbnail/20181217/5c170e1723d9d.jpg"
  },
  {
    "id": "forest",
    "name": "앤트러사이트 서교점",
    "category": "카페",
    "neighborhood": "서울 서교동",
    "address": "서울 마포구 월드컵로12길 11",
    "description": "오래된 저택을 바꾼 카페. 긴 창 너머의 풍경과 함께 커피를 즐길 수 있는 공간이에요.",
    "image": "anthracite-seogyo.jpg",
    "tags": [
      "커피",
      "공간",
      "망원역"
    ],
    "rating": "평점 미제공",
    "distance": "서교동",
    "hours": "방문 전 공식 안내 확인",
    "sourceUrl": "https://www.anthracitecoffee.com/visit",
    "imageSource": "https://cdn.imweb.me/thumbnail/20171109/5a037bfdd5372.jpg"
  },
  {
    "id": "table",
    "name": "소금집 델리 안국점",
    "category": "음식점",
    "neighborhood": "서울 안국동",
    "address": "서울 종로구 북촌로4길 19 1층",
    "description": "북촌 산책길에 들르기 좋은 샤퀴테리 델리. 소금집의 샌드위치와 한 끼를 즐겨보세요.",
    "image": "salthouse-anguk.jpg",
    "tags": [
      "샌드위치",
      "브런치",
      "점심"
    ],
    "rating": "평점 미제공",
    "distance": "안국동",
    "hours": "11:00 – 21:00 · 주문 마감 20:30",
    "sourceUrl": "https://salthousekorea.com/contact/store-01.html",
    "imageSource": "https://salthousekorea.com/Unfold/images/contact-bg-01.jpg"
  },
  {
    "id": "seoul-forest",
    "name": "서울숲",
    "category": "공원",
    "neighborhood": "서울 성수동",
    "address": "서울 성동구 뚝섬로 273",
    "description": "문화예술공원과 생태숲이 이어지는 도심 공원. 나무 사이 산책길과 넓은 녹지를 만나보세요.",
    "image": "seoul-forest.jpg",
    "tags": [
      "산책",
      "피크닉",
      "공원"
    ],
    "rating": "평점 미제공",
    "distance": "성수동",
    "hours": "구역·시설별 운영시간 확인",
    "sourceUrl": "https://english.visitkorea.or.kr/svc/contents/contentsView.do?vcontsId=95429",
    "imageSource": "https://tong.visitkorea.or.kr/cms/resource_photo/04/3511804_image2_1.jpg"
  },
  {
    "id": "paper",
    "name": "대림창고",
    "category": "카페",
    "neighborhood": "서울 성수동",
    "address": "서울 성동구 성수이로 78",
    "description": "옛 정미소의 붉은 벽돌과 철제 기둥을 살린 갤러리 카페. 커피와 전시를 함께 즐기는 성수의 공간이에요.",
    "image": "daelim-changgo.jpg",
    "tags": [
      "커피",
      "전시",
      "디저트"
    ],
    "rating": "평점 미제공",
    "distance": "성수동",
    "hours": "매일 11:00 – 22:00",
    "sourceUrl": "https://korean.visitseoul.net/restaurants/daelimchanggo/KOPf8jiyc",
    "imageSource": "https://korean.visitseoul.net/comm/getImage?srvcId=MEDIA&parentSn=73007&fileTy=MEDIA&fileNo=1&thumbTy=L"
  },
  {
    "id": "sunset",
    "name": "소금집 델리 망원점",
    "category": "음식점",
    "neighborhood": "서울 망원동",
    "address": "서울 마포구 월드컵로19길 14 2층",
    "description": "망원동 골목에서 만나는 소금집 델리. 산책 전후 샌드위치를 먹으며 쉬어갈 수 있어요.",
    "image": "salthouse-mangwon.jpg",
    "tags": [
      "샌드위치",
      "브런치",
      "점심"
    ],
    "rating": "평점 미제공",
    "distance": "망원동",
    "hours": "11:00 – 21:00 · 주문 마감 20:30",
    "sourceUrl": "https://salthousekorea.com/contact/store-02.html",
    "imageSource": "https://salthousekorea.com/Unfold/images/contact-bg-02.jpg"
  }
]
// Real venues form a local candidate list; laptop facilities are not verified.
places.push(
  { id: 'onion-seongsu', name: '어니언 성수', category: '카페', neighborhood: '서울 성수동', address: '서울 성동구 아차산로9길 8', description: '오래된 건물의 흔적을 살린 베이커리 카페. 빵과 커피를 함께 즐기는 성수의 공간이에요.', image: 'onion-seongsu.png', tags: ['커피', '베이커리', '공간'], rating: '평점 미제공', distance: '성수동', hours: '방문 전 공식 안내 확인', sourceUrl: 'https://korean.visitkorea.or.kr/detail/ms_detail.do?cotid=4894c511-2c88-4c1a-8e5a-ca58288c07f1', imageSource: 'https://map.sd.go.kr/trip_new/picture/Y020100014.jpg' },
  { id: 'blue-bottle-seongsu', name: '블루보틀 성수 카페', category: '카페', neighborhood: '서울 성수동', address: '서울 성동구 아차산로 7', description: '붉은 벽돌 건물 안의 간결한 커피 공간. 뚝섬역 가까이에서 커피 한 잔을 즐겨보세요.', image: 'blue-bottle-seongsu.png', tags: ['커피', '공간', '뚝섬역'], rating: '평점 미제공', distance: '성수동', hours: '방문 전 공식 안내 확인', sourceUrl: 'https://korean.visitkorea.or.kr/detail/ms_detail.do?cotid=150b5df5-3b82-4830-b755-c648dc714e9e', imageSource: 'https://kr.bluebottlecoffee.com/cdn/shop/articles/BBCK_SS_main_1600x1600_1e4b79e5-dfab-43d0-a335-49ac4f234cfe.jpg?width=1200' },
)
export const laptopCandidateIds = ['paper', 'onion-seongsu', 'blue-bottle-seongsu']
export const laptopDemoPrompt = '성수에서 노트북 하기 좋은 카페, 콘센트가 있고 좌석이 넓은 곳'
export function isLaptopQuery(query: string) { return /카공|공부|노트북|콘센트|좌석|작업/.test(query) }
export type CommunityPost = { id: string; placeId: string; author: string; title: string; body: string[]; publishedAt: string; likes: number; rating: number; tags?: string[]; photos?: { afterParagraph: number; image: string; alt: string; caption: string }[] }
export type CommunityReview = { id: string; author: string; rating: number; text: string; likes: number }
// Public venue observations adapted into original fictional community posts.
const stories: Record<string, [string, ...string[]][]> = { ...neighborhoodStories, ...seongsuStories }
const authors = ['산책의 기록', '오후의 노트', '커피 한 페이지', '동네 탐험가', '느린 주말', '초록 취향']
const storyRatings = [[4.5, 4, 5], [4, 4.5, 3.5], [5, 4.5, 4], [5, 4.5, 5], [4.5, 4, 4.5], [4, 4.5, 4], [4, 3.5, 4.5], [3.5, 4.5, 4]]
export const communityPosts: CommunityPost[] = places.flatMap((place, placeIndex) => stories[place.id].map(([title, ...body], index) => ({ id: `${place.id}-${['space', 'coffee', 'visit'][index]}`, placeId: place.id, author: authors[(placeIndex + index) % authors.length], title, body, photos: postPhotos[place.id], publishedAt: `2026-${String(8 + index).padStart(2, '0')}-${String(3 + (placeIndex * 3 + index * 5) % 25).padStart(2, '0')}`, likes: 7 + (placeIndex * 11 + index * 7) % 43, rating: storyRatings[placeIndex][index], tags: [...place.tags, place.neighborhood] })))
export function getPlaceCommunity(placeId: string) {
  const posts = communityPosts.filter(post => post.placeId === placeId)
  const reviews: CommunityReview[] = posts.map(post => ({ id: post.id, author: post.author, rating: post.rating, text: post.body[0], likes: post.likes }))
  const representative = reviews.reduce((best, review) => review.likes > best.likes ? review : best, reviews[0])
  return { posts, rating: reviews.length ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1) : '—', reviewCount: reviews.length, reviews, representative }
}
export const collections: Collection[] = [
  { id: 'weekend', name: '나중에 가볼 곳', emoji: '🌿', color: 'green', placeIds: ['seoul-forest', 'paper'] },
  { id: 'cafes', name: '카공하기 좋은 곳', emoji: '☕', color: 'lavender', placeIds: ['onuel', 'forest'] },
  { id: 'food', name: '찐 맛집', emoji: '🍽', color: 'orange', placeIds: ['table'] },
]
export const mapApps: { id: MapApp; name: string; letter: string; description: string }[] = [
  { id: 'naver', name: '네이버지도', letter: 'N', description: '익숙한 장소 검색과 길찾기' },
  { id: 'kakao', name: '카카오맵', letter: 'K', description: '편리한 교통 정보와 로드뷰' },
  { id: 'google', name: '구글맵', letter: 'G', description: '어디서든 함께하는 지도' },
]
// Personal memo fixtures demonstrate editing; these are not verified venue amenities or reviews.
export const initialMemos: Record<string, string> = { onuel: '다음에는 창가 테이블에 앉기. 노트북 가져갈 땐 콘센트 자리 먼저 확인하기.', 'seoul-forest': '토요일 점심 먹고 산책. 돗자리 챙기기.', table: '북촌 산책하는 날 점심으로 들르기.' }
export const searchAreas = [
  { name: '연희동', description: '서울 서대문구 · 연희로', aliases: ['연희', '서대문'] },
  { name: '서교동', description: '서울 마포구 · 망원역', aliases: ['서교'] },
  { name: '망원동', description: '서울 마포구 · 망원역', aliases: ['망원'] },
  { name: '안국동', description: '서울 종로구 · 안국역 · 북촌', aliases: ['안국', '북촌', '종로'] },
  { name: '상도동', description: '서울 동작구 · 숭실대입구역', aliases: ['상도', '숭실대', '동작'] },
  { name: '성수동', description: '서울 성동구 · 성수역 · 서울숲', aliases: ['성수', '서울숲', '성동'] },
  { name: '연남동', description: '서울 마포구 · 홍대입구역', aliases: ['연남', '홍대', '마포'] },
]
export function resolveSearchArea(query: string, selectedArea = '전체 지역') {
  return searchAreas.find(area => area.aliases.some(alias => query.includes(alias)))?.name || selectedArea
}

export function updatePlaceFolders(current: Collection[], placeId: string, folderIds: string[], newFolder?: Collection) {
  const updated = current.map(folder => ({ ...folder, placeIds: folderIds.includes(folder.id) ? [...new Set([...folder.placeIds, placeId])] : folder.placeIds.filter(id => id !== placeId) }))
  return newFolder ? [...updated, newFolder] : updated
}

export function findPlaces(query: string, category = '전체', area = '전체 지역') {
  const text = query.trim().toLowerCase()
  const searchArea = resolveSearchArea(text, area)
  // Demo queries map to curated fixture tags; no model or network request is involved.
  const queryTags = isLaptopQuery(text) ? ['노트북 후보'] : text.includes('피크닉') || text.includes('산책') ? ['피크닉', '산책'] : text.includes('맛집') || text.includes('식당') ? ['브런치', '저녁'] : []
  const queryCategory = text.includes('카페') ? '카페' : text.includes('공원') ? '공원' : text.includes('음식점') ? '음식점' : undefined
  return places.filter(place => {
    const categoryMatches = category === '전체' || place.category === category || place.tags.includes(category) || (category === '카공하기 좋은' && laptopCandidateIds.includes(place.id))
    const areaMatches = searchArea === '전체 지역' || place.neighborhood.includes(searchArea)
    const searchable = [place.name, place.category, place.neighborhood, place.description, ...place.tags].join(' ').toLowerCase()
    const queryMatches = !text || (queryTags.length ? queryTags.some(tag => tag === '노트북 후보' ? laptopCandidateIds.includes(place.id) : place.tags.includes(tag)) : queryCategory ? place.category === queryCategory : searchable.includes(text) || resolveSearchArea(text) !== '전체 지역')
    return categoryMatches && areaMatches && queryMatches
  })
}
export function searchAll(query: string, posts: CommunityPost[] = communityPosts) {
  const tokens = query.toLocaleLowerCase().trim().split(/\s+/).filter(Boolean)
  const matches = (text: string) => tokens.every(token => text.toLocaleLowerCase().includes(token))
  return {
    places: places.filter(place => matches([place.name, place.category, place.neighborhood, place.address, place.description, ...place.tags].join(' '))),
    posts: posts.filter(post => { const place = places.find(item => item.id === post.placeId); return matches([post.title, ...post.body, post.author, ...(post.tags || []), place?.name || '', place?.neighborhood || ''].join(' ')) }),
  }
}
export function parseRoute(hash: string): { page: Page; placeId?: string; postId?: string; query?: string } {
  const [path, search = ''] = hash.replace(/^#\/?/, '').split('?')
  const [page, id] = path.split('/')
  if (page === 'search') return { page: 'search', query: new URLSearchParams(search).get('q') || '' }
  if (page === 'post') return { page: 'post', postId: id }
  if (page === 'share') return { page: 'share', placeId: id || undefined }
  if (page === 'place') return { page: 'place', placeId: id }
  if (['explore', 'link', 'lists', 'settings', 'mypage'].includes(page)) return { page: page as Page }
  return { page: 'explore' }
}
export function mockShareUrl(placeId: string) { return `${window.location.origin}${import.meta.env.BASE_URL}#/share/${placeId}` }


places.forEach(place => { place.rating = getPlaceCommunity(place.id).rating })
