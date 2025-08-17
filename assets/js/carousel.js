document.addEventListener('DOMContentLoaded', function () {
  const glideElements = document.querySelectorAll('.glide-main');

  // ---- 전역 디바운스 유틸
  const debounce = (fn, delay = 150) => {
    let t; return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), delay); };
  };

  // ---- 높이 계산: 활성 슬라이드 이미지 로드 보장 후
  function adjustCarouselHeight(glideElement) {
    const track = glideElement.querySelector('.glide__track');
    const active = glideElement.querySelector('.glide__slide--active') || glideElement.querySelector('.glide__slide');
    if (!track || !active) return;

    const imgs = Array.from(active.querySelectorAll('img'));
    // 모든 이미지가 로드됐는지 확인
    const allLoaded = imgs.every(img => img.complete && img.naturalHeight > 0);
    if (!allLoaded) {
      // 아직이면 로드 후 한 번만 다시 계산
      imgs.forEach(img => {
        if (!img._heightListenerAdded) {
          img.addEventListener('load', () => adjustCarouselHeight(glideElement), { once: true });
          img._heightListenerAdded = true;
        }
      });
      return;
    }
    // 이미지 로드가 끝났으면 높이 확정
    track.style.height = `${active.offsetHeight}px`;
    // (선택) 준비 완료 시 트랙 보이기
    track.style.visibility = 'visible';
  }

  // ---- 썸네일 크기 조정
  function adjustThumbnailSize(glideElement) {
    // 더 견고한 탐색: 같은 캐러셀 블록 내에서 명시적으로 찾기
    const wrapper = glideElement.closest('.carousel'); // 필요 시 부모 래퍼에 .carousel 부여
    const thumbsContainer = wrapper ? wrapper.querySelector('.carousel-thumbnails') : glideElement.previousElementSibling;

    if (!thumbsContainer || !thumbsContainer.classList.contains('carousel-thumbnails')) return;

    const thumbs = thumbsContainer.querySelectorAll('img');
    const total = thumbs.length;
    if (!total) return;

    const containerWidth = thumbsContainer.clientWidth || thumbsContainer.offsetWidth;
    if (!containerWidth) return;

    const isMobile = window.innerWidth < 768;
    const maxW = isMobile ? 50 : 75;
    const maxH = isMobile ? 50 : 75;
    const maxGap = 10;

    const gap = Math.min(maxGap, containerWidth / (total * 10));
    const w = Math.min(maxW, (containerWidth - gap * (total - 1)) / total);

    thumbs.forEach((t, i) => {
      t.style.width = `${w}px`;
      t.style.height = 'auto';
      t.style.maxWidth = `${maxW}px`;
      t.style.maxHeight = `${maxH}px`;
      t.style.marginRight = i < total - 1 ? `${gap}px` : '0';
    });
  }

  // ---- 각 캐러셀 초기화
  const glides = [];
  glideElements.forEach((glideElement) => {
    // 초기 FOUC 방지: 준비될 때까지 트랙 숨김
    const track = glideElement.querySelector('.glide__track');
    if (track) track.style.visibility = 'hidden';

    const glide = new Glide(glideElement, {
      type: 'carousel',
      startAt: 0,
      perView: 1,
      animationDuration: 100,
    });

    // 썸네일 핸들링
    (function wireThumbnails() {
      const wrapper = glideElement.closest('.carousel');
      const thumbsContainer = wrapper ? wrapper.querySelector('.carousel-thumbnails') : glideElement.previousElementSibling;
      if (!thumbsContainer || !thumbsContainer.classList.contains('carousel-thumbnails')) return;

      const thumbs = thumbsContainer.querySelectorAll('img');
      thumbs.forEach((thumb, index) => {
        thumb.addEventListener('click', (e) => {
          e.preventDefault();
          glide.go(`=${index}`);
          thumbs.forEach(t => t.classList.remove('active'));
          thumb.classList.add('active');
        });
      });

      if (thumbs.length > 0) thumbs[0].classList.add('active');

      glide.on('run.after', () => {
        const activeIndex = glide.index;
        thumbs.forEach(t => t.classList.remove('active'));
        if (thumbs[activeIndex]) thumbs[activeIndex].classList.add('active');
      });
    })();

    // mount 후: 이미지 로딩 감안하여 높이/썸네일 조정
    glide.on('mount.after', () => {
      adjustThumbnailSize(glideElement);
      adjustCarouselHeight(glideElement);
    });

    // 슬라이드 이동 후에도 높이 재계산
    glide.on('run.after', () => adjustCarouselHeight(glideElement));

    glide.mount();
    glides.push({ glide, el: glideElement });
  });

  // ---- 전역 resize: 디바운스 + 모든 캐러셀 갱신
  const onResize = debounce(() => {
    glides.forEach(({ el }) => {
      adjustThumbnailSize(el);
      adjustCarouselHeight(el);
    });
  }, 150);
  window.addEventListener('resize', onResize);
});
