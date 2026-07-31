# Sprint 12.5 — Content Polish

- `우주에게` 편지 섹션 전체 삭제
- 나머지 섹션 구성/순서 유지
- Easy Edit (`content.js`) 유지
- `첫번째` → `첫 번째` 표기 통일
- `content.js`의 `\n` 줄바꿈이 실제 화면에 정확히 반영되도록 수정
- 한글 단어가 모바일에서 어색하게 중간 분리되지 않도록 `word-break: keep-all` 적용
- 제목/본문/장소 안내/영상 제목의 글꼴 및 줄간격 체계 점검

기존과 동일하게 문구와 사진은 `content.js`에서 수정하세요.

# 우주의 첫 번째 생일 — Sprint 12.4 Easy Edit

Sprint 12.3의 디자인, BGM, Welcome 화면, 단일 성장영상을 그대로 유지하면서
**문구와 주요 사진을 `content.js` 한 파일에서 수정할 수 있도록 구조를 개선한 버전**입니다.

## 가장 쉬운 수정 방법

1. VS Code에서 `content.js`를 엽니다.
2. 따옴표 안의 문구 또는 이미지 경로만 수정합니다.
3. 저장합니다.
4. GitHub Desktop에서 Commit → Push 합니다.

예시:

```js
invitation: {
  title: "한 살이 된 우주",
  body: "여기에 원하는 초대 문구를 입력하세요."
}
```

줄바꿈이 필요하면 `\n`을 사용합니다.

```js
body: "첫 번째 줄\n두 번째 줄"
```

## 사진 교체

새 사진을 `assets/images/` 폴더에 넣은 뒤 `content.js`의 파일명만 바꿉니다.

```js
gallery: {
  items: [
    { image:"assets/images/new-photo.webp", caption:"새로운 문구" }
  ]
}
```

## 수정 가능한 주요 항목

- Welcome 화면 문구
- Hero 제목/날짜/대표사진
- 초대 문구 및 부모 이름
- 사계절 성장 스토리 문구/사진
- 갤러리 사진/캡션
- 성장영상 제목/포스터/영상 파일
- 일시/장소/주소/지도 링크
- `우주에게` 편지 전체
- Footer 문구/사진

## 주의

`content.js`의 `{ }`, `,`, 따옴표 구조는 삭제하지 않는 것이 좋습니다.
문구만 바꾸는 경우 따옴표 안쪽만 수정하세요.

### 카카오톡/메신저 미리보기

Open Graph(OG) 메타태그는 메신저가 JavaScript를 실행하지 않고 읽기 때문에
공유 제목/설명/썸네일 변경은 아직 `index.html`의 `<head>` 영역을 직접 수정해야 합니다.
일반 초대장 화면의 문구/사진은 `content.js`에서 수정하면 됩니다.

## Sprint 12.4

- 방명록/Supabase 기능 없음
- Sprint 12.3 기능 유지
- Easy Edit `content.js` 추가
