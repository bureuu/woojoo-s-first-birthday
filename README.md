# 우주의 첫 번째 생일 — Sprint 12 Premium Polish

## 반영 내용
- 실제 성장영상 적용 및 웹 최적화(3개 구간 자동 연속 재생)
- 영상 포스터 이미지 생성
- 카카오톡/메신저 공유용 OG 썸네일 및 메타태그 추가
- 오시는 길 카드 디자인, 주소 복사, 캘린더 저장, 카카오맵 연결
- 애니메이션과 모바일 접근성 마감
- 영상 재생 시 BGM 자동 일시정지 구조 적용

## BGM
저작권 안전한 최종 음원을 아직 포함하지 않았습니다. `assets/music/background.mp3`를 추가한 뒤 `index.html`의 `<audio id="bgm">` 안에 source를 연결하면 됩니다. 추천 분위기: 따뜻한 피아노 + 글로켄슈필, 70~85 BPM, 보컬 없음.

## Open Graph URL
GitHub Pages 배포 주소가 확정되면 `index.html`의 `og:url`, `og:image`를 절대 URL로 바꾸면 카카오톡 호환성이 가장 안정적입니다.


## Sprint 12.1
- 성장영상 실제 장면 사진으로 무비 포스터 교체
- 16:9 웹 전용 포스터 최적화 및 모바일 크롭 보정
- 포스터 오버레이, 재생 버튼, 포커스/호버 효과 마감
- 영상 모달 poster 경로 동기화


## Sprint 12.2
- Movie title shortened to `우주의 성장이야기` and resized to avoid the center play button.
- Replaced the three sequential movie parts with one H.264/AAC MP4 (`assets/video/woojoo-full.mp4`).
- Kept the original 720×1280 9:16 frame so the full video is visible without cropping or side letterboxing.
- Added web-friendly `faststart` metadata and simplified movie playback logic.
