import { mapApps } from '../mocks/data'
import type { MapApp } from '../mocks/data'
import Icon from '../components/Icon'
import MapBrand from '../components/MapBrand'

type Props = { mapApp: MapApp; defaultMap: MapApp | null; onMap: (app: MapApp) => void; onConfirm: () => void; onReset: () => void }
export default function MapSettingsPage({ mapApp, defaultMap, onMap, onConfirm, onReset }: Props) {
  const selected = mapApps.find(app => app.id === mapApp)!
  const current = mapApps.find(app => app.id === defaultMap)
  return (
    <div className="settings-page">
      <div className="page-heading hero" data-enter><div><h1>기본 지도 설정</h1><p>장소를 열 때 사용할 지도를 골라주세요.</p></div><span className="page-symbol"><Icon name="settings" size={28} /></span></div>
      <div className="settings-layout">
        <section className="panel settings-panel" aria-labelledby="map-settings-title">
          <div className="section-heading"><div><h2 id="map-settings-title">내가 쓰는 지도</h2><p>장소 정보와 길찾기를 확인할 앱이에요.</p></div></div>
          <div className="settings-options">{mapApps.map(app => <button key={app.id} className={`settings-option ${mapApp === app.id ? 'selected' : ''}`} onClick={() => onMap(app.id)} aria-pressed={mapApp === app.id}><MapBrand app={app.id} /><span><strong>{app.name}</strong><small>{app.description}</small></span><span className="radio-circle">{mapApp === app.id && <Icon name="check" size={15} />}</span></button>)}</div>
          <p className="field-help" role="status">{current ? `현재 기본 지도: ${current.name}` : '기본 지도가 없어요. 링크를 열 때마다 지도 앱을 선택해요.'}</p>
          <button className="btn button primary full" onClick={onConfirm}>기본 지도로 설정<Icon name="check" size={17} /></button>
          {current && <button className="text-button settings-reset" onClick={onReset}>기본 지도 해제</button>}
          <p className="settings-note">장소 통합페이지에서 다른 지도를 선택할 수도 있어요.</p>
        </section>
        <aside className="settings-summary"><span className="summary-icon"><Icon name="pin" size={28} /></span><h2>같은 장소로 <br />이어지는 링크</h2><p>친구와 다른 지도 앱을 써도 <br />약속 장소는 같으니까요.</p><div className="selected-map-summary"><span>선택한 지도</span><div><MapBrand app={mapApp} /><strong>{selected.name}</strong><Icon name="check" size={18} /></div></div></aside>
      </div>
    </div>
  )
}
