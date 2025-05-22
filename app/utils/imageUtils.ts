// Array of images from map-widget-pics folder
export const widgetImages = [
  require('../../assets/map-widget-pics/random-image-1.png'),
  require('../../assets/map-widget-pics/random-image-2.png'),
  require('../../assets/map-widget-pics/random-image-3.png'),
  require('../../assets/map-widget-pics/random-image-4.png'),
  require('../../assets/map-widget-pics/random-image-5.png'),
  require('../../assets/map-widget-pics/random-image-6.png'),
  require('../../assets/map-widget-pics/random-image-7.png'),
  require('../../assets/map-widget-pics/random-image-9.png'),
  require('../../assets/map-widget-pics/random-image-10.png'),
  require('../../assets/map-widget-pics/random-image-11.png'),
  require('../../assets/map-widget-pics/random-image-12.png'),
  require('../../assets/map-widget-pics/random-image-13.png'),
  require('../../assets/map-widget-pics/random-image-14.png'),
  require('../../assets/map-widget-pics/random-image-15.png'),
  require('../../assets/map-widget-pics/random-image-16.png'),
];

// Keep track of next image index
let nextImageIndex = 0;

/**
 * Get the next widget image from the list, cycling back to the beginning if needed
 */
export const getNextWidgetImage = () => {
  // Get the next image
  const image = widgetImages[nextImageIndex];
  
  // Increment index and cycle back if needed
  nextImageIndex = (nextImageIndex + 1) % widgetImages.length;
  
  return image;
};

/**
 * Get a random widget image from the list
 */
export const getRandomWidgetImage = () => {
  const randomIndex = Math.floor(Math.random() * widgetImages.length);
  return widgetImages[randomIndex];
};

/**
 * Get a specific widget image by index (cycles if index is out of bounds)
 */
export const getWidgetImageByIndex = (index: number) => {
  const safeIndex = index % widgetImages.length;
  return widgetImages[safeIndex];
};

// Add default export for Expo Router
export default function ImageUtils() {
  return null;
} 