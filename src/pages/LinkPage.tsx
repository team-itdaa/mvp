import { useState } from 'react'
import { asset, mockShareUrl, places } from '../mocks/data'
import type { Place } from '../mocks/data'
import Icon from '../components/Icon'

type Props = { recent: string[]; onGenerate: (place: Place) => void; onShare: (place: Place) => void; onCopy: (place: Place) => void }
export default function LinkPage({ recent, onGenerate, onShare, onCopy }: Props) {
  const [input, setInput] = useState('')
  const [result, setResult] = useState<Place | null>(null)
  const [error, setError] = useState('')
  return (
    <div className="link-page">
      <div className="page-heading hero" data-enter><div><h1>통합 링크 만들기</h1><p>친구가 어떤 지도를 쓰든, 같은 장소에서 만나요.</p></div><span className="page-symbol"><Icon name="link" size={28} /></span></div>
      <div className="link-layout"><section className="panel link-form"><form onSubmit={e => { e.preventDefault(); if (!input.trim()) { setError('지도에서 복사한 장소 링크를 붙여넣어 주세요.'); return } const value = input.trim(); const isUrl = value.startsWith('https://') || value.startsWith('http://'); const candidates = places.filter(p => isUrl ? value === mockShareUrl(p.id) || value === p.sourceUrl : value === p.name); const match = candidates.length === 1 ? candidates[0] : undefined; if (!match) { setError('장소를 확인할 수 없어요. 지도에서 복사한 링크를 다시 확인해 주세요.'); return } setError(''); setResult(match); onGenerate(match) }}>
          <label htmlFor="place-link">지도 링크</label><div className={`field-with-icon ${error ? 'invalid' : ''}`}><Icon name="link" size={18} /><input id="place-link" value={input} onChange={e => { setInput(e.target.value); setResult(null); setError('') }} placeholder="지도에서 복사한 장소 링크를 붙여넣으세요" aria-invalid={!!error} aria-describedby={error ? 'link-error' : 'link-help'} /></div>
          {error && <p className="error" id="link-error" role="alert">{error}</p>}<p className="field-help" id="link-help">네이버지도 · 카카오맵 · 구글맵에서 장소의 공유 링크를 복사해 주세요.</p>
          <button className="btn button primary full" type="submit"><Icon name="link" size={17} /> 통합 링크 만들기<Icon name="arrow" size={17} /></button>
        </form>
        {result && <div className="link-result" role="status"><span><Icon name="check" size={17} /> 통합 링크가 준비됐어요.</span><img src={asset(result.image)} alt={result.name} style={{ width: "100%", maxHeight: 220, objectFit: "cover", borderRadius: "var(--radius-card, 16px)" }} /><h3>{result.name}</h3><p>{result.address}</p><input aria-label="통합 링크" readOnly value={mockShareUrl(result.id)} onFocus={e => e.target.select()} /><div className="button-row"><button className="btn button primary" onClick={() => onCopy(result)}><Icon name="copy" size={16} />링크 복사</button><button className="btn button secondary" onClick={() => onShare(result)}>통합페이지 열기<Icon name="arrow" size={16} /></button></div></div>}
      </section></div>
      <section className="panel recent-links"><div className="section-heading"><h2>최근 만든 링크 <span className="count">{recent.length}</span></h2><span className="muted small">내가 공유한 장소</span></div>{recent.map(id => { const p = places.find(p => p.id === id)!; return <div className="recent-row" key={id}><img src={asset(p.image)} alt="" /><button className="recent-title" onClick={() => onShare(p)}><strong>{p.name}</strong><span>{p.neighborhood} · {p.category}</span></button><button className="icon-button" aria-label={`${p.name} 링크 복사`} onClick={() => onCopy(p)}><Icon name="copy" size={17} /></button><button className="icon-button" aria-label={`${p.name} 공유 화면 보기`} onClick={() => onShare(p)}><Icon name="arrow" size={18} /></button></div> })}</section>
    </div>
  )
}
