



/**
 * addTimedEvent
 * Add an eventListener to the <code>element</code> and specify a <code>delay</code> in ms
 * The eventlistener is delayed before it fires. This is useful for events that fire
 * alot, and where only a single or two is needed. 
 * Like <code>resize-</code> or <code>scroll-events</code>
 * 
 * @param {string}  eName       - the name/type of the event to listen for. e.g. resize or scroll
 * @param {int}     delay       - the delay to postpone the event. Default: 100ms
 * @param {object}  elm         - the (jQuery)element, on which to attach the eventListener 
 * @param {string}  callback    - the name of the function to call upon fireing the event
 * 
 */
function addTimedEvent (evnt, delay, elm, callback) {
    var t;
    $(elm).bind(evnt, function (delay) {
        t && clearTimeout(t);
        t = setTimeout(callback, delay);
    });
}

/*
function switchClass(elm, oldClass, newClass, callback) {
    throw new ExceptionInformation("Not implementet yet");
}
*/

/*-------------------------------------------------------------------- 
 * javascript method: "pxToEm"
 * by:
   Scott Jehl (scott@filamentgroup.com) 
   Maggie Wachs (maggie@filamentgroup.com)
   http://www.filamentgroup.com
 *
 * Copyright (c) 2008 Filament Group
 * Dual licensed under the MIT (filamentgroup.com/examples/mit-license.txt) and GPL (filamentgroup.com/examples/gpl-license.txt) licenses.
 *
 * Description: Extends the native Number and String objects with pxToEm method. pxToEm converts a pixel value to ems depending on inherited font size.  
 * Article: http://www.filamentgroup.com/lab/retaining_scalable_interfaces_with_pixel_to_em_conversion/
 * Demo: http://www.filamentgroup.com/examples/pxToEm/	 	
 *							
 * Options:  	 								
 		scope: string or jQuery selector for font-size scoping
 		reverse: Boolean, true reverses the conversion to em-px
 * Dependencies: jQuery library						  
 * Usage Example: myPixelValue.pxToEm(); or myPixelValue.pxToEm({'scope':'#navigation', reverse: true});
 *
 * Version: 2.0, 08.01.2008 
 * Changelog:
 *		08.02.2007 initial Version 1.0
 *		08.01.2008 - fixed font-size calculation for IE
--------------------------------------------------------------------*/

Number.prototype.pxToEm = String.prototype.pxToEm = function (settings) {
    //set defaults
    settings = jQuery.extend({
        scope: 'body',
        reverse: false
    }, settings);

    var pxVal = (this == '') ? 0 : parseFloat(this);
    var scopeVal;
    var getWindowWidth = function () {
        var de = document.documentElement;
        return self.innerWidth || (de && de.clientWidth) || document.body.clientWidth;
    };

    /* When a percentage-based font-size is set on the body, IE returns that percent of the window width as the font-size. 
		For example, if the body font-size is 62.5% and the window width is 1000px, IE will return 625px as the font-size. 	
		When this happens, we calculate the correct body font-size (%) and multiply it by 16 (the standard browser font size) 
		to get an accurate em value. */

    if (settings.scope == 'body' && $.browser.msie && (parseFloat($('body').css('font-size')) / getWindowWidth()).toFixed(1) > 0.0) {
        var calcFontSize = function () {
            return (parseFloat($('body').css('font-size')) / getWindowWidth()).toFixed(3) * 16;
        };
        scopeVal = calcFontSize();
    }
    else { scopeVal = parseFloat(jQuery(settings.scope).css("font-size")); };

    var result = (settings.reverse == true) ? (pxVal * scopeVal).toFixed(2) + 'px' : (pxVal / scopeVal).toFixed(2) + 'em';
    return result;
};


$.fn.equalHeights = function (px) {
    $(this).each(function () {
        var currentTallest = 0;
        $(this).children().each(function (i) {
            if ($(this).height() > currentTallest) { currentTallest = $(this).height(); }
        });
        if (!px && Number.prototype.pxToEm) currentTallest = currentTallest.pxToEm(); //use ems unless px is specified
        // for ie6, set height since min-height isn't supported
        if (typeof (document.body.style.minHeight) === "undefined") { $(this).children().css({ 'height': currentTallest }); }
        $(this).children().css({ 'min-height': currentTallest });
    });
    return this;
};

// just in case you need it...
$.fn.equalWidths = function (px) {
    $(this).each(function () {
        var currentWidest = 0;
        $(this).children().each(function (i) {
            if ($(this).width() > currentWidest) { currentWidest = $(this).width(); }
        });
        if (!px && Number.prototype.pxToEm) currentWidest = currentWidest.pxToEm(); //use ems unless px is specified
        // for ie6, set width since min-width isn't supported
        if (typeof (document.body.style.minHeight) === "undefined") { $(this).children().css({ 'width': currentWidest }); }
        $(this).children().css({ 'min-width': currentWidest });
    });
    return this;
};