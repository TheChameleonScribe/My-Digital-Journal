function convertImagesToGallery() {
    // Find all images that are not already in a gallery
    const images = document.querySelectorAll('img:not(.NOTIMAGE):not(.pointer):not(.gallery img)');
    
    images.forEach(img => {
      // Create a gallery div
      const gallery = document.createElement('div');
      gallery.className = 'gallery';
      
      // Create a figure element
      const figure = document.createElement('figure');
      figure.className = 'gallery-item';
      
      // Clone the image to preserve all original attributes
      const clonedImg = img.cloneNode(true);
      
      // Add the image to the figure
      figure.appendChild(clonedImg);
      
      // Add a figcaption if alt text exists
      if (img.alt) {
        const caption = document.createElement('figcaption');
        caption.textContent = img.alt;
        figure.appendChild(caption);
      }
      
      // Add the figure to the gallery
      gallery.appendChild(figure);
      
      // Replace the original image with the new gallery
      img.parentNode.replaceChild(gallery, img);
    });
  }
  
  // Run the conversion when the DOM is fully loaded
  document.addEventListener('DOMContentLoaded', convertImagesToGallery);
  
  // Optional: If you want to call it manually or after dynamically adding images
  // window.convertImagesToGallery = convertImagesToGallery;