/**
 * @author hatem zidi (hatem.zidi@gmail.com)
 */
var dslkr = new iDislike();
var platform = '?';

setInterval(function () {
    dslkr.setPlatform(platform);
    dslkr.addThumbs();
}, 1000); // every 1 sec


// detect (n) and replace it as thumb
$(document).on('keypress', ".box", dslkr.replaceEmoticon);

// messages listener to get info about the plateform OS
chrome.extension.onMessage.addListener(
    function (request, sender) {
        platform = request.platform;
    });