const $ = (s, root=document) => root.querySelector(s);
const $$ = (s, root=document) => [...root.querySelectorAll(s)];

const opening = $('#opening');
const counter = $('#dayCounter');
let count = 1;
const counterTimer = setInterval(() => {
  count = Math.min(365, count + Math.ceil((365 - count) / 8));
  counter.textContent = count;
  if (count >= 365) clearInterval(counterTimer);
}, 55);
setTimeout(() => opening?.classList.add('hide'), 2800);

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('visible'); });
}, {threshold: .12, rootMargin: '0px 0px -35px'});
$$('.reveal').forEach(el => observer.observe(el));

const toast = $('#toast');
function showToast(message){
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove('show'), 1800);
}

const musicBtn = $('#musicBtn');
const bgm = $('#bgm');
const hasBgm = Boolean(bgm.querySelector('source')?.getAttribute('src'));
if (!hasBgm) musicBtn.title = '최종 BGM 음원 선정 후 연결됩니다.';
musicBtn.addEventListener('click', async () => {
  if (!hasBgm) return showToast('최종 BGM을 선정 중입니다.');
  try {
    if (bgm.paused) { await bgm.play(); musicBtn.classList.add('playing'); musicBtn.setAttribute('aria-pressed','true'); }
    else { bgm.pause(); musicBtn.classList.remove('playing'); musicBtn.setAttribute('aria-pressed','false'); }
  } catch { showToast('배경음악 파일이 아직 연결되지 않았습니다.'); }
});
bgm.addEventListener('error', () => showToast('배경음악 파일이 아직 연결되지 않았습니다.'));

const lightbox = $('#lightbox');
$$('#gallery button').forEach(button => button.addEventListener('click', () => {
  $('img', lightbox).src = button.dataset.src;
  $('p', lightbox).textContent = button.dataset.caption || '';
  lightbox.showModal();
}));
$('.close', lightbox).addEventListener('click', () => lightbox.close());
lightbox.addEventListener('click', e => { if (e.target === lightbox) lightbox.close(); });

const movieModal = $('#movieModal');
const movie = $('#growthMovie', movieModal);
let bgmWasPlaying = false;

$('#movieBtn').addEventListener('click', () => {
  movie.currentTime = 0;
  movieModal.showModal();
});

movie.addEventListener('play', () => {
  bgmWasPlaying = !bgm.paused;
  if (bgmWasPlaying) bgm.pause();
});

movie.addEventListener('ended', () => {
  if (bgmWasPlaying && hasBgm) bgm.play().catch(() => {});
});

function closeMovie(){
  movie.pause();
  movie.currentTime = 0;
  movieModal.close();
  if (bgmWasPlaying && hasBgm) bgm.play().catch(() => {});
}

$('.close', movieModal).addEventListener('click', closeMovie);
movieModal.addEventListener('click', e => { if (e.target === movieModal) closeMovie(); });

const letterBtn = $('#letterBtn');
const letter = $('#letter');
letterBtn.addEventListener('click', () => {
  const open = letter.hidden;
  letter.hidden = !open;
  letterBtn.classList.toggle('open', open);
  letterBtn.setAttribute('aria-expanded', String(open));
  $('b', letterBtn).textContent = open ? '편지 닫기' : '편지 열기';
  if (open) setTimeout(() => letter.scrollIntoView({behavior:'smooth', block:'center'}), 200);
});

$('#calendarBtn').addEventListener('click', () => {
  const ics = `BEGIN:VCALENDAR\r\nVERSION:2.0\r\nPRODID:-//WOOJOO//FIRST BIRTHDAY//KO\r\nBEGIN:VEVENT\r\nUID:woojoo-first-birthday-20260822\r\nDTSTAMP:20260729T120000Z\r\nDTSTART:20260822T080000Z\r\nDTEND:20260822T100000Z\r\nSUMMARY:우주의 첫번째 생일\r\nLOCATION:더파티 프리미엄 해운대점 스카이룸\r\nDESCRIPTION:우주의 첫번째 생일에 초대합니다.\r\nEND:VEVENT\r\nEND:VCALENDAR`;
  const url = URL.createObjectURL(new Blob([ics], {type:'text/calendar;charset=utf-8'}));
  const a = document.createElement('a'); a.href = url; a.download = '우주의_첫번째_생일.ics'; a.click(); URL.revokeObjectURL(url);
  showToast('캘린더 파일을 저장했습니다.');
});


$('#copyAddressBtn')?.addEventListener('click', async () => {
  const address = '부산 해운대구 해운대해변로 298번길 24 팔레드시즈 지하 1층';
  try { await navigator.clipboard.writeText(address); showToast('주소를 복사했습니다.'); }
  catch { showToast(address); }
});

$('#shareBtn').addEventListener('click', async () => {
  const data = {title:'우주의 첫번째 생일', text:'2026년 8월 22일, 우주의 첫번째 생일에 초대합니다.', url:location.protocol.startsWith('http') ? location.href : undefined};
  try {
    if (navigator.share) await navigator.share(data);
    else { await navigator.clipboard.writeText(location.href); showToast('초대장 주소를 복사했습니다.'); }
  } catch (error) { if (error.name !== 'AbortError') showToast('공유 기능을 사용할 수 없습니다.'); }
});

window.addEventListener('keydown', e => {
  if (e.key === 'Escape') { if (lightbox.open) lightbox.close(); if (movieModal.open) closeMovie(); }
});
