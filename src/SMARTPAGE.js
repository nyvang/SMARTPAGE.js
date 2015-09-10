/**
 * Project:             SMARTPAGE WEB Library
 * Summary:             A collection offrequently use JS and CSS tools and helperfunctions
 * Version:             0.2.0
 *  
 * Author:              N. Nyvang               
 * Company:             SMARTPAGE A/S
 * Web:                 http://smartpage.dk
 */

/**
 * Notes:
 * 
 * The library has been build by the Module design pattern to maximize modulation
 * and to create a namespace-alike to keep variables from collisions. 
 */


var WebLib = (function (window, underfined) {

    var settings = {};

    function WebLib() {

        //this
        
    }


})(window);

/**
 * addTimedEvent
 * Add an eventListener to the <code>element</code> and specify a <code>delay</code> in ms
 * The eventlistener is delayed before it fires. This is useful for events that fire
 * alot, and where only a single or two is needed. 
 * Like <code>resize-</code> or <code>scroll-events</code>
 * @method addTimedEvent
 * @param {} evnt
 * @param {} delay
 * @param {} el
 * @param {} callback
 * @return 
 */
function addTimedEvent(evnt, delay, el, callback) {
    var t;
    $(el).bind(evnt, function (delay) {
        t && clearTimeout(t);
        t = setTimeout(callback, delay);
    });
}

