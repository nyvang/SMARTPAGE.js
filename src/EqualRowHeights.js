
/**
 * The "equalizing module", which is used for setting heights or widths of child-elements
 * 
 * @module EqualizeHeights
 */


/**
* Iterate elements takes some elements on the same row
* (i.e. generated items which spans over several BootStrap rows)
* It measures the distance from the top of the page and groups the ones 
* with the same distance. (i.e. same distance to top === items on the same row)
* After each row is filled with items, some action is done to all items of that row.
* For mobile viwes (<768px) the elements are placed underneath each other (one item on one row)
*
* @method alignChildrenOf
* @param {Object} container The element whoose children should be aligned
*/
function alignChildrenOf(container) {

    // Check for mobile-first
    if ($(".navbar-toggle").is(":visible")) {
        $('.container').css("min-height", ""); // reset height
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
 * Limit events that are often called repeatedly, like resize
 * @method onResizeEnd
 * @return {function} callback that is fired n-milliseconds after the lates ocourrence of the specified event
 */
function onResizeEnd(event) {

    var evt = (event !== "" || event !== 'undefined') ? event : "resize";

    function callback() {
        console.log("resizing");
        alignChildrenOf();
    }
    var t;
    $(window).bind(evt, function () {
        t && clearTimeout(t);
        t = setTimeout(callback(), 100);
    });
}