/**
 * Cashed Slideshow is a really simple slide show that uses simple fade to switch images.
 * The advantage is the cashing functionality that ensures images are loaded before the slideshow begins.
 * Note: The slideshow element should be an <code>ul-tag</code> containing li-items with a-tags
 * @example  
 *   <ul id="cachedSlideshow"> 
 *      <li><img src="path/to/image1.jpg" /></li>
 *      .... 
 *      <li><img src="path/to/image8.jpg" /></li>
 *   </ul>
 * 
 * Todo: Add other transitions between slides.
 * 
 * @version  1.0
 * 
 * @param [$element]        el - the element which holds the listitems (containing the image tags)
 * @param [integer]  fadeSpeed - the number of millis used to fade an image in/out
 * @param [integer]      delay - the number of millis to show each image before proceeding       
 */
function initSlideShow (el, fadeSpeed, delay) {
    var slides = $(el);
    var slideCount = 0;
    var totalSlides = slides.length;
    var imageCache = [];

    // Speeding options
    var fadeSpeed = fadeSpeed;
    var delayTime = delay;

    // Imedietly invoke the preloader and cache all images within an array
    (function preloader() {
        if(slideCount < totalSlides) {
            imageCache[slideCount] = new Image();
            imageCache[slideCount].src = slides.eq(slideCount).find('img').attr('src');
            imageCache[slideCount].onload = function () {
                slideCount++;
                preloader();
            }
        } else {
            slideCount = 0;
            startSlideShow();
        }
    }());

    function startSlideShow() {
        slides.eq(slideCount)
            .fadeIn(fadeSpeed)
            .delay(delayTime)
            .fadeOut(fadeSpeed, function () {
                slideCount < totalSlides - 1 ? slideCount++ : slideCount = 0;
                startSlideShow();
            }); 
    }
}