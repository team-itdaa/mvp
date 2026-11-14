import type { MapApp, Place } from '../mocks/data'

const DEFAULT_MAP_KEY = 'snapin.defaultMapApp'
const mapAppIds: MapApp[] = ['naver', 'kakao', 'google']
const isMapApp = (value: unknown): value is MapApp => mapAppIds.includes(value as MapApp)

/** 이 브라우저에 저장된 기본 지도 앱. 설정한 적이 없으면 null. */
export function readDefaultMapApp(): MapApp | null {
  try {
    const value = window.localStorage.getItem(DEFAULT_MAP_KEY)
    return isMapApp(value) ? value : null
  } catch {
    return null
  }
}
export function saveDefaultMapApp(app: MapApp) {
  try { window.localStorage.setItem(DEFAULT_MAP_KEY, app) } catch { /* 저장소를 쓸 수 없으면 이번 방문에만 적용된다. */ }
}
export function clearDefaultMapApp() {
  try { window.localStorage.removeItem(DEFAULT_MAP_KEY) } catch { /* 저장소를 쓸 수 없으면 지울 것이 없다. */ }
}

/** 장소 ID가 없을 때 지도 앱에서 이 장소를 찾는 검색어. 카카오는 상호만, 나머지는 상호와 주소를 쓴다. */
export const placeSearchText = (place: Place, app?: MapApp) => app === 'kakao' ? place.name : `${place.name} ${place.address}`

/** 앱이 없거나 데스크톱일 때 마지막으로 의지하는 웹 지도 주소(검색어 기준). */
export function webMapUrl(app: MapApp, query: string) {
  const text = encodeURIComponent(query)
  if (app === 'naver') return `https://map.naver.com/p/search/${text}`
  if (app === 'kakao') return `https://map.kakao.com/link/search/${text}`
  return `https://www.google.com/maps/search/?api=1&query=${text}`
}

/** 구글 지도 장소 ID(ftid, `0x…:0x…`)의 뒷부분을 십진수 CID로 바꾼다. 형식이 맞지 않으면 null. */
export function googleCidFromFtid(ftid: string) {
  const match = ftid.match(/^0x[0-9a-f]+:(0x[0-9a-f]+)$/i)
  return match ? BigInt(match[1]).toString() : null
}

/**
 * 장소의 웹 지도 주소. 지도 앱별 장소 ID가 있으면 검색 결과가 아닌 장소 상세로 바로 간다.
 * 카카오: place.map.kakao.com/{ID}, 네이버: map.naver.com/p/entry/place/{ID}, 구글: maps.google.com/?cid={CID}.
 */
export function placeWebUrl(app: MapApp, place: Place) {
  const id = place.maps?.[app]
  if (id) {
    if (app === 'kakao') return `https://place.map.kakao.com/${id}`
    if (app === 'naver') return `https://map.naver.com/p/entry/place/${id}`
    const cid = googleCidFromFtid(id)
    if (cid) return `https://maps.google.com/?cid=${cid}`
  }
  return webMapUrl(app, placeSearchText(place, app))
}

export type Platform = 'android' | 'ios' | 'desktop'
export function detectPlatform(userAgent = navigator.userAgent): Platform {
  if (/android/i.test(userAgent)) return 'android'
  if (/iphone|ipad|ipod/i.test(userAgent)) return 'ios'
  // iPadOS는 데스크톱 Safari로 위장하므로 터치 지원으로 구분한다.
  if (/macintosh/i.test(userAgent) && navigator.maxTouchPoints > 1) return 'ios'
  return 'desktop'
}
export const isKakaoTalkBrowser = (userAgent = navigator.userAgent) => /KAKAOTALK/i.test(userAgent)

// 네이버 지도 URL Scheme은 모바일 웹에서 호출할 때 appname에 웹 페이지 URL을 요구한다.
const callerName = () => `${window.location.origin}${window.location.pathname}`

function androidIntentUrl(app: Exclude<MapApp, 'google'>, place: Place, webUrl: string) {
  // 앱이 없으면 스토어 대신 웹 지도로 이동하도록 browser_fallback_url을 지정한다.
  const fallback = `S.browser_fallback_url=${encodeURIComponent(webUrl)}`
  if (app === 'naver') {
    return `intent://search?query=${encodeURIComponent(placeSearchText(place, app))}&appname=${encodeURIComponent(callerName())}#Intent;scheme=nmap;action=android.intent.action.VIEW;category=android.intent.category.BROWSABLE;package=com.nhn.android.nmap;${fallback};end`
  }
  const target = place.maps?.kakao ? `place?id=${place.maps.kakao}` : `search?q=${encodeURIComponent(placeSearchText(place, app))}`
  return `intent://${target}#Intent;scheme=kakaomap;action=android.intent.action.VIEW;category=android.intent.category.BROWSABLE;package=net.daum.android.map;${fallback};end`
}

function iosSchemeUrl(app: Exclude<MapApp, 'google'>, place: Place) {
  if (app === 'naver') return `nmap://search?query=${encodeURIComponent(placeSearchText(place, app))}&appname=${encodeURIComponent(callerName())}`
  return place.maps?.kakao ? `kakaomap://place?id=${place.maps.kakao}` : `kakaomap://search?q=${encodeURIComponent(placeSearchText(place, app))}`
}

// iOS Safari는 앱이 없을 때 스킴 호출이 조용히 실패하므로, 화면이 떠나지 않으면 웹 지도로 되돌린다.
function openIosScheme(schemeUrl: string, webUrl: string) {
  let left = false
  const markLeft = () => { if (document.visibilityState === 'hidden') left = true }
  document.addEventListener('visibilitychange', markLeft)
  window.setTimeout(() => {
    document.removeEventListener('visibilitychange', markLeft)
    if (!left) window.location.assign(webUrl)
  }, 1500)
  window.location.assign(schemeUrl)
}

/**
 * 선택한 지도 앱으로 장소를 연다.
 * 데스크톱과 구글맵은 웹 주소(모바일에서는 앱이 설치돼 있으면 앱 링크로 열릴 수 있음),
 * 모바일 네이버·카카오는 앱 호출을 먼저 시도하고 실패하면 웹 주소로 이동한다.
 */
export function openInMapApp(app: MapApp, place: Place) {
  const webUrl = placeWebUrl(app, place)
  const platform = detectPlatform()
  // 네이버 앱 스킴은 장소 ID가 아니라 좌표가 필요해서, 장소 ID가 있으면 앱 호출 대신 웹 주소로 연다.
  if (platform === 'desktop' || app === 'google' || (app === 'naver' && place.maps?.naver)) { window.location.assign(webUrl); return }
  if (platform === 'android') { window.location.assign(androidIntentUrl(app, place, webUrl)); return }
  openIosScheme(iosSchemeUrl(app, place), webUrl)
}

/** 카카오톡 인앱 브라우저에서는 앱 호출이 막힐 수 있어 기본 브라우저로 다시 연다. */
export function openInExternalBrowser(url = window.location.href) {
  window.location.assign(`kakaotalk://web/openExternal?url=${encodeURIComponent(url)}`)
}

// ---------------------------------------------------------------------------
// 통합 링크 만들기 입력 해석
// ---------------------------------------------------------------------------

export type LinkResolution = { place: Place } | { error: string }

const NOT_FOUND = '장소를 확인할 수 없어요. 지도 앱의 장소 링크나 장소 이름을 다시 확인해 주세요.'
const SHORT_LINK = '단축 링크로는 장소를 바로 확인할 수 없어요. 장소 이름이나 지도 앱의 검색 링크를 붙여넣어 주세요.'
const AMBIGUOUS = '같은 이름의 장소가 여러 곳이에요. 지점명까지 함께 입력해 주세요.'
const shortLinkHosts = ['naver.me', 'kko.to', 'maps.app.goo.gl', 'goo.gl']

const decode = (text: string) => { try { return decodeURIComponent(text) } catch { return text } }
const normalize = (text: string) => text.toLocaleLowerCase().replace(/[\s·,()-]/g, '')

/** 네이버·카카오·구글 지도의 검색·장소 링크에서 검색어를 꺼낸다. 알 수 없는 형식이면 null. */
function searchTextFromUrl(url: URL): string | null {
  const host = url.hostname.replace(/^www\./, '')
  const param = url.searchParams.get('query') || url.searchParams.get('q')
  const segment = (pattern: RegExp) => { const match = url.pathname.match(pattern); return match ? decode(match[1]) : null }
  if (host === 'map.naver.com' || host === 'm.map.naver.com') return segment(/\/(?:p\/)?search\/([^/]+)/) || param
  if (host === 'map.kakao.com') {
    const linked = segment(/\/link\/(?:search|map|to)\/([^/]+)/)
    return linked ? linked.split(',')[0] : param
  }
  if ((host === 'google.com' || host.endsWith('.google.com')) && url.pathname.startsWith('/maps')) {
    return param || segment(/\/maps\/(?:search|place)\/([^/@]+)/)
  }
  return null
}

function matchesPlaceText(place: Place, query: string) {
  const text = normalize(query)
  const name = normalize(place.name)
  if (text === name) return true
  // 너무 짧은 검색어(예: "카페")가 우연히 한 곳에만 걸려 엉뚱한 장소가 되지 않도록 세 글자 이상만 부분 일치를 허용한다.
  return text.length >= 3 && (text.includes(name) || name.includes(text))
}

/** 입력(지도 링크·스내핀 링크·장소 이름)을 준비된 장소 하나로 연결한다. */
export function resolvePlaceInput(value: string, candidates: Place[]): LinkResolution {
  const input = value.trim()
  if (!input) return { error: '지도에서 복사한 장소 링크를 붙여넣어 주세요.' }
  let query = input
  if (/^https?:\/\//i.test(input)) {
    let url: URL
    try { url = new URL(input) } catch { return { error: '링크 형식을 확인해 주세요.' } }
    const snapin = url.hash.match(/^#\/(?:go|share|place)\/([^/?#]+)/)
    if (snapin) {
      const place = candidates.find(item => item.id === decode(snapin[1]))
      return place ? { place } : { error: NOT_FOUND }
    }
    if (shortLinkHosts.includes(url.hostname.replace(/^www\./, ''))) return { error: SHORT_LINK }
    const extracted = searchTextFromUrl(url)
    if (!extracted) {
      const bySource = candidates.filter(item => item.sourceUrl === input)
      return bySource.length === 1 ? { place: bySource[0] } : { error: NOT_FOUND }
    }
    query = extracted
  }
  const matches = candidates.filter(item => matchesPlaceText(item, query))
  if (matches.length === 1) return { place: matches[0] }
  if (matches.length > 1) {
    const exact = matches.filter(item => normalize(item.name) === normalize(query))
    return exact.length === 1 ? { place: exact[0] } : { error: AMBIGUOUS }
  }
  return { error: NOT_FOUND }
}
