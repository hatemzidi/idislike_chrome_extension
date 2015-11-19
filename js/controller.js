/**
 * @author hatem zidi (hatem.zidi@gmail.com)
 */
var dslkr = new iDislike();

setInterval(function () {
    dslkr.addThumbs();
}, 800); // evry 0.8 sec


$(document).on('keypress', ".box", function (e) {
    var inputField = $(this);
    var contentEl;

    if (e.target.tagName === "DIV") {
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

