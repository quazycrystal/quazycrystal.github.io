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
        <p> My creative journey began in field of <a href="{{ '/art/' | relative_url }}" class="link-top" style="color: #0060ffff;">art</a>, focusing on sound and kinetic  installations. However, it became clear that artistic practice does not always translate into visible contributions to society.
        <br>
        <br>
        <em style="color: #d8f0ffff;">▼ Scroll Down ▼</em>
        </p>
        </div>
        <div class="copy" id="text2">
        ○ ● ○
        <h3>Design as a Response to Human Needs</h3>
        <p>Studying industrial design was a way to turn artistic vision into practical solutions for a better society. 
        The <a href="{{ '/design/oxynizer' | relative_url }}" class="link-top" style="color: #0060ffff;">Oxynizer: Sustainable & Non-electric Oxygen Generator</a> project was a turning point, revealing how design inclusively respond to urgent needs.
        <br>
        <br>
        <em style="color: #d8f0ffff;">▼ Scroll Down ▼</em></p>
        </div>
        <div class="copy" id="text3">
          ○ ○ ●
        <h3>Design for Social Impact</h3>
        <p>Today, my practice focuses on creating purposeful systems by integrating craftsmanship with human-centered design. My aim is to bridge artistic exploration with practical impact, advancing designs rooted in inclusivity.</p>
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
