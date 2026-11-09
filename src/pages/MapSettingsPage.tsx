import { mapApps } from '../mocks/data'
import type { MapApp } from '../mocks/data'
import Icon from '../components/Icon'

type Props = { mapApp: MapApp; onMap: (app: MapApp) => void; onConfirm: () => void }
export default function MapSettingsPage({ mapApp, onMap, onConfirm }: Props) {
  return <div className="settings-page"><div className="page-heading"><div><p className="eyebrow">MAKE YOURSELF AT HOME</p><h1>내게 가장 익숙한 지도.</h1><p>장소를 열 때 사용할 기본 지도 앱을 선택해 주세요.</p></div></div><section className="panel settings-panel"><div className="section-heading"><div><h2>기본 지도 앱</h2><p>공유받은 장소를 선택한 지도에서 확인해요.</p></div><span className="feature-icon"><Icon name="settings" /></span></div><div className="settings-options">{mapApps.map(app => <button key={app.id} className={`settings-option ${mapApp === app.id ? 'selected' : ''}`} onClick={() => onMap(app.id)} aria-pressed={mapApp === app.id}><span className={`map-logo ${app.id}`}>{app.letter}</span><span><strong>{app.name}</strong><small>{app.description}</small></span><span className="radio-circle">{mapApp === app.id && <Icon name="check" size={14} />}</span></button>)}</div><button className="button primary full" onClick={onConfirm}>이 지도로 사용할게요<Icon name="check" size={17} /></button><p className="settings-note">공유받은 장소 화면에서도 다른 지도를 선택할 수 있어요.</p></section><div className="settings-tip"><Icon name="link" size={22} /><div><h3>보내는 사람과 다른 지도를 써도 괜찮아요</h3><p>하나의 스내핀 링크가 내가 쓰는 지도로 이어져요.</p></div></div></div>
}
