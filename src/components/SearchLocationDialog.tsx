import { useEffect, useRef, useState } from 'react'
import { searchAreas } from '../mocks/data'
import Icon from './Icon'

type Props = { selectedArea: string; onSelect: (area: string) => void; onClose: () => void }

export default function SearchLocationDialog({ selectedArea, onSelect, onClose }: Props) {
  const ref = useRef<HTMLDialogElement>(null)
  const [query, setQuery] = useState('')
  const results = searchAreas.filter(area => [area.name, area.description, ...area.aliases].some(value => value.includes(query.trim())))
  useEffect(() => {
    const dialog = ref.current
    dialog?.showModal()
    return () => dialog?.close()
  }, [])

  return <dialog ref={ref} className="flow-dialog" aria-labelledby="search-location-title" aria-describedby="search-location-description" onCancel={event => { event.preventDefault(); onClose() }}>
    <div className="flow-dialog-heading"><h2 id="search-location-title">어디에서 찾아볼까요?</h2><button type="button" className="icon-button" onClick={onClose} aria-label="검색 지역 선택 닫기"><Icon name="close" /></button></div>
    <p id="search-location-description">지역을 지정하지 않아도 검색할 수 있어요. 검색 문장에 적은 지역을 우선해요.</p>
    <label className="location-search"><Icon name="search" size={18} /><input aria-label="지역명 또는 역명 검색" placeholder="지역명이나 역명을 검색하세요" value={query} onChange={event => setQuery(event.target.value)} /></label>
    <button className="location-option" onClick={() => onSelect('전체 지역')}><Icon name="compass" size={20} /><span><strong>전체 지역에서 찾기</strong><small>특정 지역으로 제한하지 않아요</small></span>{selectedArea === '전체 지역' && <Icon name="check" size={18} />}</button>
    <p className="location-list-label">{query.trim() ? '검색 결과' : '최근 검색한 지역'}</p>
    <div className="location-options">{results.map(area => <button className="location-option" key={area.name} onClick={() => onSelect(area.name)}><Icon name="pin" size={20} /><span><strong>{area.name}</strong><small>{area.description}</small></span>{selectedArea === area.name && <Icon name="check" size={18} />}</button>)}</div>
    {!results.length && <p className="location-empty" role="status">일치하는 지역이 없어요. 다른 지역명이나 역명으로 찾아보세요.</p>}
  </dialog>
}
