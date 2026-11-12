import { useEffect, useRef, useState } from 'react'
import Icon from './Icon'

type Props = { placeName: string; memo: string; isPublic?: boolean; onClose: () => void; onSave: (memo: string, isPublic: boolean) => void }

export default function MemoEditDialog({ placeName, memo, isPublic = false, onClose, onSave }: Props) {
  const ref = useRef<HTMLDialogElement>(null)
  const [draft, setDraft] = useState(memo)
  const [visible, setVisible] = useState(isPublic)
  useEffect(() => { const dialog = ref.current; dialog?.showModal(); return () => dialog?.close() }, [])
  return <dialog ref={ref} className="flow-dialog memo-edit-dialog" aria-labelledby="memo-edit-title" onCancel={event => { event.preventDefault(); onClose() }}>
    <form onSubmit={event => { event.preventDefault(); onSave(draft, visible) }}>
      <div className="flow-dialog-heading"><h2 id="memo-edit-title">메모 수정</h2><button type="button" className="icon-button" onClick={onClose} aria-label="메모 수정 닫기"><Icon name="close" /></button></div>
      <p>{placeName}</p><label htmlFor="memo-draft">내 메모</label><textarea id="memo-draft" className="memo-editor" value={draft} onChange={event => setDraft(event.target.value)} placeholder="기억하고 싶은 내용을 남겨보세요" maxLength={500} />
      <fieldset className="memo-visibility-options"><legend>공개 범위</legend>{[false, true].map(option => <label key={String(option)} className={`memo-visibility-option ${visible === option ? 'selected' : ''}`}><input type="radio" name="memo-visibility" checked={visible === option} onChange={() => setVisible(option)} /><Icon name={option ? 'eye' : 'eye-off'} size={18} /><span>{option ? '공개' : '나만 보기'}</span></label>)}</fieldset>
      <p className="memo-visibility-help">{visible ? '공개한 메모는 이 장소의 커뮤니티에 표시돼요.' : '내 메모는 나에게만 보여요.'}</p>
      <div className="button-row flow-dialog-actions"><button type="button" className="btn button secondary" onClick={onClose}>취소</button><button type="submit" className="btn button primary">저장</button></div>
    </form>
  </dialog>
}
