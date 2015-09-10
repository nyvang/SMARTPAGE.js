/**
 * Fading module allows several elements to fade one by one while waiting on the next element with a custom delay
 * 
 * @module FadingElements
 */

/**
 * FadeElements 
 * Provides a quick and handy helper that fades a set of elements. 
 * Specify delay between each element and the fading time to adapt it for your specific needs
 *  
 * @example $(elements).fadeAll({ delay: 300, speed: 300 });
 * @function FadeElements
 * @param {Object} opts - Standard options object implemented with the commonly used extend-pattern.
 * @default {delay: 500, speed: 500, easing: 'swing'}
 * 
 * @returns {JQuery Static} - standard jQuery return of the reciever of the function
 */
$.fn.FadeElements = function (opts) {
    var o = $.extend({
        delay: 500, speed: 500, easing: 'swing'
    }, opts);
    var $el = this;
    for (var i = 0, d = 0, l = $el.length; i < l; i++, d += o.delay) {
        $el.eq(i).delay(d).fadeIn(o.speed, o.easing);
    }
    return $el;
}