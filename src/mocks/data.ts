export type Page = 'explore' | 'place' | 'link' | 'lists' | 'share' | 'settings'
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
}
export type Collection = { id: string; name: string; emoji: string; color: string; placeIds: string[] }
export const asset = (file: string) => `${import.meta.env.BASE_URL}images/places/${file}`
export const places: Place[] = [
  { id: 'onuel', name: '오늘의 커피', category: '카페', neighborhood: '서울 상도동', address: '서울 동작구 상도로 369', description: '고소한 커피 향과 따스한 햇살. 창가에 앉아 나만의 시간에 집중하기 좋은 공간이에요.', image: 'cafe.jpg', tags: ['카공하기 좋은', '콘센트', '조용한'], rating: '4.8', distance: '도보 5분', hours: '10:00 – 22:00' },
  { id: 'forest', name: '작은 숲', category: '카페', neighborhood: '서울 상도동', address: '서울 동작구 상도로 360', description: '녹음이 보이는 테이블에서 커피 한 잔. 초록빛 일상에 잠시 머물러 보세요.', image: 'coffee.jpg', tags: ['디저트', '주차 가능', '카공하기 좋은'], rating: '4.7', distance: '도보 8분', hours: '11:00 – 21:00' },
  { id: 'table', name: '상도 테이블', category: '음식점', neighborhood: '서울 상도동', address: '서울 동작구 상도로 350', description: '좋아하는 사람들과 천천히 나누는 한 끼. 오늘은 따뜻한 브런치 어떠세요?', image: 'restaurant.jpg', tags: ['브런치', '주차 가능', '모임'], rating: '4.6', distance: '도보 12분', hours: '11:00 – 21:00' },
  { id: 'seoul-forest', name: '서울숲', category: '공원', neighborhood: '서울 성수동', address: '서울 성동구 뚝섬로 273', description: '도심을 잠시 벗어나 나무 사이를 걸어요. 피크닉 매트 하나면 충분한 주말이에요.', image: 'forest.jpg', tags: ['산책', '피크닉', '주차 가능'], rating: '4.9', distance: '성수동', hours: '상시 개방' },
  { id: 'paper', name: '페이퍼룸', category: '카페', neighborhood: '서울 성수동', address: '서울 성동구 연무장길 20', description: '책 한 권과 드립 커피 한 잔. 좋아하는 문장을 오래 들여다보기 좋은 곳이에요.', image: 'brunch.jpg', tags: ['조용한', '디저트', '카공하기 좋은'], rating: '4.8', distance: '성수동', hours: '10:00 – 20:00' },
  { id: 'sunset', name: '노을의 자리', category: '음식점', neighborhood: '서울 연남동', address: '서울 마포구 동교로 260', description: '일상의 작은 기념일을 위한 식탁. 해 질 무렵에 만나면 더 좋은 공간이에요.', image: 'restaurant.jpg', tags: ['저녁', '데이트', '모임'], rating: '4.7', distance: '연남동', hours: '12:00 – 22:00' },
]
export const collections: Collection[] = [
  { id: 'weekend', name: '나중에 가볼 곳', emoji: '🌿', color: 'green', placeIds: ['seoul-forest', 'paper'] },
  { id: 'cafes', name: '카공하기 좋은 곳', emoji: '☕', color: 'lavender', placeIds: ['onuel', 'forest', 'paper'] },
  { id: 'food', name: '찐 맛집', emoji: '🍽', color: 'orange', placeIds: ['table', 'sunset'] },
]
export const mapApps: { id: MapApp; name: string; letter: string; description: string }[] = [
  { id: 'naver', name: '네이버지도', letter: 'N', description: '익숙한 장소 검색과 길찾기' },
  { id: 'kakao', name: '카카오맵', letter: 'K', description: '편리한 교통 정보와 로드뷰' },
  { id: 'google', name: '구글맵', letter: 'G', description: '어디서든 함께하는 지도' },
]
export const initialMemos: Record<string, string> = { onuel: '과제할 때 가기. 창가 쪽에 콘센트 있음.', 'seoul-forest': '토요일 점심 먹고 산책' }
export const searchAreas = [
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
  const queryTags = text.includes('카공') || text.includes('공부') ? ['카공하기 좋은'] : text.includes('피크닉') || text.includes('산책') ? ['피크닉', '산책'] : text.includes('맛집') || text.includes('식당') ? ['브런치', '저녁'] : []
  const queryCategory = text.includes('카페') ? '카페' : text.includes('공원') ? '공원' : text.includes('음식점') ? '음식점' : undefined
  return places.filter(place => {
    const categoryMatches = category === '전체' || place.category === category || place.tags.includes(category)
    const areaMatches = searchArea === '전체 지역' || place.neighborhood.includes(searchArea)
    const searchable = [place.name, place.category, place.neighborhood, place.description, ...place.tags].join(' ').toLowerCase()
    const queryMatches = !text || (queryTags.length ? queryTags.some(tag => place.tags.includes(tag)) : queryCategory ? place.category === queryCategory : searchable.includes(text) || resolveSearchArea(text) !== '전체 지역')
    return categoryMatches && areaMatches && queryMatches
  })
}
export function parseRoute(hash: string): { page: Page; placeId?: string } {
  const [page, id] = hash.replace(/^#\/?/, '').split('/')
  if (page === 'share') return { page: 'share', placeId: id || 'onuel' }
  if (page === 'place') return { page: 'place', placeId: id }
  if (['explore', 'link', 'lists', 'settings'].includes(page)) return { page: page as Page }
  return { page: 'explore' }
}
export function mockShareUrl(placeId: string) { return `${window.location.origin}${import.meta.env.BASE_URL}#/share/${placeId}` }
