// ==UserScript==
// @name Emoticons
// @include http://*
// @include https://*
// ==/UserScript==

var myid = chrome.i18n.getMessage("@@extension_id");


// Fix cam button position
$(".timelineUnitContainer .UFIPhotoAttachLinkWrapper").css("top", "-26px");
$(".timelineUnitContainer .UFIPhotoAttachLinkWrapper").css("margin-bottom", "0px");

var thumbdown16 = "chrome-extension://" + myid + "/images/dislikeicon16.png";
//var thumbdown24 = "chrome-extension://" + myid + "/images/dislikeicon24.png";
//var thumbdown32 = "chrome-extension://" + myid + "/images/dislikeicon32.png";

var dislikehtml_comment_timeline = "<div class='keyboard_item comment_timeline ' style='" +
    "cursor:pointer;" +
    "width:14px;" +
    "height:16px;" +
    "float:right;" +
    "margin-bottom:-20px;" +
    "top:-24px;" +
    "border:1px solid rgba(0,0,0,0);" +
    "border-top:none;" +
    "position:relative;" +
    "z-index:1;" +
    "padding-right:2px;" +
    "background:url(" + thumbdown16 + ") no-repeat 0 1px;" +
    "'></div>";

var dislikehtml_comment_pages = "<div class='keyboard_item comment_pages ' style='" +
    "cursor:pointer;" +
    "width:15px;" +
    "height:21px;" +
    "float:right;" +
    "margin-bottom:-20px;" +
    "top:-24px;" +
    "border:1px solid rgba(0,0,0,0);" +
    "border-top:none;" +
    "position:relative;" +
    "z-index:1;" +
    "background:url(" + thumbdown16 + ") no-repeat 0 6px;" +
    "'></div>";

var dislikehtml_comment_newsfeed = "<div class='keyboard_item comment_newsfeed' style='" +
    "cursor:pointer;" +
    "width:17px;" +
    "height:21px;" +
    "float:right;" +
    "margin-bottom:-20px;" +
    "top:-24px;" +
    "border:1px solid rgba(0,0,0,0);" +
    "border-top:none;" +
    "position:relative;" +
    "z-index:1;" +
    "background:url(" + thumbdown16 + ") no-repeat 0 6px;" +
    "'></div>";

var dislikehtml_comment_signle_newsfeed = "<div class='keyboard_item comment_single_newsfeed' style='" +
    "cursor:pointer;" +
    "width:13px;" +
    "height:21px;" +
    "float:right;" +
    "margin-bottom:-20px;" +
    "top:-24px;" +
    "border:1px solid rgba(0,0,0,0);" +
    "border-top:none;" +
    "position:relative;" +
    "z-index:1;" +
    "padding-right:2px;" +
    "background:url(" + thumbdown16 + ") no-repeat 0 6px;" +
    "'></div>";

var dislikehtml_comment_photofeedback = "<div class='keyboard_item comment_photofeedback' style='" +
    "cursor:pointer;" +
    "width:15px;" +
    "height:21px;" +
    "float:right;" +
    "margin-bottom:-20px;" +
    "top:-24px;" +
    "border:1px solid rgba(0,0,0,0);" +
    "border-top:none;" +
    "position:relative;" +
    "z-index:1;" +
    "background:url(" + thumbdown16 + ") no-repeat 0 6px;" +
    "'></div>";

var dislikehtml_comment_photomodal = "<div class='keyboard_item comment_photomodal' style='" +
    "cursor:pointer;" +
    "width:13px;" +
    "height:21px;" +
    "float:right;" +
    "margin-bottom:-20px;" +
    "top:-24px;" +
    "border:1px solid rgba(0,0,0,0);" +
    "border-top:none;" +
    "position:relative;" +
    "z-index:1;" +
    "padding-right:2px;" +
    "background:url(" + thumbdown16 + ") no-repeat 0 6px;" +
    "'></div>";

var dislikehtml_status_timeline = '<div class="keyboard_item status_keyboard status_timeline" ktarget="status" style="' +
    "cursor:pointer;" +
    "width:33px;" +
    "height:27px;" +
    "float:right;" +
    "margin-bottom:10px;" +
    "top:2px;" +
    "border:1px solid rgba(0,0,0,0);" +
    "border-top:none;" +
    "position:relative;" +
    "z-index:1;" +
    "padding-right:5px;" +
    "background:url(" + thumbdown16 + ") no-repeat 11px 11px;" +
    '"></div>';

var dislikehtml_status_newsfeed = '<div class="keyboard_item status_keyboard status_newsfeed" ktarget="status" style="' +
    "cursor:pointer;" +
    "width:22px;" +
    "height:27px;" +
    "float:right;" +
    "margin-bottom:10px;" +
    "top:2px;" +
    "border:1px solid rgba(0,0,0,0);" +
    "border-top:none;" +
    "position:relative;" +
    "z-index:1;" +
    "padding-right:5px;" +
    "background:url(" + thumbdown16 + ") no-repeat 6px 7px;" +
    '"></div>';

var dislikehtml_status_pages = '<div class="keyboard_item status_keyboard status_newsfeed" ktarget="status" style="' +
    "cursor:pointer;" +
    "width:22px;" +
    "height:27px;" +
    "float:right;" +
    "margin-bottom:10px;" +
    "top:2px;" +
    "border:1px solid rgba(0,0,0,0);" +
    "border-top:none;" +
    "position:relative;" +
    "z-index:1;" +
    "padding-right:5px;" +
    "background:url(" + thumbdown16 + ") no-repeat 6px 7px;" +
    '"></div>';


if (window.location.hostname.indexOf("facebook") > -1) {
    find_text_elems();
    var ii = setInterval(find_text_elems, 2000);
}

function find_text_elems() {

    var $comment = $(".textBoxContainer").parent();
    var $comment_timeline = $comment.parents(".fbTimelineUFI.uiCommentContainer");
    var $comment_newsfeed = $comment.parents("div[id^='topnews_main_stream']");
    var $comment_pages = $comment.parents("ol.fbTimelineCapsule");
    var $comment_signle_newsfeed = $comment.parents(".fbTimelineUFI:not(.uiCommentContainer)");
    var $comment_photofeedback = $comment.parents(".fbPhotosPhotoFeedback");
    var $comment_photomodal = $comment.parents("form.fbPhotosSnowliftFeedbackForm");

    var direction = $('body').css('direction');

    $comment.each(function () {
        if ($(this).find(".keyboard_item").length == 0) {

            var $selector = "", $keyboard_item;

            if ($comment_timeline.length > 0) {
                $selector = dislikehtml_comment_timeline;
            }

            if ($comment_newsfeed.length > 0) {
                $selector = dislikehtml_comment_newsfeed;
            }

            if ($comment_pages.length > 0) {
                $selector = dislikehtml_comment_pages;
            }

            if ($comment_signle_newsfeed.length > 0) {
                $selector = dislikehtml_comment_signle_newsfeed;
            }

            if ($comment_photofeedback.length > 0) {
                $selector = dislikehtml_comment_photofeedback;
            }

            if ($comment_photomodal.length > 0) {
                $selector = dislikehtml_comment_photomodal;
            }

            if ($selector != "") {
                $keyboard_item = $($selector);
                // well ... just fixing the rtl pages (arabic, hebrew ... whatever from right to left)
                if (direction == "rtl") {
                    $keyboard_item.css('float', 'left');
                    if ($comment_timeline.length > 0) {
                        $keyboard_item.css('background-position', '31px 1px');
                    }
                }

                $(this).append($keyboard_item);
                $keyboard_item.click(injectDislike);
            }
        }
    });

    // find status boxes in time line/newsfeed
    var $buttonWrap = $('<div class="lfloat" id="stats_keyboard"><a class="_1dsq _4_nu" href="#" role="button"></a></div>');
    var $elem = $("._52lb.lfloat")
    var $elem_timeline = $elem.parents("div._1dsp._4-");
    var $elem_newsfeed = $elem.parents("div._1dsp:not(:has(._4-))");
    var $elem_pages = $elem.parents("div.groupComposerCleanWrap");
    var $selector = ""; //rest me

    if ($elem.find(".status_keyboard").length > 0) {
        return;
    } else {
        if ($elem_timeline.length > 0) {
            $selector = dislikehtml_status_timeline;
        } else if ($elem_newsfeed.length > 0) {
            $selector = dislikehtml_status_newsfeed;
        }

        if ($elem_pages.length > 0) {
            $selector = dislikehtml_status_pages;
        }


        if ($selector != "") {
            var $keyboard_icon = $($selector);
            var $keyboard_item = $buttonWrap.clone();
            $keyboard_icon.appendTo($keyboard_item.find("a"));

            $elem.find("div:first").append($keyboard_item);

            $keyboard_item.click(injectDislike);
        }
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

    // $active_textarea.find("input[name=add_comment_text]").val('aaaa');
    insertAtCursor(document.activeElement, ' 👎 ');
    updateCounter($k_item.parent());
}

//TODO : make this jquery compliant
function insertAtCursor(myField, myValue) {
    if (document.selection) {
        myField.focus();
        sel = document.selection.createRange();
        sel.text = myValue;
    }
    else if (myField.selectionStart || myField.selectionStart == '0') {
        var startPos = myField.selectionStart;
        var endPos = myField.selectionEnd;
        myField.value = myField.value.substring(0, startPos) + myValue + myField.value.substring(endPos, myField.value.length);
        myField.selectionStart = startPos + myValue.length;
        myField.selectionEnd = startPos + myValue.length;
    }
    else {
        myField.value += myValue;
    }
}


function updateCounter(item) {
    item.append('<img src="http://idislike.hatemzidi.com/update.php"/>')
}

function countDislikes(item) {
//TODO
}