const $ = (s, root=document) => root.querySelector(s);
const $$ = (s, root=document) => [...root.querySelectorAll(s)];

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


// Sprint 12.4 · Supabase guestbook
(() => {
  const config = window.WOOJOO_GUESTBOOK;
  const form = document.querySelector('#guestbookForm');
  if (!config || !form) return;

  const list = document.querySelector('#guestbookList');
  const moreBtn = document.querySelector('#guestbookMore');
  const submitBtn = document.querySelector('#guestbookSubmit');
  const status = document.querySelector('#guestbookStatus');
  const nickname = document.querySelector('#guestNickname');
  const message = document.querySelector('#guestMessage');
  const messageCount = document.querySelector('#guestMessageCount');
  const honeypot = document.querySelector('#guestWebsite');
  const pageSize = 5;
  let offset = 0;
  let loading = false;

  const headers = {
    apikey: config.publishableKey,
    Authorization: `Bearer ${config.publishableKey}`,
    'Content-Type': 'application/json'
  };

  function setStatus(text, isError = false) {
    status.textContent = text;
    status.style.color = isError ? '#b76868' : '#9a7d72';
  }

  function formatDate(value) {
    try {
      return new Intl.DateTimeFormat('ko-KR', {
        year: 'numeric', month: '2-digit', day: '2-digit'
      }).format(new Date(value));
    } catch { return ''; }
  }

  function makeCard(row) {
    const card = document.createElement('article');
    card.className = 'guestbook-card';
    const name = document.createElement('strong');
    const body = document.createElement('p');
    const time = document.createElement('time');
    name.textContent = row.nickname;
    body.textContent = row.message;
    time.dateTime = row.created_at || '';
    time.textContent = formatDate(row.created_at);
    card.append(name, body, time);
    return card;
  }

  async function loadMessages(reset = false) {
    if (loading) return;
    loading = true;
    moreBtn.disabled = true;
    if (reset) {
      offset = 0;
      list.innerHTML = '<p class="guestbook-empty">메시지를 불러오는 중이에요…</p>';
    }
    try {
      const params = new URLSearchParams({
        select: 'id,nickname,message,created_at',
        order: 'created_at.desc',
        limit: String(pageSize),
        offset: String(offset)
      });
      const response = await fetch(`${config.url}/rest/v1/guestbook?${params}`, { headers });
      if (!response.ok) throw new Error(`load ${response.status}`);
      const rows = await response.json();
      if (reset) list.innerHTML = '';
      rows.forEach(row => list.appendChild(makeCard(row)));
      offset += rows.length;
      moreBtn.hidden = rows.length < pageSize;
      if (offset === 0) {
        list.innerHTML = '<p class="guestbook-empty">아직 첫 마음을 기다리고 있어요.<br>우주에게 첫 번째 메시지를 남겨주세요 ♡</p>';
      }
    } catch (error) {
      console.error('Guestbook load failed:', error);
      if (reset) list.innerHTML = '<p class="guestbook-empty">방명록을 불러오지 못했어요.<br>잠시 후 다시 확인해주세요.</p>';
      moreBtn.hidden = true;
    } finally {
      loading = false;
      moreBtn.disabled = false;
    }
  }

  message.addEventListener('input', () => {
    messageCount.textContent = String(message.value.length);
  });

  moreBtn.addEventListener('click', () => loadMessages(false));

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (honeypot.value) return;

    const cleanNickname = nickname.value.trim();
    const cleanMessage = message.value.trim();
    if (!cleanNickname || cleanNickname.length > 12) {
      setStatus('닉네임을 1~12자로 입력해주세요.', true); nickname.focus(); return;
    }
    if (!cleanMessage || cleanMessage.length > 100) {
      setStatus('우주에게 한마디를 1~100자로 입력해주세요.', true); message.focus(); return;
    }

    const lastSent = Number(localStorage.getItem('woojoo_guestbook_last_sent') || 0);
    const cooldown = 15000;
    if (Date.now() - lastSent < cooldown) {
      setStatus('마음이 잘 도착했어요. 잠시 후 다시 남길 수 있어요 ♡', true); return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = '마음 전하는 중…';
    setStatus('');
    try {
      const response = await fetch(`${config.url}/rest/v1/guestbook`, {
        method: 'POST',
        headers: {...headers, Prefer: 'return=minimal'},
        body: JSON.stringify({ nickname: cleanNickname, message: cleanMessage })
      });
      if (!response.ok) throw new Error(`insert ${response.status}`);
      localStorage.setItem('woojoo_guestbook_last_sent', String(Date.now()));
      message.value = '';
      messageCount.textContent = '0';
      setStatus('우주에게 따뜻한 마음이 도착했어요 ♡');
      await loadMessages(true);
    } catch (error) {
      console.error('Guestbook insert failed:', error);
      setStatus('마음을 전하지 못했어요. 잠시 후 다시 시도해주세요.', true);
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = '마음 남기기 ♡';
    }
  });

  loadMessages(true);
})();
