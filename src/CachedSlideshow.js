
/**
 * The "equalizing module", which is used for setting heights or widths of child-elements
 * 
 * @module CachedSlidehow
 */

/**
 * Cashed Slideshow is a really simple slide show that uses simple fade to switch images.
 * The advantage is the cashing functionality that ensures images are loaded before the slideshow begins.
 * Note: The slideshow element should be an <code>ul-tag</code> containing li-items with a-tags
 *   <ul id="cachedSlideshow"> 
 *      <li><img src="path/to/image1.jpg" /></li>
 *      .... 
 *      <li><img src="path/to/image8.jpg" /></li>
 *   </ul>
 * Todo: Add other transitions between slides.
 * @example 
 * @version 1.0
 * @method initSlideShow
 * @param {} el
 * @param {} fadeSpeed
 * @param {} delay
 * @return 
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
            /**
             * Description
             * @method onload
             * @return 
             */
            imageCache[slideCount].onload = function () {
                slideCount++;
                preloader();
            }
        } else {
            slideCount = 0;
            startSlideShow();
        }
    }());

    /**
     * Description
     * @method startSlideShow
     * @return 
     */
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