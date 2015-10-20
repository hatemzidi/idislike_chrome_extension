/*
 👎
 THUMBS DOWN SIGN
 Unicode: U+1F44E (U+D83D U+DC4E), UTF-8: F0 9F 91 8E
 */

var myid = chrome.i18n.getMessage("@@extension_id");


function iDislike() {

    var me = this;
    var dslkrId = 0;

    this.addThumbs = function () {
        me.addThumbToComments();
        /*
         * TODO : fix this
         me.addThumbToChatBoxes();
         */

    };

    this.addThumbToComments = function () {
        //find input fields, if they aren't yet done.
        $('textarea[name="add_comment_text_text"],' +
            '.shareInput, ' +
            'textarea[name="add_comment_text"],' +
            'textarea[name="xhpc_message_text"], ' +
            'textarea[name="xhpc_message"], ' +
            '.UFIAddCommentInput'
        ).not('[data-dslkr-status]').each(function () {
                me.addThumbToComment($(this));
            });

    };

    this.addThumbToComment = function ($el) {
        // mark as visited
        $el.attr('data-dslkr-status', 1);

        var inputContainer = $el.parents('.UFIInputContainer');

        if ($(inputContainer).length === 0) {
            inputContainer = $el.parent();
        }

        var $dslkrBttn = $('<div class="dslkr_container" ' +
            'aria-label="Dislike" data-hover="tooltip" data-tooltip-alignh="center"' + //tooltip
            '>' +
            '<i class="dislike_thumb thumb16"></i>' +
            '</div>');

        $dslkrBttn.attr('id', 'dslkr' + (dslkrId++));


        if ($el.hasClass('UFIAddCommentInput')) {
            $dslkrBttn.css('margin-bottom', $el.css('padding-bottom'));
        }

        $(inputContainer).append($dslkrBttn);
        $dslkrBttn.on('click', me.insertEmoticon);
    };


    this.addThumbToChatBoxes = function () {
        //find chat boxes, if they aren't yet done.
        var $emoticonsPanel = $('.emoticonsPanel').parent(':not([data-dslkr-status])');

        $emoticonsPanel.each(function () {
            me.addThumbToChatBox($(this));
        });
    };

    this.addThumbToChatBox = function ($emoticonPanel) {
        var $dslkrBttn;

        $dslkrBttn = $('<div class="chatbox" ' +
            'aria-label="Dislike" data-hover="tooltip" data-tooltip-alignh="center"' + //tooltip
            '>' +
            '<i class="dislike_thumb thumb16"></i>' +
            '</div>');

        $dslkrBttn.attr('id', 'dslkr' + (dslkrId++));

        $emoticonPanel.append($dslkrBttn);
        $dslkrBttn.on('click', me.insertEmoticon);
        $emoticonPanel.attr('data-dslkr-status', 1);
    };

    this.insertEmoticon = function (e) {
        var inputField = me.findInputField(e.target);

        inputField.focus();

        var ev = document.createEvent('TextEvent');
        ev.initTextEvent('textInput', true, true, null, ' \uD83D\uDC4E ', 9, 'en-US');

        me.updateCounter();

        setTimeout(function () {
            inputField.dispatchEvent(ev);
        }, 55);
    };

    this.findInputField = function (dslkrEl) {
        var $inputEl, wrapperEl;

        wrapperEl = $(dslkrEl).parent();

        // Search for wrapper
        while (wrapperEl && wrapperEl !== document) {

            var commInput = $('.UFIAddCommentInput', wrapperEl).not('[data-dslkr-clicked]');

            if ($(commInput).length > 0) {
                // Trigger click on '.UFIAddCommentInput' to enable [contenteditable]
                $(commInput).click();
                $(commInput).attr('data-dslkr-clicked', 1);
                $('.UFIAddCommentInput', wrapperEl).addClass('emj'); // apply the emoji police 
            }                                                        //todo : apply only with old browsers

            if ($('textarea', wrapperEl).length > 0) {
                $inputEl = $('textarea', wrapperEl)[0];
                $($inputEl).addClass('emj'); // apply the emoji police
                                             //todo : apply only with old browsers
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

    // this is just a counter, no data are stored
    this.updateCounter = function (item) {
        // item may be used to distinguish between types : chatbox, status, comments ....
        $('body').append('<img src="http://idislike.hatemzidi.com/update.php?r=fb"/>')
    };

}