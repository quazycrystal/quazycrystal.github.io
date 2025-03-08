document.addEventListener('DOMContentLoaded', function () {
    // Select all carousel containers
    const glideElements = document.querySelectorAll('.glide-main');

    glideElements.forEach((glideElement) => {
        const glide = new Glide(glideElement, {
            type: 'carousel',
            startAt: 0,
            perView: 1,
            animationDuration: 100,
        });

        // Ensure the first slide is set as active
        function setInitialActiveSlide() {
            const firstSlide = glideElement.querySelector('.glide__slide');
            if (firstSlide) {
                firstSlide.classList.add('glide__slide--active');
            }
        }

        // Adjust the carousel height dynamically
        function adjustCarouselHeight() {
            const glideTrack = glideElement.querySelector('.glide__track');
            const slides = glideElement.querySelectorAll('.glide__slide');

            if (slides.length > 0 && glideTrack) {
                const maxHeight = Math.max(...Array.from(slides).map(s => s.offsetHeight));
                glideTrack.style.height = `${maxHeight}px`;
            }
        }

        // Adjust thumbnail sizes dynamically
        function adjustThumbnailSize() {
            const thumbnailsContainer = glideElement.previousElementSibling;
            if (thumbnailsContainer && thumbnailsContainer.classList.contains('carousel-thumbnails')) {
                const thumbnails = thumbnailsContainer.querySelectorAll('img');
                const totalThumbnails = thumbnails.length;
        
                if (totalThumbnails === 0) return;
        
                const containerWidth = thumbnailsContainer.offsetWidth;
        
                // Set max thumbnail size dynamically based on screen width
                const isMobile = window.innerWidth < 768; // Define mobile width threshold
                const maxThumbnailWidth = isMobile ? 50 : 75; // Smaller max width for mobile
                const maxThumbnailHeight = isMobile ? 50 : 75; // Smaller max height for mobile
                const maxGap = 10; // Maximum gap between thumbnails
        
                const gap = Math.min(maxGap, containerWidth / (totalThumbnails * 10));
                const thumbnailWidth = (containerWidth - gap * (totalThumbnails - 1)) / totalThumbnails;
        
                thumbnails.forEach((thumb, index) => {
                    thumb.style.width = `${thumbnailWidth}px`;
                    thumb.style.height = 'auto';
                    thumb.style.maxWidth = `${maxThumbnailWidth}px`;
                    thumb.style.maxHeight = `${maxThumbnailHeight}px`;
                    thumb.style.marginRight = index < totalThumbnails - 1 ? `${gap}px` : '0';
                });
            }
        }
        
        // Run function on window resize to adjust dynamically
        window.addEventListener('resize', adjustThumbnailSize);
        

        // Handle thumbnail clicks
        const thumbnailsContainer = glideElement.previousElementSibling;
        if (thumbnailsContainer && thumbnailsContainer.classList.contains('carousel-thumbnails')) {
            const thumbnails = thumbnailsContainer.querySelectorAll('img');

            thumbnails.forEach((thumb, index) => {
                thumb.addEventListener('click', () => {
                    glide.go(`=${index}`);
                    thumbnails.forEach(t => t.classList.remove('active'));
                    thumb.classList.add('active');
                });
            });

            // Highlight the first thumbnail and slide by default
            if (thumbnails.length > 0) thumbnails[0].classList.add('active');

            // Update thumbnails on slide change
            glide.on('run.after', () => {
                const activeIndex = glide.index;
                thumbnails.forEach(t => t.classList.remove('active'));
                if (thumbnails[activeIndex]) thumbnails[activeIndex].classList.add('active');
            });
        }

        // Mount Glide and add resize listeners
        setInitialActiveSlide();
        glide.mount();

        // Ensure height is adjusted after Glide.js initializes
        glide.on('mount.after', () => {
            setTimeout(() => {
                adjustCarouselHeight();
                glide.update(); // Forces Glide to recalculate layout
            }, 200);
        });

        adjustCarouselHeight();
        adjustThumbnailSize();

        window.addEventListener('resize', () => {
            adjustCarouselHeight();
            adjustThumbnailSize();
        });

        glide.on('run.after', adjustCarouselHeight);
    });
});


// document.addEventListener('DOMContentLoaded', function () {
//   // Select all carousel containers
//   const glideElements = document.querySelectorAll('.glide-main');

//   glideElements.forEach((glideElement) => {
//         const glide = new Glide(glideElement, {
//             type: 'carousel',
//             startAt: 0,
//             perView: 1,
//             animationDuration: 100,
//         });

//         // Ensure the first slide is set as active
//         function setInitialActiveSlide() {
//           const firstSlide = glideElement.querySelector('.glide__slide');
//           if (firstSlide) {
//             firstSlide.classList.add('glide__slide--active');
//           }
//         }
    
//       // Adjust the carousel height for the current carousel
//         function adjustCarouselHeight() {
//             const activeSlide = glideElement.querySelector('.glide__slide--active');
//             const glideTrack = glideElement.querySelector('.glide__track');
//             if (activeSlide && glideTrack) {
//                 glideTrack.style.height = `${activeSlide.offsetHeight}px`;
//             }
//         }

//       // Adjust thumbnail sizes for the current carousel
//       function adjustThumbnailSize() {
//           const thumbnailsContainer = glideElement.previousElementSibling; // Assuming thumbnails are right above the carousel
//           if (thumbnailsContainer && thumbnailsContainer.classList.contains('carousel-thumbnails')) {
//               const thumbnails = thumbnailsContainer.querySelectorAll('img');
//               const totalThumbnails = thumbnails.length;

//               if (totalThumbnails === 0) return;

//               const containerWidth = thumbnailsContainer.offsetWidth;
//               const maxThumbnailWidth = 75; // Maximum width of thumbnails
//               const maxThumbnailHeight = 75; // Maximum height of thumbnails
//               const maxGap = 10; // Maximum gap between thumbnails

//               const gap = Math.min(maxGap, containerWidth / (totalThumbnails * 10));
//               const thumbnailWidth = (containerWidth - gap * (totalThumbnails - 1)) / totalThumbnails;

//               thumbnails.forEach((thumb, index) => {
//                   thumb.style.width = `${thumbnailWidth}px`;
//                   thumb.style.height = 'auto';
//                   thumb.style.maxWidth = `${maxThumbnailWidth}px`;
//                   thumb.style.maxHeight = `${maxThumbnailHeight}px`;
//                   thumb.style.marginRight = index < totalThumbnails - 1 ? `${gap}px` : '0';
//               });
//           }
//       }

//       // Handle thumbnail clicks for this specific carousel
//       const thumbnailsContainer = glideElement.previousElementSibling; // Assuming thumbnails are right above the carousel
//       if (thumbnailsContainer && thumbnailsContainer.classList.contains('carousel-thumbnails')) {
//           const thumbnails = thumbnailsContainer.querySelectorAll('img');

//           thumbnails.forEach((thumb) => {
//               thumb.addEventListener('click', () => {
//                   const slideIndex = parseInt(thumb.getAttribute('data-index'), 10);
//                   if (!isNaN(slideIndex)) {
//                       glide.go(`=${slideIndex}`);
//                       thumbnails.forEach(t => t.classList.remove('active'));
//                       thumb.classList.add('active');
//                   }
//               });
//           });

//           // Highlight the first thumbnail and slide by default
//           if (thumbnails.length > 0) thumbnails[0].classList.add('active');
//           const firstSlide = glideElement.querySelector('.glide__slide');
//           if (firstSlide) firstSlide.classList.add('glide__slide--active');

//           // Update thumbnails on slide change
//           glide.on('run.after', () => {
//               const activeIndex = glide.index;
//               thumbnails.forEach(t => t.classList.remove('active'));
//               if (thumbnails[activeIndex]) thumbnails[activeIndex].classList.add('active');
//           });
//       }

//       // Mount Glide and add resize listeners
//       setInitialActiveSlide();
//       glide.mount();
    
//       adjustCarouselHeight();
//       adjustThumbnailSize();

//       window.addEventListener('resize', () => {
//           adjustCarouselHeight();
//           adjustThumbnailSize();
//       });

//       glide.on('run.after', adjustCarouselHeight);
//   });
// });
