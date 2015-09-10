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
};/**
 * CookieHandler
 * Contains setter and getter functions for handling of cookies
 */

/**
 * Setter for cookies
 * @method setCookie
 * @param {} key
 * @param {} value
 * @param {} exdays
 * @return 
 */
function setCookie(key, value, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = key + "=" + value + "; " + expires;
}

/**
 * Getter for cookies
 * @method getCookie
 * @param {} cname
 * @return Literal
 */
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
    }
    return "";
}


;


/**
 * Iterate elements takes some elements on the same row
 * (i.e. generated items which spans over several BootStrap rows)
 * It measures the distance from the top of the page and groups the ones 
 * with the same distance. (i.e. same distance to top === items on the same row)
 * After each row is filled with items, some action is done to all items of that row.
 * For mobile viwes (<768px) the elements are placed underneath each other (one item on one row)
 * @method iterateElemets
 * @param {} container
 * @return void
 */
function iterateElemets(container) {
    var evt = "";
    // Check for mobile-first
    if ($(".navbar-toggle").is(":visible")) {
        $('.js-activity-months').css("min-height", ""); // reset height
        if (evt === "pageload") {
            $("html, body").animate({ scrollTop: $("#currentMonth").offset().top }, 500); // scroll to active month
        }
    }
    else {

        var currentTallest = 0,
            currentSmallest = 0,
            currentRowStart = 0,
            activityRows = new Array(),
            $el,
            topPosition = 0;


        $(container).each(function () {

            $el = $(this);
            topPosition = $el.position().top;

            if (currentRowStart != topPosition) {

                // New row initiated -  Set all the hmin-eights on the completed row before resetting and moving on
                for (var i = 0; i < activityRows.length; i++) {
                    console.log(activityRows[i]);
                    activityRows[i].height(currentTallest);
                }
                console.log("Row finished! \n\nTallest element was: " + currentTallest + "px\n" + "Smallest element was: " + currentTallest + "px");
                // Reset the variables for the new row
                activityRows.length = 0; // empty the array
                currentRowStart = topPosition;
                currentTallest = $el.height();
                currentSmallest = $el.height();

                console.log("New row: ");
                console.log("Topposition: " + topPosition);
                activityRows.push($el); // first element

            } else {

                // another div on the current row.  Add it to the list and check if it's taller
                activityRows.push($el); // second and third element
                currentTallest = (currentTallest < $el.height()) ? ($el.height()) : (currentTallest);
                currentSmallest = (currentSmallest > $el.height()) ? ($el.height()) : (currentSmallest);
                console.log("add element");
                console.log(activityRows);
            }
        });

        $(container).each(function () { $(this).css('min-height', currentSmallest); });
    }
}

/**
 * Description
 * @method onResizeEnd
 * @return 
 */
function onResizeEnd() {

    /**
     * Description
     * @method callback
     * @return 
     */
    function callback() {
        console.log("resizing");
        iterateElemets();
    }
    var t;
    $(window).bind('resize', function () {
        t && clearTimeout(t);
        t = setTimeout(callback(), 100);
    });
};/*
 * Name:        Font Changer
 * Version:     1.0.0
 * Creator:     SMARTPAGE.dk
 * Author:      nn@smartpage.dk
 * Source:      github.com/
 * Description: jQuery Plugin for easy implementation of a "increase/decrease font" functionality
 * 
 * Usage: Add functionality to a html element by attaching one of the three functions mentioned below.
 *  - Increase font:  $(elm).increaseFont();
 *  - Decrease font:  $(elm).decreaseFont();
 *  - Reset font:  $(elm).resetFont();
 *    
 *   The default target (container for the font to change) is the class: "resizable-text"
 */

(function ($) {

    /* 
     * Defining "locally-global" elements  :) 
     * This ensures that the three functions will use the 
     * same element as targetTextPlaceholder 
     * - if the user doesnt change it on purpose
     */
    var $defaultTarget = $(".js-resizable-text"),
        $defaultSize = $defaultTarget.css("font-size"),
        $maxSize = 18,
        $minSize = 8;

    /**
     * IncreaseFont adds a listener to <code>this</code> element 
     * and if clicked, it sets the font to font + 2 until the
     * maximum fontsize is reached.
     * @method increaseFont
     * @param {} opts
     * @return ThisExpression
     */
    $.fn.increaseFont = function (opts) {

        // Default settings 
        var defaultSettings = $.extend({
            targetTextPlaceholder: $defaultTarget,
            maxFontSize: $maxSize,
            normalFontSize: $defaultSize
        }, opts);

        // onClickListener
        $(this).click(function (e) {
            e.preventDefault();
            var currentSize = parseInt(defaultSettings.targetTextPlaceholder.css('font-size')) + 2;
            var maxFontSizeInt = parseInt(defaultSettings.maxFontSize);
            if (currentSize <= maxFontSizeInt) {
                defaultSettings.targetTextPlaceholder.css('font-size', currentSize);

                logFontSize(currentSize);
            }
        });

        return this;
    } // End increaseFont()

    /**
     * Description
     * @method resetFont
     * @param {} opts
     * @return ThisExpression
     */
    $.fn.resetFont = function (opts) {

        // Default settings 
        var defaultSettings = $.extend({
            targetTextPlaceholder: $defaultTarget,
            normalFontSize: $defaultSize
        }, opts);

        // onClickListener
        $(this).click(function (e) {
            e.preventDefault();
            defaultSettings.targetTextPlaceholder.css('font-size', parseInt(defaultSettings.normalFontSize));

            logFontSize(parseInt(defaultSettings.normalFontSize));
        });

        return this;

    } // End reserFont()


    /**
     * DecreaseFont adds a listener to <code>this</code> element 
     * and if clicked, it sets the font to font - 2 until the
     * minimum fontsize is reached.
     * @method decreaseFont
     * @param {} opts
     * @return ThisExpression
     */
    $.fn.decreaseFont = function (opts) {

        // Default settings 
        var defaultSettings = $.extend({
            targetTextPlaceholder: $defaultTarget,
            minFontSize: $minSize,
            normalFontSize: $defaultSize
        }, opts);

        // onClickListener
        $(this).click(function (e) {
            e.preventDefault();
            var currentSize = parseInt(defaultSettings.targetTextPlaceholder.css('font-size')) - 2;
            var minFontSizeInt = parseInt(defaultSettings.minFontSize);
            if (currentSize >= minFontSizeInt) {
                defaultSettings.targetTextPlaceholder.css('font-size', currentSize);

                logFontSize(currentSize);
            }
        });

        return this;

    } // End decreaseFont()

    /**
     * Debugging purpose 
     * @method logFontSize
     * @param {} newSize
     * @return 
     */
    function logFontSize(newSize) {
        //console.log("New font-size: " + newSize);
    }
}(jQuery));

;

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
function addTimedEvent (evnt, delay, el, callback) {
    var t;
    $(el).bind(evnt, function (delay) {
        t && clearTimeout(t);
        t = setTimeout(callback, delay);
    });
}

;/**
 * AddYtPlayerTo adds an makes a quick switch of <code>element</code> and 
 * a YT.Player, fetching the YouTube Player API and loads the video. 
 * This is done asynchronously.
 *                               A list (of e.g. search results is also supported and 
 *                               may be implemented here at some point)
 * @see The YouTube Player API V3: https://developers.google.com/youtube/v3
 * @method addYtPlayerTo
 * @param {} elementID
 * @param {} videoID
 * @param {} width
 * @param {} height
 * @return 
 */
function addYtPlayerTo(elementID, videoID, width, height) {
    // Load the IFrame Player API code asynchronously.
    var tag = document.createElement('script');
    tag.src = "https://www.youtube.com/player_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    // Replace the 'ytplayer' element with an <iframe> and 
    // YouTube player after the API code downloads.
    var player;
    /**
     * Description
     * @method onYouTubePlayerAPIReady
     * @return 
     */
    function onYouTubePlayerAPIReady() {
        player = new YT.Player(elementID, {
            height: height,
            width: width,
            videoId: videoID
        });
    }
};
/**
 * -------------------------------------------------------------------- 
 * JQuery Plugin: "EqualHeights" & "EqualWidths"
 * by:	Scott Jehl, Todd Parker, Maggie Costello Wachs (http://www.filamentgroup.com)
 * Copyright (c) 2007 Filament Group
 * Licensed under GPL (http://www.opensource.org/licenses/gpl-license.php)
 * Description: Compares the heights or widths of the top-level children of a provided element 
 * and sets their min-height to the tallest height (or width to widest width). Sets in em units 
 * by default if pxToEm() method is available.
 * Dependencies: jQuery library, pxToEm method	(article: http://www.filamentgroup.com/lab/retaining_scalable_interfaces_with_pixel_to_em_conversion/)							  
 * Usage Example: $(element).equalHeights();
 * Optional: to set min-height in px, pass a true argument: $(element).equalHeights(true);
 * Version: 2.0, 07.24.2008
 * Changelog:
 *  08.02.2007 initial Version 1.0
 *  07.24.2008 v 2.0 - added support for widths
 * --------------------------------------------------------------------
 * @method equalHeights
 * @param {} px
 * @return ThisExpression
 */
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
/**
 * Description
 * @method equalWidths
 * @param {} px
 * @return ThisExpression
 */
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
};;/*-------------------------------------------------------------------- 
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

Number.prototype.pxToEm = 
/**
  * Description
  * @method pxToEm
  * @param {} settings
  * @return result
  */
 String.prototype.pxToEm = function (settings) {
    //set defaults
    settings = jQuery.extend({
        scope: 'body',
        reverse: false
    }, settings);

    var pxVal = (this == '') ? 0 : parseFloat(this);
    var scopeVal;
    /**
     * Description
     * @method getWindowWidth
     * @return LogicalExpression
     */
    var getWindowWidth = function () {
        var de = document.documentElement;
        return self.innerWidth || (de && de.clientWidth) || document.body.clientWidth;
    };

    /* When a percentage-based font-size is set on the body, IE returns that percent of the window width as the font-size. 
		For example, if the body font-size is 62.5% and the window width is 1000px, IE will return 625px as the font-size. 	
		When this happens, we calculate the correct body font-size (%) and multiply it by 16 (the standard browser font size) 
		to get an accurate em value. */

    if (settings.scope == 'body' && $.browser.msie && (parseFloat($('body').css('font-size')) / getWindowWidth()).toFixed(1) > 0.0) {
        /**
         * Description
         * @method calcFontSize
         * @return BinaryExpression
         */
        var calcFontSize = function () {
            return (parseFloat($('body').css('font-size')) / getWindowWidth()).toFixed(3) * 16;
        };
        scopeVal = calcFontSize();
    }
    else { scopeVal = parseFloat(jQuery(settings.scope).css("font-size")); };

    var result = (settings.reverse == true) ? (pxVal * scopeVal).toFixed(2) + 'px' : (pxVal / scopeVal).toFixed(2) + 'em';
    return result;
};
