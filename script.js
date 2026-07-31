const $ = (s, root=document) => root.querySelector(s);
const $$ = (s, root=document) => [...root.querySelectorAll(s)];

// ------------------------------------------------------------
// Sprint 12.4 Easy Edit
// content.js의 내용을 화면에 적용합니다.
// ------------------------------------------------------------
const CONTENT = window.WOOJOO_CONTENT || {};
const withBreaks = (el, value='') => {
  if (!el) return;
  el.innerHTML = String(value).split('\\n').map(v => v.replaceAll('<','&lt;').replaceAll('>','&gt;')).join('<br>');
};

function applyContent(){
  const c = CONTENT;

  if (c.opening) {
    const box = $('.opening-content');
    if (box) {
      if (box.querySelector('p')) box.querySelector('p').textContent = c.opening.birthDate;
      if (box.querySelector('h1')) box.querySelector('h1').textContent = c.opening.title;
      if ($('#enterBtn')) $('#enterBtn').textContent = c.opening.enterButton;
      if (box.querySelector('.enter-note')) box.querySelector('.enter-note').textContent = c.opening.note;
    }
  }

  if (c.hero) {
    const hero = $('.hero');
    if (hero) {
      const img = $('.hero-image', hero); if (img) img.src = c.hero.image;
      const copy = $('.hero-copy', hero);
      if (copy) {
        if (copy.querySelector('p')) copy.querySelector('p').textContent = c.hero.eyebrow;
        const h1 = copy.querySelector('h1');
        if (h1) h1.innerHTML = `${c.hero.titleLine1}<br><span>${c.hero.titleLine2}</span>`;
        if (copy.querySelector('strong')) copy.querySelector('strong').textContent = c.hero.date;
        if (copy.querySelector('small')) copy.querySelector('small').textContent = c.hero.subtitle;
      }
    }
  }

  if (c.invitation) {
    const invite = $('#invite');
    if (invite) {
      if (invite.querySelector('h2')) invite.querySelector('h2').textContent = c.invitation.title;
      withBreaks(invite.querySelector('.body-copy'), c.invitation.body);
      const parents = invite.querySelector('.parents');
      if (parents) parents.innerHTML = `아빠 ${c.invitation.father} <i>·</i> 엄마 ${c.invitation.mother}`;
    }
  }

  if (c.storyIntro) {
    const intro = $('.story-intro');
    if (intro) {
      if (intro.querySelector('h2')) intro.querySelector('h2').textContent = c.storyIntro.title;
      withBreaks(intro.querySelector(':scope > p:last-child'), c.storyIntro.body);
    }
  }

  if (Array.isArray(c.story)) {
    $$('.story .chapter').forEach((chapter, i) => {
      const item = c.story[i]; if (!item) return;
      const small = $('.chapter-copy small', chapter); if (small) small.textContent = item.season;
      withBreaks($('.chapter-copy h3', chapter), item.title);
      const body = $('.chapter-copy p', chapter); if (body) body.textContent = item.body;
      const img = $('figure img', chapter); if (img) img.src = item.image;
      const cap = $('figcaption', chapter); if (cap) cap.textContent = item.caption;
    });
  }

  if (c.gallery) {
    const wrap = $('.gallery-wrap');
    if (wrap) {
      const head = $('.section-head', wrap);
      if (head?.querySelector('h2')) head.querySelector('h2').textContent = c.gallery.title;
      if (head?.querySelector('p:last-child')) head.querySelector('p:last-child').textContent = c.gallery.subtitle;
      withBreaks(wrap.querySelector('blockquote'), c.gallery.quote);
      $$('#gallery button').forEach((btn, i) => {
        const item = c.gallery.items?.[i]; if (!item) return;
        btn.dataset.src = item.image; btn.dataset.caption = item.caption;
        const img = $('img', btn); if (img) img.src = item.image;
      });
    }
  }

  if (c.movie) {
    const btn = $('#movieBtn');
    if (btn) {
      const poster = $('.movie-cover img', btn); if (poster) poster.src = c.movie.poster;
      const title = $('.movie-cover strong', btn); if (title) title.innerHTML = `${c.movie.titleLine1}<br>${c.movie.titleLine2}`;
      const period = $('.movie-cover small', btn); if (period) period.textContent = c.movie.period;
      withBreaks($('.movie-copy b', btn), c.movie.description);
      const em = $('.movie-copy em', btn); if (em) em.innerHTML = `${c.movie.buttonText} <i>→</i>`;
    }
    const video = $('#growthMovie');
    if (video) {
      video.poster = c.movie.poster;
      const src = $('source', video); if (src) src.src = c.movie.video;
      video.load();
    }
  }

  if (c.event) {
    const event = $('.event');
    if (event) {
      withBreaks(event.querySelector('h2'), c.event.title);
      const dd = $('.date-display', event);
      if (dd) {
        if (dd.querySelector('strong')) dd.querySelector('strong').textContent = c.event.dateNumber;
        withBreaks(dd.querySelector('span'), c.event.monthYear);
        if (dd.querySelector('i')) dd.querySelector('i').textContent = c.event.weekday;
      }
      const rows = $$('dl > div', event);
      if (rows[0]?.querySelector('dd')) rows[0].querySelector('dd').innerHTML = `${c.event.dateText}<br><b>${c.event.time}</b>`;
      if (rows[1]?.querySelector('dd')) rows[1].querySelector('dd').innerHTML = `${c.event.venue}<br><b>${c.event.room}</b>`;
      const card = $('.event-card', event);
      const addr = card?.querySelector(':scope > p'); if (addr) addr.innerHTML = `${c.event.addressLine1}<br>${c.event.addressLine2}`;
      const guide = $$('.venue-guide > div', event);
      if (guide[0]) { if (guide[0].querySelector('b')) guide[0].querySelector('b').textContent = c.event.subway; if (guide[0].querySelector('small')) guide[0].querySelector('small').textContent = c.event.subwayNote; }
      if (guide[1]) { if (guide[1].querySelector('b')) guide[1].querySelector('b').textContent = c.event.venue; if (guide[1].querySelector('small')) guide[1].querySelector('small').textContent = c.event.venueNote; }
      const map = $('.actions a', event); if (map) map.href = c.event.mapUrl;
    }
  }

  if (c.letter) {
    const article = $('#letter');
    if (article) {
      article.innerHTML = '';
      (c.letter.lines || []).forEach(line => { const p = document.createElement('p'); withBreaks(p, line); article.appendChild(p); });
      const sig = document.createElement('b'); sig.textContent = c.letter.signature; article.appendChild(sig);
    }
  }

  if (c.footer) {
    const footer = $('footer');
    if (footer) {
      const img = $('.footer-photo img', footer); if (img) img.src = c.footer.image;
      withBreaks($('.footer-copy p', footer), c.footer.message);
      const b = $('.footer-copy b', footer); if (b) b.innerHTML = `${c.footer.names}<br><em>${c.footer.child}</em>`;
      const small = $('.footer-copy small', footer); if (small) small.textContent = c.footer.date;
    }
  }
}

applyContent();

const opening = $('#opening');
const enterBtn = $('#enterBtn');
const counter = $('#dayCounter');
let count = 1;
const counterTimer = setInterval(() => {
  count = Math.min(365, count + Math.ceil((365 - count) / 8));
  counter.textContent = count;
  if (count >= 365) clearInterval(counterTimer);
}, 55);

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
const BGM_VOLUME = 0.28;
bgm.volume = 0;

function syncMusicButton(){
  const playing = !bgm.paused;
  musicBtn.classList.toggle('playing', playing);
  musicBtn.setAttribute('aria-pressed', String(playing));
  musicBtn.setAttribute('aria-label', playing ? '배경음악 끄기' : '배경음악 켜기');
}
function fadeBgm(target, duration=700, pauseAtEnd=false){
  const startVolume = bgm.volume;
  const started = performance.now();
  cancelAnimationFrame(fadeBgm.raf);
  const tick = now => {
    const t = Math.min(1, (now-started)/duration);
    bgm.volume = startVolume + (target-startVolume)*t;
    if(t < 1) fadeBgm.raf = requestAnimationFrame(tick);
    else if(pauseAtEnd){ bgm.pause(); syncMusicButton(); }
  };
  fadeBgm.raf = requestAnimationFrame(tick);
}
async function startBgm(){
  if(!hasBgm) return;
  try{
    bgm.volume = 0;
    await bgm.play();
    syncMusicButton();
    fadeBgm(BGM_VOLUME, 1100);
  }catch{ showToast('음악 재생 버튼을 눌러주세요.'); }
}

enterBtn?.addEventListener('click', async () => {
  opening?.classList.add('hide');
  opening?.setAttribute('aria-hidden','true');
  await startBgm();
});

musicBtn.addEventListener('click', async () => {
  if (!hasBgm) return showToast('배경음악 파일을 찾을 수 없습니다.');
  try {
    if (bgm.paused) await startBgm();
    else fadeBgm(0, 450, true);
  } catch { showToast('음악 재생 버튼을 다시 눌러주세요.'); }
});
bgm.addEventListener('play', syncMusicButton);
bgm.addEventListener('pause', syncMusicButton);
bgm.addEventListener('error', () => showToast('배경음악을 불러오지 못했습니다.'));

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
  if (bgmWasPlaying) fadeBgm(0, 400, true);
});

movie.addEventListener('ended', () => {
  if (bgmWasPlaying && hasBgm) startBgm();
});

function closeMovie(){
  movie.pause();
  movie.currentTime = 0;
  movieModal.close();
  if (bgmWasPlaying && hasBgm) startBgm();
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
  const address = CONTENT.event?.copyAddress || '부산 해운대구 해운대해변로 298번길 24 팔레드시즈 지하 1층';
  try { await navigator.clipboard.writeText(address); showToast('주소를 복사했습니다.'); }
  catch { showToast(address); }
});

$('#shareBtn').addEventListener('click', async () => {
  const data = {title:`${CONTENT.hero?.titleLine1 || '우주의'} ${CONTENT.hero?.titleLine2 || '첫번째 생일'}`, text:`${CONTENT.event?.dateText || '2026년 8월 22일'}, ${CONTENT.hero?.subtitle || '돌잔치에 초대합니다'}`, url:location.protocol.startsWith('http') ? location.href : undefined};
  try {
    if (navigator.share) await navigator.share(data);
    else { await navigator.clipboard.writeText(location.href); showToast('초대장 주소를 복사했습니다.'); }
  } catch (error) { if (error.name !== 'AbortError') showToast('공유 기능을 사용할 수 없습니다.'); }
});

window.addEventListener('keydown', e => {
  if (e.key === 'Escape') { if (lightbox.open) lightbox.close(); if (movieModal.open) closeMovie(); }
});
