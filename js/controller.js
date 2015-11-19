/**
 * @author hatem zidi (hatem.zidi@gmail.com)
 */
var dslkr = new iDislike();
var platform = '?';

setInterval(function () {
    dslkr.setPlatform(platform);
    dslkr.addThumbs();
}, 1000); // evry 1 sec


// todo is this the best place ?!
// detect (n) and replace it as thumb
$(document).on('keypress', ".box", function (e) {
    var inputField = $(this);
    var contentEl;

    if (e.target.tagName === "DIV") {
        // use this only on comment
        contentEl = inputField.find('span[data-text]');
    } else {
        // console.log(e.target.tagName + "#"+ e.target.id);
        //  inputField = ;
    }

    var text = contentEl.html();
    var newtext = '';

    var firstAt = typeof text !== 'undefined' ? text.indexOf('(n)') : -1;

    if (e.keyCode === 32 && firstAt > -1) {
        e.data = {origin: 'keyboard'};

        dslkr.insertEmoticon(e);

        newtext = contentEl.html().replace(/\(n\)/g, ""); // clean the content
        contentEl.html(newtext.substring(1)); //todo : here i have a very strange behaviour, a space is added at the begining
    }

});

// messages listener
chrome.extension.onMessage.addListener(
    function (request, sender) {
        platform = request.platform;
    });