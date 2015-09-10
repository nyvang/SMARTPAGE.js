/*
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

/**
 * The Font Changer module for jQuery
 * 
 * @module jQueryModule-FontChanger
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

