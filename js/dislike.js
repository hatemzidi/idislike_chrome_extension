/*
 👎
 THUMBS DOWN SIGN
 Unicode: U+1F44E (U+D83D U+DC4E), UTF-8: F0 9F 91 8E
 */

var myid = chrome.i18n.getMessage("@@extension_id");
// well ... just fixing the rtl pages (arabic, hebrew ... whatever from right to left)
var direction = $('body').css('direction');

function iDislike() {

    var dslkr = this;
    var dslkrId = 0;

    this.addThumb = function () {

        $('textarea[name="add_comment_text_text"],' +
            '.shareInput, ' +
            'textarea[name="add_comment_text"],' +
            'textarea[name="xhpc_message_text"], ' +
            'textarea[name="xhpc_message"], ' +
            '.UFIAddCommentInput'
        ).not('[data-dslkr-status]').each(function () {
                $(this).attr('data-dslkr-status', 1);

                var inputContainer = $(this).parents('.UFIInputContainer');

                if ($(inputContainer).length === 0) {
                    inputContainer = $(this).parent();
                }

                /*if ($('.mogToggler', inputContainer).length > 0 || $('.UFICommentStickerButton', inputContainer).length > 0) {
                 // Here is Facebook toggler
                 return;
                 }*/

                var $dslkrBttn = $('<div class="dslkr_container" aria-label="dslkr">' +
                '<i class="dislike_thumb thumb16"></i>' +
                '</div>');

                $dslkrBttn.attr('id', 'dslkr' + (dslkrId++));
                $(inputContainer).css('position', 'relative');


                if ($(this).hasClass('UFIAddCommentInput')) {
                    $dslkrBttn.css('margin-bottom', $(this).css('padding-bottom'));
                }

                $(inputContainer).append($dslkrBttn);
                $dslkrBttn.on('click', dslkr.insertEmoticon);
            });

        //find chat boxes, if they aren't yet done.
        var $emoticonsPanel = $('.emoticonsPanel').parent(':not([data-dslkr-status])');

        $emoticonsPanel.each(function () {
            dslkr.addThumbToChatBox($(this));
        });
    };


    this.addThumbToChatBox = function ($emoticonPanel) {
        var $dslkrBttn;

        var padding = direction == "rtl" ? "padding-left" : "padding-right";
        $emoticonPanel.parents(".fbNubFlyoutFooter").find('div:first').css(padding, "75px");

        $dslkrBttn = $("<div class='chatbox' >" +
        "<i class='dislike_thumb thumb16' ktarget='chatbox'></i>" +
        "</div>");

        $emoticonPanel.append($dslkrBttn);
        $dslkrBttn.on('click', dslkr.insertEmoticon);
        $emoticonPanel.attr('data-dslkr-status', 1);
    };

    this.insertEmoticon = function (e) {
        var textInput = dslkr.findTextInput(e.target);

        textInput.focus();

        var ev = document.createEvent('TextEvent');
        ev.initTextEvent('textInput', true, true, null, ' \uD83D\uDC4E ', 9, 'en-US');

        setTimeout(function () {
            textInput.dispatchEvent(ev);
        }, 55);
    };

    this.findTextInput = function (dslkrEl) {
        var $inputEl, wrapperEl;
        var positioner = $(dslkrEl).parents('[data-ownerid]');


        if ($(positioner).length > 0) {
            var ownerid = $(positioner).data('ownerid');
            wrapperEl = $('#' + ownerid).parent();
        }
        else {
            wrapperEl = $(dslkrEl).parent();
        }

        // Search for wrapper
        while (wrapperEl && wrapperEl !== document) {

            var commInput = $('.UFIAddCommentInput', wrapperEl).not('[data-fse-clicked]');

            if ($(commInput).length > 0) {
                // Trigger click on '.UFIAddCommentInput' to enable [contenteditable]
                $(commInput).click();
                $(commInput).attr('data-fse-clicked', 1);
            }

            if ($('textarea', wrapperEl).length > 0) {
                $inputEl = $('textarea', wrapperEl)[0];
                break;
            }

            if ($('div[contenteditable]', wrapperEl).length > 0) {
                $inputEl = $('div[contenteditable]', wrapperEl)[0];
                break;
            }

            if ($('.UFICommentContainer', wrapperEl).length > 0) {
                break; // Can't find text input
            }

            wrapperEl = $(wrapperEl).parent();
        }

        return $inputEl;
    };


}