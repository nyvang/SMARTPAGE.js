

/**
 * addTimedEvent
 * Add an eventListener to the <code>element</code> and specify a <code>delay</code> in ms
 * The eventlistener is delayed before it fires. This is useful for events that fire
 * alot, and where only a single or two is needed. 
 * Like <code>resize-</code> or <code>scroll-events</code>
 * 
 * @param [string]  eName       - the name/type of the event to listen for. e.g. resize or scroll
 * @param [int]     delay       - the delay to postpone the event. Default: 100ms
 * @param [object]  elm         - the (jQuery)element, on which to attach the eventListener 
 * @param [string]  callback    - the name of the function to call upon fireing the event
 * 
 */
function addTimedEvent (evnt, delay, el, callback) {
    var t;
    $(el).bind(evnt, function (delay) {
        t && clearTimeout(t);
        t = setTimeout(callback, delay);
    });
}

