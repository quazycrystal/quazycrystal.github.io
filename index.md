---
layout: default
title: Home
---

<!-- 페이지 전용 CSS (전역 레이아웃에 이미 링크돼 있다면 이 줄은 생략 가능) -->
<link rel="stylesheet" href="{{'assets\css\index.css'| relative_url}}">

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
          <h3>Section 1</h3>
          <p>1. From Fine Art to Human Interaction

I began my creative career in fine art, working primarily with sound installations that invited audiences to explore space, movement, and perception. These works often prompted thoughtful responses from visitors, revealing their emotional and sensory impact. However, I came to realize that while these experiences were engaging, they did not create tangible changes in people’s daily lives. They were not driven by a specific need or aimed at solving real-world problems.
</p>
        </div>
        <div class="copy" id="text2">
          <h3>Section 2</h3>
          <p>2. Recognizing the Need for Purposeful Design

This realization led me to study industrial design, seeking a way to connect artistic expression with practical solutions. I became interested in how design could address social and environmental challenges, and I began developing concepts grounded in sustainability and inclusivity. The Oxynizer project became a turning point—it showed me how design could respond to urgent needs, improve health outcomes, and remain accessible to diverse communities.</p>
        </div>
        <div class="copy" id="text3">
          <h3>Section 3</h3>
          <p>3. Designing for Social Impact

Today, I integrate craftsmanship, technology, and human-centered design to create interactive systems that are both innovative and purposeful. My goal is to bridge the gap between artistic exploration and practical benefit, producing tangible designs that contribute to a more sustainable and equitable future. Each project is guided by the belief that good design can inspire, empower, and create lasting value for society.</p>
        </div>
      </aside>
    </div>
  </section>
</div>

<!-- 페이지 전용 JS (전역 번들에 포함시켰다면 이 줄은 생략 가능) -->
<script src="{{'assets\js\index.js'| relative_url}}" defer></script>

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
  </script>
  -->
