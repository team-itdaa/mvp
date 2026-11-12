import { useId, useRef, useState } from 'react'
import { asset, places } from '../mocks/data'
import Icon from './Icon'

type Props = { value?: string; onChange: (value?: string) => void }
export default function FolderThumbnailPicker({ value, onChange }: Props) {
  const inputId = useId()
  const readVersion = useRef(0)
  const [error, setError] = useState('')
  return <fieldset className="folder-thumbnail-picker"><legend>폴더 대표 사진 <span className="optional-label">선택</span></legend>
    <div className="folder-thumbnail-options"><button type="button" className={`thumbnail-option ${!value ? 'selected' : ''}`} onClick={() => { readVersion.current++; onChange(undefined) }} aria-pressed={!value} aria-label="기본 폴더 이미지"><Icon name="folder" size={24} /></button>{places.slice(0, 5).map(place => <button type="button" key={place.id} className={`thumbnail-option ${value === asset(place.image) ? 'selected' : ''}`} onClick={() => { readVersion.current++; onChange(asset(place.image)) }} aria-pressed={value === asset(place.image)} aria-label={`${place.name} 사진 선택`}><img src={asset(place.image)} alt="" /></button>)}</div>
    <div className="thumbnail-upload-row">{value?.startsWith('data:') && <img className="thumbnail-upload-preview" src={value} alt="업로드한 폴더 대표 사진" />}<label className="btn button secondary thumbnail-upload-button" htmlFor={inputId}><Icon name="image" size={17} />사진 업로드</label><input className="visually-hidden" id={inputId} type="file" accept="image/*" onChange={event => {
      const file = event.target.files?.[0]; event.target.value = ''; if (!file) return
      const version = ++readVersion.current
      if (!file.type.startsWith('image/')) { setError('이미지 파일을 선택해 주세요.'); return }
      if (file.size > 10 * 1024 * 1024) { setError('10MB 이하의 사진을 선택해 주세요.'); return }
      setError(''); const reader = new FileReader(); reader.onload = () => { if (version === readVersion.current && typeof reader.result === 'string') onChange(reader.result) }; reader.onerror = () => { if (version === readVersion.current) setError('사진을 불러오지 못했어요. 다른 사진을 선택해 주세요.') }; reader.readAsDataURL(file)
    }} /></div>{error && <p className="error" role="alert">{error}</p>}
  </fieldset>
}
