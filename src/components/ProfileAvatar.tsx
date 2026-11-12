type Props = { nickname: string; image?: string; className?: string }

export default function ProfileAvatar({ nickname, image, className = '' }: Props) {
  return <span className={`profile-avatar ${className}`.trim()} aria-hidden="true">
    {image ? <img src={image} alt="" /> : nickname.trim().slice(0, 1) || '배'}
  </span>
}
