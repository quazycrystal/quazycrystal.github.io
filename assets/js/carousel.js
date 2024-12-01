document.addEventListener('DOMContentLoaded', function () {
    // Initialize Glide.js
    const glide = new Glide('.glide-main', {
      type: 'carousel',
      startAt: 0,
      perView: 1,
      animationDuration: 500,
    });
  
    // Function to adjust carousel height dynamically
    function adjustCarouselHeight() {
      const activeSlide = document.querySelector('.glide__slide--active img');
      const glideTrack = document.querySelector('.glide__track');
      if (activeSlide && glideTrack) {
        glideTrack.style.height = activeSlide.offsetHeight + 'px';
      }
    }
  
    // Mount Glide.js
    glide.mount();
  
    // Adjust height initially
    adjustCarouselHeight();
  
    // Adjust height on slide change
    glide.on('run.after', adjustCarouselHeight);
  
    // Handle thumbnail clicks
    const thumbnails = document.querySelectorAll('.carousel-thumbnails img');
    thumbnails.forEach((thumb, index) => {
      thumb.addEventListener('click', () => {
        glide.go(`=${index}`);
        thumbnails.forEach(t => t.classList.remove('active'));
        thumb.classList.add('active');
      });
    });
  
    // Highlight the first thumbnail by default
    //thumbnails[0].classList.add('active');
  
    // Update thumbnail highlight when sliding
    glide.on('run.after', () => {
      const activeIndex = glide.index;
      thumbnails.forEach(t => t.classList.remove('active'));
      thumbnails[activeIndex].classList.add('active');
    });
  
    // Adjust height on window resize
    window.addEventListener('resize', adjustCarouselHeight);
  });
  