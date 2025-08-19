(function(){
  const clamp   = (v,min,max)=>Math.min(max, Math.max(min, v));
  const invLerp = (a,b,v)=> clamp((v-a)/(b-a), 0, 1);
  const easeInOutCubic = t => t<.5 ? 4*t*t*t : 1 - Math.pow(-2*t+2, 3)/2;
  const ease01  = t => easeInOutCubic(clamp(t,0,1));

  const track  = document.querySelector('.scroll-track');
  const s1 = document.getElementById('scene1');
  const s2 = document.getElementById('scene2');
  const s3 = document.getElementById('scene3');

  /* ★ 추가: 텍스트 타겟 */
  const t1 = document.getElementById('text1');
  const t2 = document.getElementById('text2');
  const t3 = document.getElementById('text3');

  function getProgress(){
    const rect = track.getBoundingClientRect();
    const vh   = window.innerHeight;
    const total = rect.height - vh;
    if (total <= 0) return 0;
    return clamp((-rect.top)/total, 0, 1);
  }

  // 기존 알파 함수(장면과 동일 타이밍)
  function alphaScene1(p){ const o = ease01(invLerp(0.2, 0.45, p)); return clamp(1 - o, 0, 1); }
  function alphaScene2(p){ const i = ease01(invLerp(0.3, 0.55, p)); const o = ease01(invLerp(0.6, 0.85, p)); return clamp(i*(1-o),0,1); }
  function alphaScene3(p){ return ease01(invLerp(0.6, 0.85, p)); }

function update(){
  const p  = getProgress();
  const a1 = alphaScene1(p);
  const a2 = alphaScene2(p);
  const a3 = alphaScene3(p);

  // ✨ 이미지: 위치/스케일 고정, 알파만 변경
  if (s1) { s1.style.opacity = a1.toFixed(3); }
  if (s2) { s2.style.opacity = a2.toFixed(3); }
  if (s3) { s3.style.opacity = a3.toFixed(3); }

  // 텍스트는 그대로
  if (t1) { t1.style.opacity = a1.toFixed(3); }
  if (t2) { t2.style.opacity = a2.toFixed(3); }
  if (t3) { t3.style.opacity = a3.toFixed(3); }
  }

  const onScroll = () => requestAnimationFrame(update);
  window.addEventListener('scroll', onScroll, { passive:true });
  window.addEventListener('resize', onScroll, { passive:true });

  update();

  // 프리로드 그대로 유지
  ['/assets/img/index1.png','/assets/img/index2.png','/assets/img/index3.png'].forEach(src=>{ const i=new Image(); i.src=src; });
})();
