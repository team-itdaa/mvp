import { useEffect, useRef, useState } from 'react'
import type { ChangeEvent } from 'react'
import Icon from './Icon'
import ProfileAvatar from './ProfileAvatar'

export type Profile = { nickname: string; email: string; image?: string; socialUrl?: string }
type Props = {
  profile: Profile
  postCount: number
  visitedCount: number
  onSave: (profile: Profile) => void
  onClose: () => void
  onSettings: () => void
  onMyPage?: () => void
  startEditing?: boolean
}

function safeSocialUrl(value: string) {
  try {
    const url = new URL(value)
    return ['http:', 'https:'].includes(url.protocol) ? url.href : null
  } catch { return null }
}

export default function ProfileDialog({ profile, postCount, visitedCount, onSave, onClose, onSettings, onMyPage, startEditing = false }: Props) {
  const dialog = useRef<HTMLDialogElement>(null)
  const upload = useRef<HTMLInputElement>(null)
  const reader = useRef<FileReader | null>(null)
  const [editing, setEditing] = useState(startEditing)
  const [draft, setDraft] = useState(profile)
  const [imageError, setImageError] = useState('')
  const [readingImage, setReadingImage] = useState(false)
  const socialUrl = safeSocialUrl(profile.socialUrl || '')
  const draftSocialUrl = draft.socialUrl?.trim() || ''
  const invalidSocialUrl = Boolean(draftSocialUrl && !safeSocialUrl(draftSocialUrl))
  useEffect(() => {
    const element = dialog.current
    element?.showModal()
    return () => { reader.current?.abort(); element?.close() }
  }, [])

  function stopReading() {
    reader.current?.abort()
    reader.current = null
    setReadingImage(false)
  }
  function cancelEditing() {
    stopReading()
    setDraft(profile)
    setImageError('')
    setEditing(false)
  }
  function readImage(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    event.target.value = ''
    if (!file) return
    stopReading()
    if (!['image/jpeg', 'image/png', 'image/webp', 'image/gif'].includes(file.type)) {
      setImageError('JPG, PNG, WEBP, GIF 사진을 선택해 주세요.')
      return
    }
    if (file.size > 5 * 1024 * 1024) {
      setImageError('5MB 이하의 사진을 선택해 주세요.')
      return
    }
    setImageError('')
    setReadingImage(true)
    const nextReader = new FileReader()
    reader.current = nextReader
    nextReader.onload = () => {
      if (typeof nextReader.result === 'string') setDraft(current => ({ ...current, image: nextReader.result as string }))
      setReadingImage(false)
    }
    nextReader.onerror = () => { setImageError('사진을 읽지 못했어요. 다시 선택해 주세요.'); setReadingImage(false) }
    nextReader.readAsDataURL(file)
  }

  return <dialog ref={dialog} className="flow-dialog profile-dialog" aria-labelledby="profile-dialog-title"
    onCancel={event => { event.preventDefault(); if (editing) cancelEditing(); else onClose() }}
    onClick={event => {
      if (event.target !== event.currentTarget) return
      const bounds = event.currentTarget.getBoundingClientRect()
      if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) onClose()
    }}>
    <div className="flow-dialog-heading"><h2 id="profile-dialog-title">{editing ? '프로필 수정' : '내 프로필'}</h2><button type="button" className="icon-button" onClick={onClose} aria-label="프로필 닫기"><Icon name="close" /></button></div>
    {editing ? <form className="profile-edit-form" onSubmit={event => {
      event.preventDefault()
      if (!draft.nickname.trim() || invalidSocialUrl || readingImage) return
      onSave({ ...draft, email: profile.email, nickname: draft.nickname.trim(), socialUrl: draftSocialUrl ? safeSocialUrl(draftSocialUrl)! : undefined })
      setEditing(false)
    }}>
      <div className="profile-image-editor">
        <ProfileAvatar nickname={draft.nickname} image={draft.image} className="profile-avatar-large" />
        <div className="profile-image-controls">
          <button type="button" className="btn button secondary profile-upload-button" onClick={() => upload.current?.click()}><Icon name="image" size={18} />사진 변경</button>
          {draft.image && <button type="button" className="text-button" onClick={() => { stopReading(); setDraft(current => ({ ...current, image: undefined })); setImageError('') }}>사진 삭제</button>}
          <input ref={upload} type="file" accept="image/jpeg,image/png,image/webp,image/gif" hidden aria-label="프로필 사진 선택" onChange={readImage} />
        </div>
      </div>
      <p className="profile-field-help">JPG, PNG, WEBP, GIF · 최대 5MB</p>
      {imageError && <p className="profile-error" role="alert">{imageError}</p>}
      {readingImage && <p className="profile-field-help" role="status">사진을 불러오는 중이에요.</p>}
      <label htmlFor="profile-nickname">닉네임</label>
      <input id="profile-nickname" value={draft.nickname} onChange={event => setDraft(current => ({ ...current, nickname: event.target.value }))} maxLength={20} required autoFocus />
      <label htmlFor="profile-social-url">소셜 링크 <span className="profile-field-help">선택</span></label>
      <input id="profile-social-url" type="url" value={draft.socialUrl || ''} onChange={event => setDraft(current => ({ ...current, socialUrl: event.target.value }))} placeholder="https://www.instagram.com/" aria-invalid={invalidSocialUrl} aria-describedby={invalidSocialUrl ? 'profile-social-error' : undefined} />
      {invalidSocialUrl && <p id="profile-social-error" className="profile-error">http:// 또는 https://로 시작하는 링크를 입력해 주세요.</p>}
      <div className="flow-dialog-actions"><button className="btn button secondary" type="button" onClick={cancelEditing}>취소</button><button className="btn button primary" type="submit" disabled={!draft.nickname.trim() || invalidSocialUrl || readingImage}>저장</button></div>
    </form> : <>
      <div className="profile-overview">
        <ProfileAvatar nickname={profile.nickname} image={profile.image} className="profile-avatar-large" />
        <div className="profile-identity"><h3>{profile.nickname}</h3><p className="profile-email">{profile.email}</p></div>
      </div>
      {socialUrl ? <a className="profile-social-link" href={socialUrl} target="_blank" rel="noopener noreferrer"><Icon name="link" size={18} /><span>{new URL(socialUrl).hostname.replace(/^www\./, '')}{new URL(socialUrl).pathname.replace(/\/$/, '')}</span><span className="visually-hidden"> (새 탭에서 열기)</span></a> : <p className="profile-no-social">등록한 소셜 링크가 없어요.</p>}
      <dl className="profile-stats"><div><dt>작성한 글</dt><dd>{postCount}<span>개</span></dd></div><div><dt>둘러본 장소</dt><dd>{visitedCount}<span>곳</span></dd></div></dl>
      <div className="profile-primary-actions"><button type="button" className="btn button primary" onClick={() => { setDraft(profile); setImageError(''); setEditing(true) }}><Icon name="edit" size={18} />프로필 수정</button><button type="button" className="btn button secondary" onClick={onSettings}><Icon name="settings" size={18} />설정</button></div>
      {onMyPage && <div className="profile-shortcuts"><button type="button" className="text-button" onClick={onMyPage}><Icon name="user" size={18} />마이페이지<Icon name="chevron" size={18} /></button></div>}
    </>}
  </dialog>
}
