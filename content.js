// ==UserScript==
// @name Emoticons
// @include http://*
// @include https://*
// ==/UserScript==

var myid = chrome.i18n.getMessage("@@extension_id");

var thumbdown16 = "chrome-extension://" + myid + "/images/dislikeicon16.png";
var font = "'chrome-extension://" + myid + "/fonts/EmojiSymbols.woff'";

var dislikehtml_comment = "<div class='keyboard_item comment_newsfeed' style='" +
    "bottom: 0;top:0;" +
    "position: absolute;" +
    "right: 0;" +
    "'><i class='dislike_thumb UFICommentPhotoIcon' style ='" +
    "background:url(" + thumbdown16 + ") no-repeat 0 0px;" +
    "display: block;" +
    "height: 21px; width:36px;" +
    "cursor: pointer;" +
    "'></i></div>";

var dislikehtml_status = '<span class="keyboard_item status_timeline _1dsr" ' +
    'ktarget="status" style="' +
    "cursor:pointer;" +
    "background-image:url(" + thumbdown16 + ");" +
    "background-repeat: no-repeat;" +
    "background-position: center center;" +
    "backgound-size : 16px 16px" +
    '"></span>';


if (window.location.hostname.indexOf("facebook") > -1) {

    $(document).ready(function () {

        //todo : make this as an external css file.
        //todo : to add also the style from the HTML elements
        $("head").prepend('<style type="text/css">' +
            '/*' +
            'EmojiSymbols Font (c)blockworks - Kenichi Kaneko' +
            'http://emojisymbols.com/' +
            '*/' +
            ' @font-face {' +
            'font-family: "EmojiSymbols"; ' +
            "src: url(" + font + ") format('woff');" +
            'text-decoration: none;' +
            'font-style: normal;' +
            '/* Emoji unicode blocks */' +
            'unicode-range: U+1F300-1F5FF, U+1F600-1F64F, U+1F680-1F6FF, U+2600-26FF;' +
            '}' +
            '.emj {' +
            "font-family: 'EmojiSymbols', Helvetica, Arial, 'lucida grande', tahoma, verdana, arial, sans-serif !important;" +
            'line-height: 1;' +
            '}' +
            "</style>");
    });

    find_text_elems();
    var ii = setInterval(find_text_elems, 2000);
}


function find_text_elems() {


    var $el;

    // --------- find comments
    var $UFICommentAttachmentButtons = $('.UFICommentAttachmentButtons');

    // well ... just fixing the rtl pages (arabic, hebrew ... whatever from right to left)
    var direction = $('body').css('direction');
    if (direction == "rtl") {
        $UFICommentAttachmentButtons.css("width", "50px");
    }

    $UFICommentAttachmentButtons.each(function () {

        if ($(this).find(".keyboard_item").length == 0) {
            $el = $(dislikehtml_comment);

            $(this).append($el);

            $el.click(injectDislike);
        }
    });


    // --------- find status boxes
    var $buttonWrap = $('<div class="lfloat" id="stats_keyboard"><a class="_1dsq _4_nu" href="#"></a></div>');
    var $elem = $("._52lb.lfloat");

    if ($elem.find(".keyboard_item").length > 0) {
        // already added ! no need to redo this
        return false;
    } else {
        var $keyboard_icon = $(dislikehtml_status);
        $el = $buttonWrap.clone();
        $keyboard_icon.appendTo($el.find("a"));

        $elem.find("div:first").append($el);

        $el.click(injectDislike);
    }


    //find chat boxes
    //TODO :  emoji isn't supported yet by facebook
}

function injectDislike(event) {
    var $active_textarea;
    var $k_item = $(event.target);
    var isStatus = $k_item.attr("ktarget") == "status";

    if (isStatus) {
        $active_textarea = $(".composerTypeahead").find("textarea");
    } else {
        $active_textarea = $k_item.parents(".UFIImageBlockContent").find("textarea");
    }

    $active_textarea.focus();
    $active_textarea.addClass('emj'); // apply the emoji police
    $active_textarea.insertAtCaret(' 👎 ');
    updateCounter($k_item.parent());
}


function updateCounter(item) {
    item.append('<img src="http://idislike.hatemzidi.com/update.php"/>')
}

function countDislikes(item) {
//TODO
}