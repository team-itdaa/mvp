import { useEffect, useState } from 'react'
import { asset, mapApps, places } from '../mocks/data'
import type { Collection, MapApp, Place } from '../mocks/data'
import Icon from '../components/Icon'
import MapBrand from '../components/MapBrand'
import { isKakaoTalkBrowser, openInExternalBrowser, openInMapApp } from '../lib/mapLinks'

// 기본 지도가 있으면 장소를 잠깐 보여 준 뒤 자동으로 연결한다.
const AUTO_OPEN_DELAY = 1600
const autoOpenedKey = (targetId: string) => `snapin.autoOpened.${targetId}`
const wasAutoOpened = (targetId: string) => {
  try { return window.sessionStorage.getItem(autoOpenedKey(targetId)) === '1' } catch { return false }
}
// 지도에서 뒤로 돌아왔을 때 같은 링크가 다시 자동으로 열리는 반복을 막는다.
const markAutoOpened = (targetId: string) => {
  try { window.sessionStorage.setItem(autoOpenedKey(targetId), '1') } catch { /* 저장소를 쓸 수 없으면 반복 방지만 생략된다. */ }
}
const mapName = (app: MapApp) => mapApps.find(item => item.id === app)?.name ?? ''

type Props = {
  targetId?: string
  collections: Collection[]
  defaultMap: MapApp | null
  onDefaultMap: (app: MapApp) => void
  /** 장소별 메모와 공개 여부. 공개한 메모는 리스트를 받은 사람에게 코멘트로 보여 준다. */
  memos?: Record<string, string>
  publicMemos?: Record<string, boolean>
}

/** 통합 링크를 받은 사람이 보는 화면. 앱 메뉴 없이 장소와 지도 연결만 보여 준다. */
export default function ReceiverPage({ targetId, collections, defaultMap, onDefaultMap, memos = {}, publicMemos = {} }: Props) {
  const list = collections.find(item => `list-${item.id}` === targetId)
  const place = list ? undefined : places.find(item => item.id === targetId)
  return (
    <div className="receiver-page">
      <header className="receiver-header">
        <a className="receiver-brand" href="#/explore" aria-label="스내핀 홈으로 이동"><span className="brand-mark"><Icon name="pin" size={18} /></span><span>snapin</span></a>
      </header>
      <main id="main-content" tabIndex={-1} className="receiver-main">
        {list ? <ReceiverList key={list.id} list={list} defaultMap={defaultMap} onDefaultMap={onDefaultMap} memos={memos} publicMemos={publicMemos} />
          : place ? <ReceiverPlace key={place.id} place={place} defaultMap={defaultMap} onDefaultMap={onDefaultMap} />
            : <section className="panel empty-state"><Icon name="link" size={40} /><h1>장소를 찾을 수 없어요</h1><p>링크가 올바른지 보낸 사람에게 다시 확인해 주세요.</p><a className="btn button primary" href="#/explore">스내핀에서 장소 찾기</a></section>}
      </main>
      <footer className="receiver-footer">친구가 보낸 장소를 내가 쓰는 지도 앱으로 열어 주는 스내핀 통합 링크예요.</footer>
    </div>
  )
}

function MapChoices({ selected, onPick }: { selected: MapApp | null; onPick: (app: MapApp) => void }) {
  return (
    <div className="map-choice-row" role="group" aria-label="지도 앱 선택">
      {mapApps.map(app => (
        <button key={app.id} type="button" onClick={() => onPick(app.id)} className={app.id === selected ? 'selected' : ''} aria-pressed={selected ? app.id === selected : undefined}>
          <MapBrand app={app.id} /><span>{app.name}</span>{app.id === selected && <Icon name="check" size={13} />}
        </button>
      ))}
    </div>
  )
}

function RememberOption({ checked, onChange }: { checked: boolean; onChange: (value: boolean) => void }) {
  return (
    <>
      <label className="receiver-remember"><input type="checkbox" checked={checked} onChange={event => onChange(event.target.checked)} />이 지도를 기본으로 사용</label>
      <p className="field-help">기본으로 정하면 다음부터 링크를 열 때 바로 연결돼요. 설정에서 언제든 바꿀 수 있어요.</p>
    </>
  )
}

function KakaoTalkNotice() {
  if (!isKakaoTalkBrowser()) return null
  return (
    <div className="receiver-notice" role="note">
      <p>카카오톡 안에서는 지도 앱이 바로 열리지 않을 수 있어요.</p>
      <button type="button" className="text-button" onClick={() => openInExternalBrowser()}>기본 브라우저에서 열기<Icon name="arrow" size={15} /></button>
    </div>
  )
}

function ReceiverPlace({ place, defaultMap, onDefaultMap }: { place: Place; defaultMap: MapApp | null; onDefaultMap: (app: MapApp) => void }) {
  const kakaoTalk = isKakaoTalkBrowser()
  const [choosing, setChoosing] = useState(false)
  const [remember, setRemember] = useState(true)
  const [waiting, setWaiting] = useState(() => !!defaultMap && !kakaoTalk && !wasAutoOpened(place.id))

  useEffect(() => {
    if (!waiting || !defaultMap) return
    const timer = window.setTimeout(() => { markAutoOpened(place.id); openInMapApp(defaultMap, place) }, AUTO_OPEN_DELAY)
    return () => window.clearTimeout(timer)
  }, [waiting, defaultMap, place])

  const open = (app: MapApp) => { markAutoOpened(place.id); openInMapApp(app, place) }
  const pick = (app: MapApp) => {
    if (remember) onDefaultMap(app)
    setWaiting(false); setChoosing(false)
    open(app)
  }

  return (
    <article className="panel receiver-card">
      <div className="receiver-photo"><img src={asset(place.image)} alt={`${place.name} 대표 사진`} /><span className="photo-label">{place.category}</span></div>
      <div className="receiver-body">
        <span className="muted small">{place.neighborhood}</span>
        <h1>{place.name}</h1>
        <div className="address-row"><Icon name="pin" size={16} />{place.address}</div>
        <div className="address-row"><Icon name="clock" size={16} />{place.hours}</div>
        <p className="receiver-description">{place.description}</p>
      </div>
      <section className="receiver-connect" aria-labelledby="receiver-connect-title" aria-live="polite">
        {choosing || !defaultMap ? (
          <>
            <h2 id="receiver-connect-title">어떤 지도로 열까요?</h2>
            <p>가장 익숙한 지도 앱을 골라 주세요.</p>
            <MapChoices selected={null} onPick={pick} />
            <RememberOption checked={remember} onChange={setRemember} />
            {defaultMap && <button type="button" className="text-button" onClick={() => setChoosing(false)}>취소</button>}
          </>
        ) : waiting ? (
          <>
            <h2 id="receiver-connect-title">{mapName(defaultMap)}에서 여는 중이에요</h2>
            <p>기본 지도로 설정해 둔 앱이에요.</p>
            <div className="receiver-progress" aria-hidden="true"><span /></div>
            <div className="button-row">
              <button type="button" className="btn button primary" onClick={() => { setWaiting(false); open(defaultMap) }}>지금 열기<Icon name="arrow" size={16} /></button>
              <button type="button" className="btn button secondary" onClick={() => { setWaiting(false); setChoosing(true) }}>다른 지도 앱 선택</button>
            </div>
          </>
        ) : (
          <>
            <h2 id="receiver-connect-title">내 기본 지도에서 열기</h2>
            <p>내가 정한 기본 지도: {mapName(defaultMap)}</p>
            <button type="button" className="btn button primary full receiver-open" onClick={() => open(defaultMap)}><MapBrand app={defaultMap} />{mapName(defaultMap)}에서 열기<Icon name="arrow" size={16} /></button>
            <button type="button" className="text-button" onClick={() => setChoosing(true)}>다른 지도 앱 선택</button>
          </>
        )}
        <KakaoTalkNotice />
        <a className="text-button receiver-more" href={`#/place/${place.id}`}>스내핀에서 장소 자세히 보기<Icon name="arrow" size={15} /></a>
      </section>
    </article>
  )
}

function ReceiverList({ list, defaultMap, onDefaultMap, memos, publicMemos }: { list: Collection; defaultMap: MapApp | null; onDefaultMap: (app: MapApp) => void; memos: Record<string, string>; publicMemos: Record<string, boolean> }) {
  const [selected, setSelected] = useState<MapApp | null>(defaultMap)
  const [remember, setRemember] = useState(true)
  const listPlaces = list.placeIds.flatMap(id => places.filter(item => item.id === id))
  const choose = (app: MapApp) => { setSelected(app); if (remember) onDefaultMap(app) }
  return (
    <>
      <div className="receiver-list-heading">
        <span className="shared-label"><Icon name="folder" size={15} />공유받은 리스트</span>
        <h1>{list.name}</h1>
        <p className="muted">{listPlaces.length}개의 장소를 내 지도 앱으로 열어 보세요.</p>
      </div>
      <section className="panel receiver-connect receiver-list-map" aria-labelledby="receiver-list-map-title">
        <h2 id="receiver-list-map-title">어떤 지도로 열까요?</h2>
        <MapChoices selected={selected} onPick={choose} />
        <RememberOption checked={remember} onChange={setRemember} />
        <KakaoTalkNotice />
      </section>
      <section className="panel receiver-list" aria-label="리스트에 담긴 장소">
        {listPlaces.length ? listPlaces.map(item => (
          <div className="recent-row" key={item.id}>
            <img src={asset(item.image)} alt="" />
            <div className="recent-title"><strong>{item.name}</strong><span>{item.neighborhood} · {item.category}</span>{publicMemos[item.id] && memos[item.id]?.trim() && <p className="receiver-comment">{memos[item.id]}</p>}</div>
            <button type="button" className="btn button secondary" disabled={!selected} onClick={() => selected && openInMapApp(selected, item)}>{selected ? `${mapName(selected)}에서 열기` : '지도를 먼저 선택'}</button>
          </div>
        )) : <div className="empty-state"><h2>아직 담긴 장소가 없어요</h2></div>}
      </section>
    </>
  )
}
