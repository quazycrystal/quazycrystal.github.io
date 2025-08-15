---
layout: default
title: Home
---

<style>
  /* 0) 전체 마진/오버플로우 정리 */
  html, body { height: 100%; margin: 0; }
  body { overflow-x: hidden; }

  /* 1) 이 페이지(홈)에서만 헤더/푸터를 완전 투명 + 오버레이로 고정 */
  /* (인라인 CSS라 다른 페이지에는 영향 없음) */
  .masthead,
  .masthead .wrap,
  .masthead .greedy-nav {
    position: fixed;
    top: 0; left: 0; right: 0;
    background: transparent !important;
    box-shadow: none !important;
    border: 0 !important;
    z-index: 200;
    padding: 1rem 1rem;
  }
  .page__footer {
    background-color: transparent !important; /* 배경 투명 */
    box-shadow: none !important;              /* 그림자 제거 */
    position: fixed;  /* 또는 fixed로 고정 가능 */
    bottom: 0;
    left: 0;
    width: 100%;
    z-index: 200;
    padding: 1rem 1rem;
  }

  /* 헤더/푸터 텍스트 대비 */

  .masthead, .masthead a,
  .page-footer, .page-footer a, .page__footer-copyright {
    color: #fff !important;
    text-shadow: 0 1px 10px rgba(0,0,0,.4);
  }

  /* 2) 레이아웃: 본문 풀블리드 */
  .page, .page__inner-wrap, .page__content, .initial-content {
    margin: 0 !important; padding: 0 !important; max-width: none !important; box-shadow: none !important;
  }
  .archive { margin: 0 !important; padding: 0 !important; }
  #page-title, .breadcrumbs, .sidebar { display: none !important; }

  /* 3) 인터랙티브 sticky 씬 (← 여기 앞의 ‘.’ 오타 삭제!!) */
  .scroll-track { height: 300vh; position: relative; }
  .sticky-stage { position: sticky; top: 0; height: 100vh; overflow: hidden; background: linear-gradient(#bde6ff,#e8f6ff); }
  .stage { position: relative; width: 100vw; height: 100vh; }
  .layer { position: absolute; inset: 0; display: grid; place-items: center; will-change: transform, opacity; pointer-events: none; }
  svg { width: min(100vw, 1400px); height: auto; }

  @media (prefers-reduced-motion: reduce) {
    .layer { transition: none !important; }
  }

  /* 스크롤바 시각 숨김(옵션) */
  .scroll-track { -ms-overflow-style: none; scrollbar-width: none; }
  .scroll-track::-webkit-scrollbar { display: none; }
</style>

<div class="scroll-track">
  <section class="sticky-stage">
    <div class="stage">
      <!-- Ground: 항상 보임 -->
      <div class="layer" id="groundLayer">
        <svg viewBox="0 0 1200 700" aria-label="땅">
          <defs>
            <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="#bde6ff"/><stop offset="100%" stop-color="#e8f6ff"/>
            </linearGradient>
          </defs>
          <rect x="0" y="0" width="1200" height="700" fill="url(#sky)"/>
          <rect x="0" y="420" width="1200" height="280" fill="#7a5b3a"/>
          <ellipse cx="300" cy="420" rx="380" ry="120" fill="#866246" opacity=".9"/>
          <ellipse cx="900" cy="430" rx="420" ry="140" fill="#6e5134" opacity=".95"/>
        </svg>
      </div>

      <!-- Person + Seeds -->
      <div class="layer" id="personLayer" style="opacity:0; transform:translateY(24px) scale(.985)">
        <svg viewBox="0 0 1200 700" aria-label="씨 뿌리는 사람">
          <rect x="0" y="0" width="1200" height="700" fill="transparent"/>
          <g transform="translate(760,240) rotate(8)">
            <rect x="-120" y="-30" width="240" height="60" rx="30" fill="#f1c6a6" />
            <circle cx="140" cy="-5" r="26" fill="#f1c6a6"/>
          </g>
          <g id="seeds">
            <circle cx="700" cy="330" r="6" fill="#3b2a1a"/>
            <circle cx="730" cy="360" r="5" fill="#3b2a1a"/>
            <circle cx="760" cy="340" r="4.8" fill="#3b2a1a"/>
            <circle cx="720" cy="380" r="5.2" fill="#3b2a1a"/>
            <circle cx="745" cy="355" r="4.5" fill="#3b2a1a"/>
          </g>
        </svg>
      </div>

      <!-- Tree -->
      <div class="layer" id="treeLayer" style="opacity:0; transform:translateY(36px) scale(.97)">
        <svg viewBox="0 0 1200 700" aria-label="나무">
          <rect x="0" y="0" width="1200" height="700" fill="transparent"/>
          <rect x="590" y="330" width="20" height="180" fill="#64462a" rx="8"/>
          <g id="crown">
            <circle cx="600" cy="320" r="90" fill="#5fb36a"/>
            <circle cx="540" cy="360" r="75" fill="#63be70"/>
            <circle cx="660" cy="360" r="75" fill="#63be70"/>
            <circle cx="600" cy="270" r="65" fill="#56a862"/>
          </g>
        </svg>
      </div>
    </div>
  </section>
</div>

<script>
(function(){
  const track  = document.querySelector('.scroll-track');
  const ground = document.getElementById('groundLayer');
  const person = document.getElementById('personLayer');
  const tree   = document.getElementById('treeLayer');

  const clamp = (v,min,max)=>Math.min(max, Math.max(min, v));
  const invLerp = (a,b,v)=> clamp((v-a)/(b-a), 0, 1);
  const easeInOutCubic = t => t<.5 ? 4*t*t*t : 1 - Math.pow(-2*t+2, 3)/2;
  const ease01 = t => easeInOutCubic(clamp(t,0,1));

  function update(){
    const total = track.offsetHeight - window.innerHeight;
    const p = total>0 ? clamp((window.scrollY - track.offsetTop) / total, 0, 1) : 0;

    /* Ground: 살짝 패럴랙스 */
    ground.style.transform = `translateY(${ -10*p }px) scale(${ 1 - 0.02*p })`;
    ground.style.opacity = '1';

    /* Person IN(0.12~0.32), OUT(0.55~0.75) */
    const aInPerson   = ease01(invLerp(0.12, 0.32, p));
    const aOutPerson  = ease01(invLerp(0.55, 0.75, p));
    const alphaPerson = clamp(aInPerson * (1 - aOutPerson), 0, 1);
    person.style.opacity   = String(alphaPerson);
    person.style.transform = `translateY(${ 24 - 24*alphaPerson }px) scale(${ 0.985 + 0.015*alphaPerson })`;

    /* Tree IN(0.45~0.80) */
    const alphaTree = ease01(invLerp(0.45, 0.80, p));
    tree.style.opacity   = String(alphaTree);
    tree.style.transform = `translateY(${ 36 - 36*alphaTree }px) scale(${ 0.97 + 0.03*alphaTree })`;
  }

  const onScroll=()=>requestAnimationFrame(update);
  window.addEventListener('scroll', onScroll, { passive:true });
  window.addEventListener('resize', onScroll, { passive:true });
  update();
})();
</script>

<!-- 본문 내용은 비워 둡니다. 위 프런트매터의 SVG가 레이아웃에 주입됩니다. -->



<!-- iOS 주소창 수축으로 100vh가 오락가락하면 아래 주석 해제(선택) 
<script>
  const setVH = () => {
    const h = window.innerHeight;
    document.querySelectorAll('#home-snap, .panel').forEach(el => el.style.height = h + 'px');
  };
  window.addEventListener('resize', setVH, { passive: true });
  setVH();
</script>
-->


<main id="home-snap" aria-label="3컷 스크롤 메인">
  <!-- 이미지 경로: 사이트 기준 + relative_url -->
  <section class="panel" style="background-image:url('/assets/img/2020-rootless/a.jpeg')"></section>
  <section class="panel" style="background-image:url('/assets/img/2020-rootless/b.jpeg')"></section>
  <section class="panel" style="background-image:url('/assets/img/2020-rootless/c.jpeg')"></section>

<script>
  // iOS 주소창 수축/확장 대응(필요시 사용)
  // 주석 해제하면 실제 뷰포트 px로 강제 고정됩니다.
  /*
  const setVH = () => {
    const h = window.innerHeight;
    document.querySelectorAll('#home-snap, .panel').forEach(el => el.style.height = h + 'px');
  };
  window.addEventListener('resize', setVH, { passive: true });
  setVH();
  */
</script>


<!-- ---
layout: posts
# profile_picture:
#   src: /assets/img/profile-pic.png
#   alt: website picture
---

<img src="/assets/img/home.png" style="width:auto; height:auto;" alt="home"> 

<p>
 I create various types of work, including installation art, jewelry, and audio systems. My study is focused on how people interact with my creations.
</p>

<p>
 I love developing customizable audio systems. Based on fine art and computer science expertise, my creations integrate unique sound and interactive kinetic sculptures.
</p>

<p>
 Master's studies in industrial design have encouraged me to tackle global challenges with design solutions, including medical and environmental problems. At the same time, I make mysterious objects that are hard to categorize, driven by my passion to create. 
</p>

<p>
My unique designs, born from dedication to craftsmanship, stand as a testament to creativity and innovation.
</p> -->