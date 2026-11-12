export default function MockMap({ name, area }: { name: string; area: string }) {
  return <div className="mock-map" role="img" aria-label={`${name} 위치를 나타내는 도식. 실제 길찾기는 지도 앱에서 확인하세요.`}><svg viewBox="0 0 900 300" aria-hidden="true" preserveAspectRatio="xMidYMid slice">
    <rect width="900" height="300" fill="#eef0ec" />
    <g fill="#e2e8df"><rect x="30" y="20" width="175" height="85" rx="12" /><rect x="620" y="22" width="140" height="78" rx="12" /><rect x="100" y="220" width="190" height="80" rx="12" /><rect x="555" y="210" width="130" height="80" rx="12" /></g>
    <path d="M-20 260C180 90 280 350 530 190S760 220 940 85" stroke="#d0e4ee" strokeWidth="45" fill="none" />
    <g stroke="white" fill="none"><path d="M0 130 900 130M300 0 360 300M600 0 540 300M30 0 130 300M810 0 760 300" strokeWidth="18" /><path d="M0 55 900 55M0 240 900 240M470 0 470 300" strokeWidth="8" /></g>
    <g fill="#dfe2dc"><rect x="365" y="70" width="70" height="40" rx="5" /><rect x="485" y="150" width="45" height="50" rx="5" /><rect x="190" y="150" width="80" height="65" rx="5" /><rect x="655" y="155" width="70" height="48" rx="5" /></g>
    <circle cx="450" cy="126" r="37" fill="#8061b0" opacity=".09" /><circle cx="450" cy="126" r="25" fill="#8061b0" opacity=".08" />
    <path d="M466 118c0 14-16 30-16 30s-16-16-16-30a16 16 0 1 1 32 0" fill="#8061b0" /><circle cx="450" cy="117" r="5.5" fill="white" />
  </svg><span className="map-area-label">{area}</span><span className="map-place-label">{name}</span></div>
}
