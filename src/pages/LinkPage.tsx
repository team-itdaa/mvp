import { useState } from 'react'
import { asset, mockShareUrl, places } from '../mocks/data'
import type { Place } from '../mocks/data'
import Icon from '../components/Icon'

type Props = { recent: string[]; onGenerate: (place: Place) => void; onShare: (place: Place) => void; onCopy: (place: Place) => void }
export default function LinkPage({ recent, onGenerate, onShare, onCopy }: Props) {
  const [input, setInput] = useState('')
  const [selected, setSelected] = useState(places[0].id)
  const [result, setResult] = useState<Place | null>(null)
  const [error, setError] = useState('')
  const choose = (place: Place) => { setSelected(place.id); setInput(place.name); setResult(null); setError('') }
  return (
    <div className="link-page">
      <div className="page-heading"><div><p className="eyebrow">ONE PLACE, ONE LINK</p><h1>좋은 장소를, 링크 하나로.</h1><p>어떤 지도 앱을 쓰든 편하게 나눌 수 있도록.</p></div></div>
      <div className="link-layout"><section className="panel link-form"><div className="section-heading"><div><h2>통합 링크 만들기</h2><p>지도 링크나 장소명을 입력해 주세요.</p></div><span className="feature-icon"><Icon name="link" /></span></div><div className="flow-strip"><span><b>1</b> 장소 입력</span><i /><span><b>2</b> 링크 생성</span><i /><span><b>3</b> 간편한 공유</span></div>
        <form onSubmit={e => { e.preventDefault(); if (!input.trim()) { setError('장소명이나 지도 링크를 입력해 주세요.'); return } const match = places.find(p => input.includes(p.name)) || (/^https?:\/\//.test(input) ? places.find(p => p.id === selected) : undefined); if (!match) { setError('장소를 찾을 수 없어요. 장소명을 확인해 주세요.'); return } setError(''); setSelected(match.id); setResult(match); onGenerate(match) }}>
          <label htmlFor="place-link">장소명 또는 지도 링크</label><div className={`field-with-icon ${error ? 'invalid' : ''}`}><Icon name="link" size={18} /><input id="place-link" value={input} onChange={e => { setInput(e.target.value); setResult(null); setError('') }} placeholder="지도 링크를 붙여넣거나 장소명을 입력하세요" aria-invalid={!!error} aria-describedby={error ? 'link-error' : 'link-help'} /></div>
          {error && <p className="error" id="link-error" role="alert">{error}</p>}<p className="field-help" id="link-help">네이버지도 · 카카오맵 · 구글맵</p>
          <div className="quick-examples"><span>빠르게 선택</span>{places.slice(0, 3).map(place => <button key={place.id} type="button" onClick={() => choose(place)}>{place.name}<Icon name="plus" size={12} /></button>)}</div>
          <label htmlFor="matched-place" className="spaced-label">연결할 장소 확인</label><select id="matched-place" value={selected} onChange={e => { const place = places.find(p => p.id === e.target.value)!; choose(place) }}>{places.map(p => <option key={p.id} value={p.id}>{p.name} · {p.neighborhood}</option>)}</select><p className="field-help">장소명과 지역을 확인한 뒤 링크를 만들어 주세요.</p>
          <button className="button primary full" type="submit"><Icon name="link" size={17} /> 통합 링크 만들기<Icon name="arrow" size={17} /></button>
        </form>
        {result && <div className="link-result" role="status"><span><Icon name="check" size={17} /> 공유할 준비가 됐어요!</span><h3>{result.name}</h3><input aria-label="통합 링크" readOnly value={mockShareUrl(result.id)} onFocus={e => e.target.select()} /><div className="button-row"><button className="button primary" onClick={() => onCopy(result)}><Icon name="copy" size={16} />링크 복사</button><button className="button secondary" onClick={() => onShare(result)}>통합페이지 열기<Icon name="arrow" size={16} /></button></div></div>}
      </section><aside className="link-aside"><div className="link-visual"><span className="eyebrow">SHARE PLACES, NOT PLATFORMS</span><div className="link-visual-photo"><img src={asset(places.find(p => p.id === selected)!.image)} alt="선택한 장소의 예시 사진" /><span><Icon name="pin" size={16} />{places.find(p => p.id === selected)!.name}</span></div><div className="visual-connector"><Icon name="link" size={19} /><span>하나의 스내핀 링크</span></div><div className="visual-maps"><span className="map-logo naver">N</span><span className="map-logo kakao">K</span><span className="map-logo google">G</span></div><h3>받는 사람의 지도는 달라도 괜찮아요.</h3><p>자신이 쓰는 지도 앱으로 장소를 확인해요.</p></div></aside></div>
      <section className="panel recent-links"><div className="section-heading"><h2>최근 만든 링크 <span className="count">{recent.length}</span></h2><span className="muted small">내가 공유한 장소</span></div>{recent.map(id => { const p = places.find(p => p.id === id)!; return <div className="recent-row" key={id}><img src={asset(p.image)} alt="" /><button className="recent-title" onClick={() => onShare(p)}><strong>{p.name}</strong><span>{p.neighborhood} · {p.category}</span></button><button className="icon-button" aria-label={`${p.name} 링크 복사`} onClick={() => onCopy(p)}><Icon name="copy" size={17} /></button><button className="icon-button" aria-label={`${p.name} 공유 화면 보기`} onClick={() => onShare(p)}><Icon name="arrow" size={18} /></button></div> })}</section>
    </div>
  )
}
