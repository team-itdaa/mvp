import { useEffect, useRef, useState } from 'react'
import type { Collection, Place } from '../mocks/data'
import Icon from './Icon'
import FolderThumbnailPicker from './FolderThumbnailPicker'

type Props = {
  place: Place
  collections: Collection[]
  onClose: () => void
  onConfirm: (collectionIds: string[], newFolderName?: string, coverImage?: string) => void
}

export default function SavePlaceDialog({ place, collections, onClose, onConfirm }: Props) {
  const ref = useRef<HTMLDialogElement>(null)
  const [selectedIds, setSelectedIds] = useState(() => collections.filter(folder => folder.placeIds.includes(place.id)).map(folder => folder.id))
  const [creating, setCreating] = useState(false)
  const [name, setName] = useState('')
  const [coverImage, setCoverImage] = useState<string>()
  const folderName = name.trim()
  const duplicate = creating && !!folderName && collections.some(folder => folder.name.toLocaleLowerCase() === folderName.toLocaleLowerCase())
  const alreadySaved = collections.some(folder => folder.placeIds.includes(place.id))
  const canConfirm = !duplicate && (!creating || !!folderName) && (alreadySaved || selectedIds.length > 0 || (creating && !!folderName))

  useEffect(() => {
    const dialog = ref.current
    dialog?.showModal()
    return () => dialog?.close()
  }, [])

  return (
    <dialog ref={ref} className="flow-dialog" aria-labelledby="save-place-title" aria-describedby="save-place-description" onCancel={event => { event.preventDefault(); onClose() }}>
      <form onSubmit={event => { event.preventDefault(); if (canConfirm) onConfirm(selectedIds, creating ? folderName : undefined, creating ? coverImage : undefined) }}>
        <div className="flow-dialog-heading"><h2 id="save-place-title">어느 폴더에 담을까요?</h2><button type="button" className="icon-button" onClick={onClose} aria-label="저장할 폴더 선택 닫기"><Icon name="close" /></button></div>
        <p id="save-place-description">{place.name} · 여러 폴더에 저장할 수 있어요.</p>
        <fieldset className="save-folder-options"><legend className="visually-hidden">저장할 폴더</legend>
          {collections.map(folder => <label key={folder.id} className={`save-folder-option ${selectedIds.includes(folder.id) ? 'selected' : ''}`}><Icon name="folder" size={22} /><span><strong>{folder.name}</strong><small>장소 {folder.placeIds.length}개</small></span><input type="checkbox" checked={selectedIds.includes(folder.id)} onChange={event => setSelectedIds(ids => event.target.checked ? [...ids, folder.id] : ids.filter(id => id !== folder.id))} /></label>)}
        </fieldset>
        <button type="button" className="text-button new-folder-button" onClick={() => setCreating(value => !value)} aria-expanded={creating}><Icon name="plus" size={17} />{creating ? '새 폴더 만들기 취소' : '새 폴더 만들기'}</button>
        {creating && <div className="new-folder-field"><label htmlFor="save-folder-name">폴더 이름</label><input id="save-folder-name" placeholder="폴더 이름을 입력하세요" value={name} onChange={event => setName(event.target.value)} maxLength={40} required aria-invalid={duplicate} aria-describedby={duplicate ? 'save-folder-error' : undefined} /><FolderThumbnailPicker value={coverImage} onChange={setCoverImage} />{duplicate && <p id="save-folder-error" className="error" role="alert">같은 이름의 폴더가 있어요. 위 목록에서 선택해 주세요.</p>}</div>}
        <div className="button-row flow-dialog-actions"><button type="button" className="btn button secondary" onClick={onClose}>취소</button><button type="submit" className="btn button primary" disabled={!canConfirm}>{alreadySaved ? '저장 위치 적용' : '저장하기'}</button></div>
      </form>
    </dialog>
  )
}
