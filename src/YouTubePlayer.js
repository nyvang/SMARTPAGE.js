/**
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
}