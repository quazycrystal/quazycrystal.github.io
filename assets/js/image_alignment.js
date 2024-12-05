// Set container width
const containerWidth = document.getElementById("page-title").offsetWidth;
console.log (containerWidth)

// Select all elements with the class "left"
const leftBlocks = document.querySelectorAll(".left");

// Loop through each block
leftBlocks.forEach((block) => {
    // Get all <img> elements inside the current block
    const images = block.querySelectorAll("img");
    // Count the number of images
    const numberOfImages = images.length;

    images.forEach(img => {
        img.style.width = `${containerWidth / numberOfImages}px`;
        console.log(img.style.width)
    });
}); 