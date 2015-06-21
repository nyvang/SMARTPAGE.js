/**
 * AddYtPlayerTo adds an makes a quick switch of <code>element</code> and 
 * a YT.Player, fetching the YouTube Player API and loads the video. 
 * This is done asynchronously.
 * @see The YouTube Player API V3: https://developers.google.com/youtube/v3
 * 
 * @param [string] elementID   - The element (preferably a div) replaced by an iFrame with the player
 * @param [string] videoID     - The id (hash) of the video which is to be played. 
 *                               A list (of e.g. search results is also supported and 
 *                               may be implemented here at some point)
 * @param [string] width       - The width of the iFrame player 
 * @param [string] height      - The height of the iFrame player 
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
    function onYouTubePlayerAPIReady() {
        player = new YT.Player(elementID, {
            height: height,
            width: width,
            videoId: videoID
        });
    }
}