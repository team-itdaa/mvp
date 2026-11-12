import { useEffect, useRef, useState } from 'react'

type Props = { text: string; className?: string; hasMore?: boolean }

// Kept inside the parent link or button so the whole preview opens the full post.
export default function TextPreview({ text, className = '', hasMore = false }: Props) {
  const ref = useRef<HTMLParagraphElement>(null)
  const [clipped, setClipped] = useState(false)
  useEffect(() => {
    const element = ref.current
    if (!element) return
    const measure = () => setClipped(element.scrollHeight > element.clientHeight + 1)
    const observer = new ResizeObserver(measure)
    observer.observe(element)
    const frame = requestAnimationFrame(measure)
    return () => { observer.disconnect(); cancelAnimationFrame(frame) }
  }, [text])
  return <><p ref={ref} className={`text-preview ${className}`}>{text}</p>{(clipped || hasMore) && <span className="preview-read-more">… 더보기</span>}</>
}
