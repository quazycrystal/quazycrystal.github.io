
// // Adjust carousel height dynamically for this specific carousel
// function adjustCarouselHeight() {
//   const activeSlide = glideElement.querySelector('.glide__slide--active');
//   const glideTrack = glideElement.querySelector('.glide__track');
//   if (activeSlide && glideTrack) {
//       glideTrack.style.height = activeSlide.offsetHeight + 'px';
//   }
// }

// // Adjust thumbnail size responsively for this specific carousel
// function adjustThumbnailSize() {
//   const thumbnailContainer = glideElement.querySelector('.carousel-thumbnails'); // Thumbnails container
//   const thumbnails = glideElement.querySelectorAll('.carousel-thumbnails img'); // Thumbnails
//   const totalThumbnails = thumbnails.length;

//   if (!thumbnailContainer || totalThumbnails === 0) return;

//   const containerWidth = thumbnailContainer.offsetWidth;
//   const maxThumbnailWidth = 75;
//   const maxThumbnailHeight = 75;
//   const maxGap = 10;

//   const gap = Math.min(maxGap, containerWidth / (totalThumbnails * 10));
//   const thumbnailWidth = (containerWidth - gap * (totalThumbnails - 1)) / totalThumbnails;

//   thumbnails.forEach((thumb, index) => {
//       thumb.style.width = `${thumbnailWidth}px`;
//       thumb.style.height = 'auto';
//       thumb.style.maxWidth = `${maxThumbnailWidth}px`;
//       thumb.style.maxHeight = `${maxThumbnailHeight}px`;
//       thumb.style.marginRight = index < totalThumbnails - 1 ? `${gap}px` : '0';
//   });
// }

// // Handle thumbnail clicks for this specific carousel
// const thumbnails = glideElement.querySelectorAll('.carousel-thumbnails img');
// thumbnails.forEach((thumb, index) => {
//   thumb.addEventListener('click', () => {
//       glide.go(`=${index}`);
//       thumbnails.forEach(t => t.classList.remove('active'));
//       thumb.classList.add('active');
//   });
// });

// // Update thumbnail highlight for this specific carousel
// glide.on('run.after', () => {
//   const activeIndex = glide.index;
//   thumbnails.forEach(t => t.classList.remove('active'));
//   if (thumbnails[activeIndex]) thumbnails[activeIndex].classList.add('active');
// });



document.addEventListener('DOMContentLoaded', function () {
    // Initialize Glide.js
    const glide = new Glide('.glide-main', {
      type: 'carousel',
      startAt: 0,
      perView: 1,
      animationDuration: 0,
    });
  
  // Function to adjust carousel height dynamically (only slides)
  function adjustCarouselHeight() {
    const activeSlide = document.querySelector('.glide__slide--active');
    const glideTrack = document.querySelector('.glide__track');
    if (activeSlide && glideTrack) {
      glideTrack.style.height = activeSlide.offsetHeight + 'px';
    }
  }

  // Function to adjust thumbnail size responsively
  function adjustThumbnailSize() {
    const thumbnailContainer = document.querySelector('.carousel-thumbnails'); // Container for thumbnails
    const thumbnails = document.querySelectorAll('.carousel-thumbnails img'); // Thumbnail images
    const totalThumbnails = thumbnails.length;
  
    // if (!thumbnailContainer || totalThumbnails === 0) return; // Exit if no container or thumbnails
  
    // Get the container's width
    const containerWidth = thumbnailContainer.offsetWidth;
    const maxThumbnailWidth = 75; // Maximum thumbnail width
    const maxThumbnailHeight = 75; // Maximum thumbnail height
    // Define a maximum gap (optional, adjust as needed)
    const maxGap = 10;
  
    // Calculate the dynamic gap
    const gap = Math.min(maxGap, containerWidth / (totalThumbnails * 10));
  
    // Calculate the width for each thumbnail to fit within the container
    const thumbnailWidth = (containerWidth - gap * (totalThumbnails - 1)) / totalThumbnails;
  
    // Apply calculated width and gap to each thumbnail
    thumbnails.forEach((thumb, index) => {
      thumb.style.width = `${thumbnailWidth}px`; // Adjust width dynamically
      thumb.style.height = 'auto'; // Maintain aspect ratio
      thumb.style.maxWidth = `${maxThumbnailWidth}px`; // Ensure max width
      thumb.style.maxHeight = `${maxThumbnailHeight}px`; // Ensure max height
      thumb.style.marginRight = index < totalThumbnails - 1 ? `${gap}px` : '0'; // Add gap except for the last thumbnail
    });
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
  
  // Adjust thumbnail size and carousel height on window resize
  window.addEventListener('resize', () => {
    adjustCarouselHeight();
    adjustThumbnailSize();
  });

  // Adjust thumbnails initially
  adjustThumbnailSize();
});

  //   // Adjust height on window resize
  //   window.addEventListener('resize', adjustCarouselHeight);
  // });
  