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

  /* 3) 인터랙티브 sticky 씬 */
  .scroll-track { height: 600vh; position: relative; }
  .sticky-stage { position: sticky; top: 0; height: 100vh; overflow: hidden; background: linear-gradient(#bee6ff,#71c9ff); }
  .stage { position: relative; width: 100vw; height: 100vh; }
  .layer { position: absolute; inset: 0; display: grid; place-items: center; will-change: transform, opacity; pointer-events: none; }

  @media (prefers-reduced-motion: reduce) {
    .layer { transition: none !important; }
  }

  /* 스크롤바 시각 숨김(옵션) */
  .scroll-track { -ms-overflow-style: none; scrollbar-width: none; }
  .scroll-track::-webkit-scrollbar { display: none; }
</style>

<div class="scroll-track">
  <section class="sticky-stage">
    <div class="frame">
      <!-- PNG 3장 -->
      <img class="scene" id="scene1" src="assets\img\index1.png">
      <img class="scene" id="scene2" src="assets\img\index2.png">
      <img class="scene" id="scene3" src="assets\img\index3.png">
    </div>
  </section>
</div>

<style>
/* ===== PC 전용 최소 필수 CSS: 9:16 고정 + 오버플로우 방지 ===== */
html, body { margin:0; padding:0; background:#111; }

/* 스크롤 구간이 뷰포트보다 길어야 전환이 발생합니다 */
.scroll-track { min-height: 250vh; }

/* sticky 스테이지 */
.sticky-stage {
  position: sticky;
  top: 0;
}

.frame {
  position: relative;
  height: 150vh;           /* ← 여기만 줄이면 크기만 변하고 */
  aspect-ratio: 9 / 16;   /* 비율 유지 */
  width: auto;
  margin: 0 auto;         /* 위 여백 없음 = 위로 붙음 */
  overflow: hidden;
  transform: translate(-20vw, -20vh);

}

/* 장면 3장을 프레임 내부에 정확히 겹치기 */
.scene {
  position: absolute;
  inset: 0;             /* top/right/bottom/left: 0 */
  width: 100%;
  height: 100%;
  object-fit: contain;  /* 비율 유지 + 오버플로우 방지(레터박스 허용) */
  opacity: 0;           /* JS가 0→1로 전환 */
  transform: translateY(0) scale(1);
  will-change: opacity, transform;
}

/* 첫 장면은 로드 직후 바로 보이게(초기 깜빡임 방지) */
#scene1 { opacity: 1; }
</style>

<script>
(function(){
  const clamp   = (v,min,max)=>Math.min(max, Math.max(min, v));
  const invLerp = (a,b,v)=> clamp((v-a)/(b-a), 0, 1);
  const easeInOutCubic = t => t<.5 ? 4*t*t*t : 1 - Math.pow(-2*t+2, 3)/2;
  const ease01  = t => easeInOutCubic(clamp(t,0,1));

  const track  = document.querySelector('.scroll-track');
  const s1 = document.getElementById('scene1');
  const s2 = document.getElementById('scene2');
  const s3 = document.getElementById('scene3');

  // 진행도 p: 0 → 1
  function getProgress() {
    const rect = track.getBoundingClientRect();
    const vh = window.innerHeight;
    const total = rect.height - vh;
    if (total <= 0) return 0;
    return clamp((-rect.top) / total, 0, 1); // track 상단이 위로 올라갈수록 증가
  }

  // scene1은 "처음부터 보임" → p=0에서 alpha=1이 되도록 설계
  // scene1: HOLD(0.00~0.28) → OUT(0.28~0.44)
  function alphaScene1(p) {
    const fadeOut = ease01(invLerp(0.2, 0.45, p));
    return clamp(1 - fadeOut, 0, 1);
  }
  // scene2: IN(0.32~0.50) → HOLD(0.50~0.64) → OUT(0.64~0.80)
  function alphaScene2(p) {
    const aIn  = ease01(invLerp(0.3, 0.55, p));
    const aOut = ease01(invLerp(0.6, 0.80, p));
    return clamp(aIn * (1 - aOut), 0, 1);
  }
  // scene3: IN(0.64~0.82) → HOLD(0.82~1.00)
  function alphaScene3(p) {
    return ease01(invLerp(0.6, 0.85, p));
  }

  function update(){
    const p = getProgress();

    // 알파 계산
    const a1 = alphaScene1(p);
    const a2 = alphaScene2(p);
    const a3 = alphaScene3(p);

    // 패럴랙스/스케일(미세)
    const t1 = -10 * p, s1s = 1.00 + 0.02 * a1;
    const t2 = -14 * p, s2s = 0.99 + 0.03 * a2;
    const t3 = -18 * p, s3s = 0.98 + 0.04 * a3;

    // 적용
    s1.style.opacity   = a1.toFixed(3);
    s1.style.transform = `translateY(${t1.toFixed(2)}px) scale(${s1s.toFixed(3)})`;
    s2.style.opacity   = a2.toFixed(3);
    s2.style.transform = `translateY(${t2.toFixed(2)}px) scale(${s2s.toFixed(3)})`;
    s3.style.opacity   = a3.toFixed(3);
    s3.style.transform = `translateY(${t3.toFixed(2)}px) scale(${s3s.toFixed(3)})`;
  }

  const onScroll = () => requestAnimationFrame(update);
  window.addEventListener('scroll', onScroll, { passive:true });
  window.addEventListener('resize', onScroll, { passive:true });

  // 초기 렌더 (초기부터 scene1이 보이도록 설계되어 블랙 화면 없음)
  update();

  // 이미지 프리로드(깜빡임 방지)
  ['scene1.png','scene2.png','scene3.png'].forEach(src=>{
    const i = new Image(); i.src = src;
  });
})();
</script>


<!--  <img class="scene" id="scene1" src="assets\img\index1.png">
      <img class="scene" id="scene2" src="assets\img\index2.png">
      <img class="scene" id="scene3" src="assets\img\index3.png"> -->



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