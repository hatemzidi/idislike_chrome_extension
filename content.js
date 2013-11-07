// ==UserScript==
// @name Emoticons
// @include http://*
// @include https://*
// ==/UserScript==

var myid = chrome.i18n.getMessage("@@extension_id");

var style = document.createElement('link');
style.rel = 'stylesheet';
style.type = 'text/css';
style.href = chrome.extension.getURL('res/style.css');
document.head.appendChild(style);



// Fix cam btn on profile
$(".timelineUnitContainer .UFIPhotoAttachLinkWrapper").css("top", "-26px");

$(".timelineUnitContainer .UFIPhotoAttachLinkWrapper").css("margin-bottom", "0px");

var thumbdown_s = "chrome-extension://" + myid + "/res/dislikeicon_s.png";
var thumbdown = "chrome-extension://" + myid + "/res/dislikeicon.png";


/*var extension_css = ".timeline_comment {" +
    "cursor: pointer;" +
    "width: 44px;" +
    "height: 16px;" +
    "background: url(chrome-extension://bafjpcgfbnapdlicafmjdkkljhmfoghl/res/keyboard_icon.gif);" +
    "float: right;" +
    "margin-bottom: -20px;" +
    "top: -24px;" +
    "position: relative;" +
    "background-image: url(" + thumbdown_s + ");" +
    "background-repeat: no-repeat;" +
    "background-size: auto;" +
    "background-position: 0px 1px;" +
    "border: 1px solid transparent;" +
    "border-top: none;" +
    "position: relative;" +
    "z-index: 1;" +
    "padding-right: 2px;" +
    "}";

$('body').append('<p>test</p>');*/

if (window.location.hostname.indexOf("facebook") > -1) {
    find_text_elems();
    var ii = setInterval(find_text_elems, 2000);
}

function find_text_elems() {
    var $text_elems = $(".textBoxContainer").parent();
    $text_elems.each(function () {
        if ($(this).find(".keyboard_item").length == 0) {

            var $name = '<div class="keyboard_item" class="timeline_comment"></div>';
            var $keyboard_item = $($name);
            //$(this).find(".UFIPhotoAttachLinkWrapper").after($keyboard_item);
            $(this).append($keyboard_item);
            $keyboard_item.click(showKeyboard);
        }
    });

    // find status boxes
    var $buttonWrap = $('<div class="lfloat" id="stats_keyboard"><a class="_1dsq _4_nu" href="#" role="button"></a></div>');

    var $elem = $("._52lb.lfloat");

    if ($elem.find(".status_keyboard").length > 0) {
        return;
    } else {
        var $keyboard_icon = $('<div class="keyboard_item status_keyboard" ktarget="status" style="cursor:pointer; width: 18px; height:27px; background: url(chrome-extension://bafjpcgfbnapdlicafmjdkkljhmfoghl/res/keyboard_icon.gif);float: right;margin-bottom: 10px;top: 2px;position: relative;background-image: url(' + thumbdown + ');background-repeat:no-repeat;background-size:auto;background-position:0px 7px;border:1px solid transparent;border-top:none;position:relative;z-index:1;padding-right: 5px;"></div>');
        var $keyboard_item = $buttonWrap.clone();
        $keyboard_icon.appendTo($keyboard_item.find("a"));

        $elem.find("div:first").append($keyboard_item);

        $keyboard_item.click(showKeyboard);
    }
}


function showKeyboard(event) {
    var $active_textarea;

    $k_item = $(event.target);
    var isStatus = $k_item.attr("ktarget") == "status";

    if (isStatus) {
        $active_textarea = $(".composerTypeahead").find("textarea");
    } else {
        $active_textarea = $k_item.parents(".UFIImageBlockContent").find("textarea");
    }

    $active_textarea.focus();

    // $active_textarea.find("input[name=add_comment_text]").val('aaaa');
    insertAtCursor(document.activeElement, ' 👎 ');
}

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
