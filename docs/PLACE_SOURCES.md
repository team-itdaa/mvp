# 장소 정보와 사진 출처

확인일: 2026-11-12. API 없이 제공하는 로컬 장소 데이터입니다. 사진은 해당 장소를 소개하는 공식 운영사·관광기관 페이지에서 가져왔으며 아래 원본과 연결됩니다. 사진의 저작권은 원 권리자에게 있습니다. 공개 배포 전 별도 이용 허락 및 각 기관의 이용조건 확인이 필요합니다.

평점과 현재 위치 기준 도보 시간은 수집하지 않아 제공하지 않습니다. 운영시간은 확인한 페이지 기준이며 실시간 영업 상태를 의미하지 않습니다. 콘센트·층별 좌석 등의 시설은 검증하지 않아 장소 정보에 단정하지 않습니다. `initialMemos`는 방문 계획을 표현하는 편집 가능한 개인 메모 예시이며 실제 방문 후기나 시설 검증 자료가 아닙니다.

- **앤트러사이트 연희점** (onuel): 서울 서대문구 연희로 135
  - [장소 정보](https://www.anthracitecoffee.com/visit)
  - [사진 원본](https://cdn.imweb.me/thumbnail/20181217/5c170e1723d9d.jpg) → `public/images/places/anthracite-yeonhui.jpg`
- **앤트러사이트 서교점** (forest): 서울 마포구 월드컵로12길 11
  - [장소 정보](https://www.anthracitecoffee.com/visit)
  - [사진 원본](https://cdn.imweb.me/thumbnail/20171109/5a037bfdd5372.jpg) → `public/images/places/anthracite-seogyo.jpg`
- **소금집 델리 안국점** (table): 서울 종로구 북촌로4길 19 1층
  - [장소 정보](https://salthousekorea.com/contact/store-01.html)
  - [사진 원본](https://salthousekorea.com/Unfold/images/contact-bg-01.jpg) → `public/images/places/salthouse-anguk.jpg`
- **서울숲** (seoul-forest): 서울 성동구 뚝섬로 273
  - [장소 정보](https://english.visitkorea.or.kr/svc/contents/contentsView.do?vcontsId=95429)
  - [사진 원본](https://tong.visitkorea.or.kr/cms/resource_photo/04/3511804_image2_1.jpg) → `public/images/places/seoul-forest.jpg`
- **대림창고** (paper): 서울 성동구 성수이로 78
  - [장소 정보](https://korean.visitseoul.net/restaurants/daelimchanggo/KOPf8jiyc)
  - [사진 원본](https://korean.visitseoul.net/comm/getImage?srvcId=MEDIA&parentSn=73007&fileTy=MEDIA&fileNo=1&thumbTy=L) → `public/images/places/daelim-changgo.jpg`
- **소금집 델리 망원점** (sunset): 서울 마포구 월드컵로19길 14 2층
  - [장소 정보](https://salthousekorea.com/contact/store-02.html)
  - [사진 원본](https://salthousekorea.com/Unfold/images/contact-bg-02.jpg) → `public/images/places/salthouse-mangwon.jpg`

- **어니언 성수** (onion-seongsu): 서울 성동구 아차산로9길 8
  - [한국관광공사 장소 정보](https://korean.visitkorea.or.kr/detail/ms_detail.do?cotid=4894c511-2c88-4c1a-8e5a-ca58288c07f1)
  - [성동구 성수카페 안내](https://www.sd.go.kr/tour/contents.do?key=4208)의 어니언 사진 → [원본](https://map.sd.go.kr/trip_new/picture/Y020100014.jpg), `public/images/places/onion-seongsu.png`
- **블루보틀 성수 카페** (blue-bottle-seongsu): 서울 성동구 아차산로 7
  - [한국관광공사 장소 정보](https://korean.visitkorea.or.kr/detail/ms_detail.do?cotid=150b5df5-3b82-4830-b755-c648dc714e9e)
  - [성동구 성수카페 안내](https://www.sd.go.kr/tour/contents.do?key=4208)의 블루보틀 사진 → [원본](https://kr.bluebottlecoffee.com/cdn/shop/articles/BBCK_SS_main_1600x1600_1e4b79e5-dfab-43d0-a335-49ac4f234cfe.jpg?width=1200), `public/images/places/blue-bottle-seongsu.png`

### 노트북 검색과 커뮤니티 시연

노트북·카공·콘센트·좌석 키워드는 성수의 실제 장소 3곳(대림창고, 어니언 성수, 블루보틀 성수)의 후보 목록에 연결합니다. 시설 조건을 충족한다는 검증이 아니며 결과에 미확인 안내를 표시합니다. 콘센트, 좌석 크기, 노트북 허용 여부는 자료에서 확인되지 않았습니다.

`getPlaceCommunity`의 작성자·의견·별점·공감 수·의견 수는 모두 명시적으로 표시하는 시연용 예시입니다. 실제 방문자 리뷰나 실제 좋아요 순위를 수집하지 않았습니다. 공감 최다 의견은 예시 목록 내 공감 수로 정합니다. 실제 평점은 기존 `Place.rating`의 미제공 상태를 유지합니다.

사진 보완: 어니언 성수는 성동구 공식 여행지도 상세의 1930×1086 원본, 블루보틀 성수는 [운영사 매장 안내](https://kr.bluebottlecoffee.com/blogs/locator/bluebottle-seongsu-cafe)의 1200×1200 원본을 사용합니다. 두 사진 모두 해당 장소임을 안내 페이지 및 이미지 육안 확인으로 대조했습니다.

### 실제 공개 방문기 요약

검색 카드와 통합페이지는 아래 작성자의 직접 방문기를 짧게 요약하고 작성일·원문 링크를 표시합니다. 오래된 글을 현재 시설 보장으로 사용하지 않습니다. 원문에서 별점·좋아요 수가 확인되지 않아 실제 인기 순위를 만들지 않습니다. 서비스 내 시연 의견·공감 수와 분리합니다.

- 대림창고: [elsadad, 2025-03-03](https://elsadad.tistory.com/87). 높은 천장, 넓은 공간과 갤러리 분위기에 대한 경험 요약.
- 어니언 성수: [KEI_ro, 2020-08-01](https://sosej.tistory.com/entry/성수-어니언-방문기). 공간 크기, 저녁 좌석 부족, 바 좌석의 편의에 대한 경험 요약.
- 블루보틀 성수: [colorevent, 2020-07-17](https://colorevent0317.tistory.com/89). 천장 높이와 집기 간격으로 느낀 개방감에 대한 경험 요약.

### 현재 커뮤니티 UI 기준

위 외부 방문기는 과거 조사 기록이며 현재 화면에서는 사용하지 않습니다. 현재 게시글·작성자·별점·공감 수는 서비스 목업을 위해 직접 만든 원본 가상 콘텐츠입니다. 외부 블로그를 서비스 작성자의 글로 바꾼 것이 아닙니다. 사진과 장소 정보의 출처는 위 자료를 유지합니다. 사용자 지시에 따라 개발용 안내는 서비스 화면 대신 이 문서에서 관리합니다.

## 후기 본문 보강

현재 24개 게시글은 공개 방문기의 장소 관찰을 참고하여 새로 작성한 가상 커뮤니티 글입니다. 앞의 독립 창작 설명은 초기 버전 기록이며 이 기준으로 갱신합니다. 상세 출처와 창작 범위는 [성수 후기](REVIEW_NOTES_SEONGSU.md), [다른 동네 후기](REVIEW_NOTES_NEIGHBORHOODS.md)에 정리했습니다. 작성자·별점·공감 수는 계속 가상 데이터입니다.
