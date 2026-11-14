import { postPhotos } from './post-photos'
import { neighborhoodStories } from './reviews-neighborhoods'
import { seongsuStories } from './reviews-seongsu'

export type Page = 'explore' | 'place' | 'link' | 'lists' | 'share' | 'settings' | 'mypage' | 'search' | 'post' | 'go'
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
  /** 지도 앱별 장소 ID. 있으면 검색 대신 해당 장소의 상세 화면으로 연결한다. */
  maps?: Partial<Record<MapApp, string>>
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
// 시나리오(docs/PERSONA_SCENARIO.md)용 서울 실제 장소. 소개·사진은 한국관광공사 '대한민국 구석구석' 안내를 따르고,
// 이름·주소·카카오 장소 ID는 카카오맵 검색 결과와 대조했다. 영업시간은 확인하지 않았다.
places.push(
  { id: 'joyanggwan-gangnam', name: '조양관한정식 강남본점', category: '음식점', neighborhood: '서울 강남역', address: '서울 서초구 서초대로74길 29 지1층 비01호', description: '강남역 5번 출구 부근의 한정식당이에요. 개별 룸과 단체석을 갖췄고, 상가건물 자체 주차장이 있다고 소개돼요.', image: 'joyanggwan-gangnam.jpg', tags: ['한정식', '회식 후보', '주차 가능', '강남역'], rating: '평점 미제공', distance: '강남역 인근', hours: '방문 전 공식 안내 확인', sourceUrl: 'https://korean.visitkorea.or.kr/detail/ms_detail.do?cotid=8862cb13-2785-4d4d-b892-eb68ef082547', imageSource: 'https://cdn.visitkorea.or.kr/img/call?cmd=VIEW&id=27ee53bb-cb25-4113-8d03-5c17dba021b7', maps: { kakao: '8086138' } },
  { id: 'haedamchae-gangnam', name: '해담채 강남점', category: '음식점', neighborhood: '서울 강남역', address: '서울 강남구 논현로85길 70 역삼823빌딩 지하1층', description: '생선회와 정식을 내는 한식당이에요. 모임용 대형룸과 프라이빗 룸을 갖췄다고 소개돼요.', image: 'haedamchae-gangnam.jpg', tags: ['한정식', '회식 후보', '강남역'], rating: '평점 미제공', distance: '강남역 인근', hours: '방문 전 공식 안내 확인', sourceUrl: 'https://korean.visitkorea.or.kr/detail/ms_detail.do?cotid=09663658-aa41-48cb-858f-09b0c7dc75e9', imageSource: 'https://cdn.visitkorea.or.kr/img/call?cmd=VIEW&id=c56d5de7-1184-4af3-9f2e-474011727b8f', maps: { kakao: '2142723351' } },
  { id: 'gangnam-mokjang', name: '강남목장', category: '음식점', neighborhood: '서울 강남역', address: '서울 강남구 논현로86길 34 1층', description: '역삼동의 한우구이 전문점이에요. 넓은 공간과 다양한 룸이 있어 회식이나 모임 장소로 소개돼요.', image: 'gangnam-mokjang.jpg', tags: ['고기', '회식 후보', '강남역'], rating: '평점 미제공', distance: '강남역 인근', hours: '방문 전 공식 안내 확인', sourceUrl: 'https://korean.visitkorea.or.kr/detail/ms_detail.do?cotid=4bd4d936-cbd2-40dc-821d-9a7f371d187c', imageSource: 'https://cdn.visitkorea.or.kr/img/call?cmd=VIEW&id=04d4f0d9-00cb-4f05-b32f-26c00426f055', maps: { kakao: '8735236' } },
  { id: 'dongdal-gangnam', name: '동달식당 강남본점', category: '음식점', neighborhood: '서울 강남역', address: '서울 서초구 서운로 133', description: '강남역 6번 출구 부근의 고깃집이에요. 넓은 홀과 단체 모임에 맞는 개별 룸이 있다고 소개돼요.', image: 'dongdal-gangnam.jpg', tags: ['고기', '회식 후보', '강남역'], rating: '평점 미제공', distance: '강남역 인근', hours: '방문 전 공식 안내 확인', sourceUrl: 'https://korean.visitkorea.or.kr/detail/ms_detail.do?cotid=13dbd6a4-71fd-43c7-8ba8-7033fa6c802f', imageSource: 'https://cdn.visitkorea.or.kr/img/call?cmd=VIEW&id=4d959265-7d3b-4879-8807-5b6df711d676', maps: { kakao: '393701929' } },
  { id: 'gangnam-jinhaejang', name: '강남진해장', category: '음식점', neighborhood: '서울 강남역', address: '서울 강남구 테헤란로5길 11 유빌딩 1층', description: '강남역 12번 출구 인근의 해장국·전골집이에요. 넓은 홀이 있어 단체 모임에 맞고, 상가건물 자체 주차장이 있다고 소개돼요.', image: 'gangnam-jinhaejang.jpg', tags: ['해장국', '전골', '회식 후보', '주차 가능', '강남역'], rating: '평점 미제공', distance: '강남역 인근', hours: '방문 전 공식 안내 확인', sourceUrl: 'https://korean.visitkorea.or.kr/detail/ms_detail.do?cotid=f5990abb-8fc6-47a1-bef3-f70c60b484f8', imageSource: 'https://cdn.visitkorea.or.kr/img/call?cmd=VIEW&id=aa5c7998-18b8-4f1b-9b26-f9e2b6f7e006', maps: { kakao: '1428481536' } },
  { id: 'seongsu-jokbal', name: '성수족발', category: '음식점', neighborhood: '서울 성수동', address: '서울 성동구 아차산로7길 7 1층', description: '서울 3대 족발로 불릴 만큼 유명하다고 소개되는 족발집이에요. 매장이 좁고 붐벼 포장을 권하기도 해요.', image: 'seongsu-jokbal.jpg', tags: ['족발', '저녁'], rating: '평점 미제공', distance: '성수동', hours: '방문 전 공식 안내 확인', sourceUrl: 'https://korean.visitkorea.or.kr/detail/ms_detail.do?cotid=bc0fe900-cf60-4ff5-8acc-418025c625ea', imageSource: 'https://cdn.visitkorea.or.kr/img/call?cmd=VIEW&id=6e2f1dc7-60ad-4418-b783-9885cf59ec63', maps: { kakao: '8416853' } },
  { id: 'zesty-saloon-seongsu', name: '제스티살룬 성수', category: '음식점', neighborhood: '서울 성수동', address: '서울 성동구 서울숲4길 13 1층', description: '서울숲역 5번 출구 근처 주택가 2층의 햄버거 가게예요. 빨간 벽돌 건물과 빨간 차양이 눈에 띄고, 별도 주차장은 없어요.', image: 'zesty-saloon-seongsu.jpg', tags: ['햄버거', '점심', '저녁'], rating: '평점 미제공', distance: '성수동', hours: '방문 전 공식 안내 확인', sourceUrl: 'https://korean.visitkorea.or.kr/detail/ms_detail.do?cotid=2f0952fc-d7a7-441e-9582-fc716bad37d8', imageSource: 'https://cdn.visitkorea.or.kr/img/call?cmd=VIEW&id=26cf8e45-318e-4521-8ada-8b9f8baf4420', maps: { kakao: '1965582130' } },
)
// 기존 장소 중 카카오맵 장소 ID를 확인한 곳. 같은 주소에 다른 업장이 있는 대림창고는 갤러리카페로 연결한다.
const kakaoPlaceIds: Record<string, string> = { paper: '1128989913', 'onion-seongsu': '145791269', 'blue-bottle-seongsu': '1492599844', 'seoul-forest': '11331488' }
places.forEach(place => { if (kakaoPlaceIds[place.id]) place.maps = { ...place.maps, kakao: kakaoPlaceIds[place.id] } })
export const groupDinnerCandidateIds = ['joyanggwan-gangnam', 'haedamchae-gangnam', 'gangnam-mokjang', 'dongdal-gangnam', 'gangnam-jinhaejang']
export const groupDinnerDemoPrompt = '강남역 도보 15분 이내, 주차 가능한 단체 회식 장소'
export function isGroupDinnerQuery(query: string) { return /회식|단체/.test(query) }
export const laptopCandidateIds = ['paper', 'onion-seongsu', 'blue-bottle-seongsu']
export const laptopDemoPrompt = '성수에서 노트북 하기 좋은 카페, 콘센트가 있고 좌석이 넓은 곳'
export function isLaptopQuery(query: string) { return /카공|공부|노트북|콘센트|좌석|작업/.test(query) }
export type CommunityPost = { id: string; placeId: string; author: string; title: string; body: string[]; publishedAt: string; likes: number; rating: number; tags?: string[]; photos?: { afterParagraph: number; image: string; alt: string; caption: string }[] }
export type CommunityReview = { id: string; author: string; rating: number; text: string; likes: number }
// Public venue observations adapted into original fictional community posts.
const stories: Record<string, [string, ...string[]][]> = { ...neighborhoodStories, ...seongsuStories }
const authors = ['산책의 기록', '오후의 노트', '커피 한 페이지', '동네 탐험가', '느린 주말', '초록 취향']
const storyRatings = [[4.5, 4, 5], [4, 4.5, 3.5], [5, 4.5, 4], [5, 4.5, 5], [4.5, 4, 4.5], [4, 4.5, 4], [4, 3.5, 4.5], [3.5, 4.5, 4]]
export const communityPosts: CommunityPost[] = places.flatMap((place, placeIndex) => (stories[place.id] ?? []).map(([title, ...body], index) => ({ id: `${place.id}-${['space', 'coffee', 'visit'][index]}`, placeId: place.id, author: authors[(placeIndex + index) % authors.length], title, body, photos: postPhotos[place.id], publishedAt: `2026-${String(8 + index).padStart(2, '0')}-${String(3 + (placeIndex * 3 + index * 5) % 25).padStart(2, '0')}`, likes: 7 + (placeIndex * 11 + index * 7) % 43, rating: storyRatings[placeIndex][index], tags: [...place.tags, place.neighborhood] })))
export function getPlaceCommunity(placeId: string) {
  const posts = communityPosts.filter(post => post.placeId === placeId)
  const reviews: CommunityReview[] = posts.map(post => ({ id: post.id, author: post.author, rating: post.rating, text: post.body[0], likes: post.likes }))
  const representative = reviews.length ? reviews.reduce((best, review) => review.likes > best.likes ? review : best, reviews[0]) : undefined
  return { posts, rating: reviews.length ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1) : '—', reviewCount: reviews.length, reviews, representative }
}
export const collections: Collection[] = [
  { id: 'weekend', name: '나중에 가볼 곳', emoji: '🌿', color: 'green', placeIds: ['seoul-forest', 'paper'] },
  { id: 'cafes', name: '카공하기 좋은 곳', emoji: '☕', color: 'lavender', placeIds: ['onuel', 'forest'] },
  { id: 'food', name: '찐 맛집', emoji: '🍽', color: 'orange', placeIds: ['table'] },
  // 수신자 링크(#/go/list-…)를 새 탭이나 폰에서도 열어 볼 수 있도록 미리 담아 둔 시나리오용 폴더.
  { id: 'team-dinner', name: '팀 회식 후보', emoji: '🍽', color: 'orange', placeIds: ['joyanggwan-gangnam', 'haedamchae-gangnam', 'gangnam-jinhaejang'] },
  { id: 'seongsu-tour', name: '성수 맛집 투어', emoji: '📍', color: 'lavender', placeIds: ['paper', 'onion-seongsu', 'seongsu-jokbal', 'zesty-saloon-seongsu', 'blue-bottle-seongsu'] },
]
export const mapApps: { id: MapApp; name: string; letter: string; description: string }[] = [
  { id: 'naver', name: '네이버지도', letter: 'N', description: '익숙한 장소 검색과 길찾기' },
  { id: 'kakao', name: '카카오맵', letter: 'K', description: '편리한 교통 정보와 로드뷰' },
  { id: 'google', name: '구글맵', letter: 'G', description: '어디서든 함께하는 지도' },
]
// Personal memo fixtures demonstrate editing; these are not verified venue amenities or reviews.
export const initialMemos: Record<string, string> = { onuel: '다음에는 창가 테이블에 앉기. 노트북 가져갈 땐 콘센트 자리 먼저 확인하기.', 'seoul-forest': '토요일 점심 먹고 산책. 돗자리 챙기기.', table: '북촌 산책하는 날 점심으로 들르기.',
  'joyanggwan-gangnam': '자체 주차장 안내가 있어서, 차를 가져오는 팀원이 있는지 확인하기.', 'haedamchae-gangnam': '대형룸 예약이 되는지 전화로 먼저 확인하기.', 'gangnam-jinhaejang': '넓은 홀이라고 소개돼서 인원이 많을 때 후보로 두기.',
  paper: '소개 영상의 첫 번째 장소. 높은 천장의 공간부터 둘러보기.', 'onion-seongsu': '두 번째 장소. 빵을 구경하고 커피로 쉬어 가기.', 'seongsu-jokbal': '세 번째 장소. 매장이 좁아서 포장도 같이 생각하기.', 'zesty-saloon-seongsu': '네 번째 장소. 서울숲 근처에서 햄버거로 점심.', 'blue-bottle-seongsu': '마지막 장소. 커피 한 잔으로 마무리.' }
// 수신자가 리스트 링크로 볼 수 있도록 공개해 둔 코멘트(시나리오용). 나머지 메모는 기본대로 나만 보기다.
export const initialPublicMemos: Record<string, boolean> = { 'joyanggwan-gangnam': true, 'haedamchae-gangnam': true, 'gangnam-jinhaejang': true, paper: true, 'onion-seongsu': true, 'seongsu-jokbal': true, 'zesty-saloon-seongsu': true, 'blue-bottle-seongsu': true }
export const searchAreas = [
  { name: '연희동', description: '서울 서대문구 · 연희로', aliases: ['연희', '서대문'] },
  { name: '서교동', description: '서울 마포구 · 망원역', aliases: ['서교'] },
  { name: '망원동', description: '서울 마포구 · 망원역', aliases: ['망원'] },
  { name: '안국동', description: '서울 종로구 · 안국역 · 북촌', aliases: ['안국', '북촌', '종로'] },
  { name: '상도동', description: '서울 동작구 · 숭실대입구역', aliases: ['상도', '숭실대', '동작'] },
  { name: '성수동', description: '서울 성동구 · 성수역 · 서울숲', aliases: ['성수', '서울숲', '성동'] },
  { name: '강남역', description: '서울 강남구·서초구 · 강남역', aliases: ['강남', '역삼', '서초'] },
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
  const queryTags = isGroupDinnerQuery(text) ? ['회식 후보'] : isLaptopQuery(text) ? ['노트북 후보'] : text.includes('피크닉') || text.includes('산책') ? ['피크닉', '산책'] : text.includes('맛집') || text.includes('식당') ? ['브런치', '저녁'] : []
  const queryCategory = text.includes('카페') ? '카페' : text.includes('공원') ? '공원' : text.includes('음식점') ? '음식점' : undefined
  return places.filter(place => {
    const categoryMatches = category === '전체' || place.category === category || place.tags.includes(category) || (category === '카공하기 좋은' && laptopCandidateIds.includes(place.id))
    const areaMatches = searchArea === '전체 지역' || place.neighborhood.includes(searchArea)
    const searchable = [place.name, place.category, place.neighborhood, place.description, ...place.tags].join(' ').toLowerCase()
    const queryMatches = !text || (queryTags.length ? queryTags.some(tag => tag === '노트북 후보' ? laptopCandidateIds.includes(place.id) : tag === '회식 후보' ? groupDinnerCandidateIds.includes(place.id) : place.tags.includes(tag)) : queryCategory ? place.category === queryCategory : searchable.includes(text) || resolveSearchArea(text) !== '전체 지역')
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
  if (page === 'go') return { page: 'go', placeId: id }
  if (['explore', 'link', 'lists', 'settings', 'mypage'].includes(page)) return { page: page as Page }
  return { page: 'explore' }
}
// 통합 링크는 받는 사람이 앱 화면 없이 바로 지도를 고르는 수신자 화면(#/go/…)으로 연결된다.
export function mockShareUrl(placeId: string) { return `${window.location.origin}${import.meta.env.BASE_URL}#/go/${placeId}` }


places.forEach(place => { place.rating = getPlaceCommunity(place.id).rating })
