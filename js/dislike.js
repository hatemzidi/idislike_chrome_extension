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
// well ... just fixing the rtl pages (arabic, hebrew ... whatever from right to left)
var direction = $('body').css('direction');

var dislikehtml_chatbox = "<div class='chatbox' >" +
    "<i class='dislike_thumb' ktarget='chatbox'></i>" +
    "</div>";

var dislikehtml_comment = "<div class='comment_newsfeed' >" +
    "<i ktarget='comment' class='dislike_thumb UFICommentPhotoIcon'></i>" +
    "</div>";

var dislikehtml_status = '<div class="lfloat" id="dislikeBttn"><a class="_1dsq _4_nu" ' +
    'href="#"><span class="_done _1dsr status_area dislike_thumb" ' +
    'ktarget="status"></span></a></div>';


if (window.location.hostname.indexOf("facebook") > -1) {
    // first calls
    setTimeout(function () {
        init();
        findAndAddThumb();
    }, 1000);

    i = setInterval(findAndAddThumb, 1500);
}

function init() {
    //find chat boxes
    //https://github.com/kapetan/jquery-observe
    $('.fbNubGroup.videoCallEnabled')
        .observe('childlist subtree', function (record) {
            if ($(record.addedNodes).is('div.fbNub')) {
                onNewChatBox($(record.addedNodes));
            }
        });
}

function findAndAddThumb() {
    var $el;
    // --------- find comments
    var $commentButtons = $('.UFICommentAttachmentButtons:not(._done)');

    $commentButtons.each(function () {

        var float = direction == "rtl" ? 'left' : 'right';
        $(this).find('.UFIPhotoAttachLinkWrapper').css('float', float);
        $(this).parents(".UFIImageBlockContent").find("textarea").addClass('fix_textarea');
        $(this).css("width", "55px");

        $el = $(dislikehtml_comment);
        $(this).append($el);
        $(this).addClass('_done');

        $el.click(injectDislike);

    });

    // --------- find status boxes
    var $statusButtons = $("._52lb.lfloat");
    $el = $(dislikehtml_status);

    if ($statusButtons.find("._done").length == 0) {
        $statusButtons.find("div:first:not(.lfloat)").append($el);
        $el.click(injectDislike);
    }

    //find chat boxes, if they aren't yet done.
    var $emoticonsPanel = $('.emoticonsPanel').parent(':not(._done)');

    $emoticonsPanel.each(function () {
        addThumbToChatBox($(this));
    });
}

function onNewChatBox($elem) {
    var $emoticonsPanel = $elem.find('.emoticonsPanel').parent(':not(._done)');

    if ($emoticonsPanel.length != 0) {
        addThumbToChatBox($emoticonsPanel);
    }
}

function addThumbToChatBox($emoticonsPanel) {
    var $el;

    var padding = direction == "rtl" ? "padding-left" : "padding-right";
    $emoticonsPanel.parents(".fbNubFlyoutFooter").find('div:first').css(padding, "75px");

    $el = $(dislikehtml_chatbox);
    $emoticonsPanel.append($el);
    $emoticonsPanel.addClass('_done');
    $el.click(injectDislike);
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
    updateCounter();
}


function updateCounter(item) {
    $('body').append('<img src="http://idislike.hatemzidi.com/update.php?r=fb"/>')
}

function countDislikes(item) {
//TODO
}