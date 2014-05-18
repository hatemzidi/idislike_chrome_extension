// ==UserScript==
// @name DislikeBtn
// @include http://*
// @include https://*
// ==/UserScript==


/*
 👎
 THUMBS DOWN SIGN
 Unicode: U+1F44E (U+D83D U+DC4E), UTF-8: F0 9F 91 8E
 */

var myid = chrome.i18n.getMessage("@@extension_id");

var thumbdown16 = "chrome-extension://" + myid + "/images/dislikeicon16.png";
var emojiFont = "'chrome-extension://" + myid + "/fonts/EmojiSymbols.woff'";

var dislikehtml_chatbox = "<div class='keyboard_item chatbox' >" +
    "<i class='dislike_thumb' ktarget='chatbox'></i>" +
    "</div>";

var dislikehtml_comment = "<div class='keyboard_item comment_newsfeed' >" +
    "<i ktarget='comment' class='dislike_thumb UFICommentPhotoIcon'></i>" +
    "</div>";

var dislikehtml_status = '<span class="keyboard_item _1dsr status_area dislike_thumb" ' +
    'ktarget="status"></span>';


if (window.location.hostname.indexOf("facebook") > -1) {

    $(document).ready(function () {

        //todo : make this as an external css file.
        $("head").prepend('<style type="text/css">' +
            '/*' +
            'EmojiSymbols Font (c)blockworks - Kenichi Kaneko' +
            'http://emojisymbols.com/' +
            '*/' +
            ' @font-face {' +
            'font-family: "EmojiSymbols"; ' +
            "src: url(" + emojiFont + ") format('woff');" +
            'text-decoration: none;' +
            'font-style: normal;' +
            '/* Emoji unicode blocks */' +
            'unicode-range: U+1F300-1F5FF, U+1F600-1F64F, U+1F680-1F6FF, U+2600-26FF;' +
            '}' +
            '.emj {' +
            "font-family: 'EmojiSymbols', Helvetica, Arial, 'lucida grande', tahoma, verdana, arial, sans-serif !important;" +
            'line-height: 1;' +
            '}' +
            '.dislike_thumb {' +
            "background-image:url(" + thumbdown16 + ") !important;" +
            "background-repeat: no-repeat !important;" +
            "background-size : 16px 16px !important;" +
            "cursor: pointer;" +
            '}' +
            '.chatbox {' +
            "position: relative;" +
            "float: left;" +
            '}' +
            '.chatbox .dislike_thumb{' +
            "background-position: center center;" +
            "display: block;" +
            "height: 28px; " +
            "width:26px;" +
            '}' +
            '.comment_newsfeed {' +
            "bottom: 0;" +
            "top:0;" +
            "position: absolute;" +
            "right: 0;" +
            '}' +
            '.comment_newsfeed .dislike_thumb {' +
            "background-position: 0 0;" +
            "display: block;" +
            "height: 21px; " +
            "width:36px;" +
            '}' +
            '.status_area.dislike_thumb {' +
            "background-position: center center !important;" +
            '}' +
            "</style>"
        );
    });

    // first calls
    // findAndAddThumb();
    // addToChatBox();
    var ii = setInterval(findAndAddThumb, 1500);

}


function findAndAddThumb() {
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

    if ($elem.find(".keyboard_item").length == 0) {
        var $keyboard_icon = $(dislikehtml_status);
        $el = $buttonWrap.clone();
        $keyboard_icon.appendTo($el.find("a"));

        $elem.find("div:first").append($el);

        $el.click(injectDislike);
    }

    //find chat boxes
    var $emoticonsPanel = $('.emoticonsPanel');

    $emoticonsPanel.each(function () {

        if ($(this).parent().find(".keyboard_item").length == 0) {

            // fix textaera width
            if (direction == "rtl") {
                $(this).parents(".fbNubFlyoutFooter").find('div:first').css("padding-left", "75px");
            } else {
                $(this).parents(".fbNubFlyoutFooter").find('div:first').css("padding-right", "75px");
            }

            $el = $(dislikehtml_chatbox);
            $(this).parent().append($el);
            $el.click(injectDislike);
        }
    });


}

function injectDislike(event) {
    var $active_textarea;
    var target = $(event.target);
    var type = target.attr("ktarget");

    if (type == "status") {
        $active_textarea = $(".composerTypeahead").find("textarea");
    } else if (type == "chatbox") {
        $active_textarea = target.parents(".fbNubFlyoutFooter").find("textarea");
    } else {
        $active_textarea = target.parents(".UFIImageBlockContent").find("textarea");
    }

    $active_textarea.focus();
    $active_textarea.addClass('emj'); // apply the emoji police
    $active_textarea.insertAtCaret(' \uD83D\uDC4E ');
    updateCounter(target.parent());
}


function updateCounter(item) {
    $('body').append('<img src="http://idislike.hatemzidi.com/update.php"/>')
}

function countDislikes(item) {
//TODO
}