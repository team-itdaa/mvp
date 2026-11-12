import type { MapApp } from '../mocks/data'

const files: Record<MapApp, string> = { naver: 'naver', kakao: 'kakao', google: 'google-maps' }

export default function MapBrand({ app }: { app: MapApp }) {
  return <span className={`map-logo ${app}`} aria-hidden="true"><img src={`${import.meta.env.BASE_URL}assets/icons/${files[app]}.svg`} alt="" width="28" height="28" /></span>
}
