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