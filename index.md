---
layout: default
title: Home
home_assets: true
---

<!-- 페이지 전용 CSS, JS는 전역 레이아웃에 이미 링크됨 -->

<div class="scroll-track">
  <section class="sticky-stage">
    <div class="stage">
      <!-- 9:16 프레임 -->
      <div class="frame">
        <img class="scene" id="scene1" src="{{'/assets/img/index1.png'}}" alt="Scene 1">
        <img class="scene" id="scene2" src="{{'/assets/img/index2.png'}}" alt="Scene 2">
        <img class="scene" id="scene3" src="{{'/assets/img/index3.png'}}" alt="Scene 3">
      </div>
      <aside class="sidecopy" aria-live="polite">
        <div class="copy" id="text1">
        ● ○ ○ 
        <h3>Fine Art to Human Computer Interaction</h3>
        <p> My creative journey began in fine <a href="{{ '/art/' | relative_url }}">art</a>, focusing on sound installations that encouraged audiences to explore body movement and space perception. However, it became clear that artistic practice does not always translate into tangible contributions to society.
        </p>
        </div>
        <div class="copy" id="text2">
        ○ ● ○
        <h3>The Importance of Purposeful Design</h3>
          <p>
          The motivation to contribute society led to a pursuit of industrial design, as a way to channel artistic capabilities toward practical solutions to society. <a href="{{ '/design/oxynizer/' | relative_url }}">The Oxynizer project</a> was a turning point, demonstrating how design can address urgent life needs and remain accessible to diverse communities.</p>
        </div>
        <div class="copy" id="text3">
          ○ ○ ●
          <h3>Design for Social Impact</h3>
          <p>Today, my practice is to create interactive systems that are both innovative and purposeful by integrating craftsmanship and human-centered design methods. The aim is to bridge artistic exploration with practical impact, advancing designs grounded in sustainability and inclusivity.</p>
        </div>
      </aside>
    </div>
  </section>
</div>

<!--
  // iOS 주소창 수축/확장 대응(필요시 사용)
  // 주석 해제하면 실제 뷰포트 px로 강제 고정됩니다.
 
  <script>
  const setVH = () => {
    const h = window.innerHeight;
    document.querySelectorAll('#home-snap, .panel').forEach(el => el.style.height = h + 'px');
  };
  window.addEventListener('resize', setVH, { passive: true });
  setVH();
  </scrip. Each project is guided by the belief that good dest>
  -->
