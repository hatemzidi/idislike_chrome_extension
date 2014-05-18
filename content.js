// ==UserScript==
// @name Emoticons
// @include http://*
// @include https://*
// ==/UserScript==

var myid = chrome.i18n.getMessage("@@extension_id");

var thumbdown16 = "chrome-extension://" + myid + "/images/dislikeicon16.png";
//var thumbdown24 = "chrome-extension://" + myid + "/images/dislikeicon24.png";
//var thumbdown32 = "chrome-extension://" + myid + "/images/dislikeicon32.png";


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

var dislikehtml_status = '<span class="_1dsr keyboard_item status_keyboard status_timeline" ' +
    'ktarget="status" style="' +
    "cursor:pointer;" +
    "background-image:url(" + thumbdown16 + ");" +
    "background-repeat: no-repeat;" +
    "background-position: center center;" +
    '"></span>';


if (window.location.hostname.indexOf("facebook") > -1) {
    find_text_elems();
    var ii = setInterval(find_text_elems, 2000);
}

function find_text_elems() {
    var $el;

    // --------- find comments
    var $UFICommentAttachmentButtons = $('.UFICommentAttachmentButtons');

    // TODO check for rtl direction :(
    // $UFICommentAttachmentButtons.css("width","50px");

    $UFICommentAttachmentButtons.each(function () {

        if ($(this).find(".keyboard_item").length == 0) {
            $el = $(dislikehtml_comment);

            $(this).append($el);

            $el.click(injectDislike);
        }
    });


    // --------- find status boxes
    var $buttonWrap = $('<div class="lfloat" id="stats_keyboard"><a class="_1dsq _4_nu" href="#" role="button"></a></div>');
    var $elem = $("._52lb.lfloat");

    if ($elem.find(".status_keyboard").length > 0) {
        // already added ! no need to redo this
        return;
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