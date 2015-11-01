/*
 👎
 THUMBS DOWN SIGN
 Unicode: U+1F44E (U+D83D U+DC4E), UTF-8: F0 9F 91 8E
 */


function iDislike() {

    var me = this;
    var dslkrId = 0;

    this.addThumbs = function () {
        me.addThumbToComments();
        me.addThumbToChatBoxes();
    };

    this.addThumbToComments = function () {
        //find input fields, if they aren't yet done.
        $('textarea[name="add_comment_text_text"],' +
            'textarea[name="add_comment_text"],' +
            'textarea[name="xhpc_message_text"], ' +
            'textarea[name="xhpc_message"], ' +
            '._5yk2,' +   // status for personal page
            '.shareInput, ' +
                //'.UFIAddCommentInput,' +
            '.UFIInputContainer'
        ).not('[data-dslkr-status]').each(function () {
                me.addThumbToComment($(this));
            });

    };

    this.addThumbToComment = function ($el) {
        // mark as visited
        $el.attr('data-dslkr-status', 1);

        var inputContainer = $el;

        if (!inputContainer.hasClass('UFIInputContainer')) {
            inputContainer = $el.parent();
        }

        var $dslkrBttn = $('<div class="dslkr_container " ' +
            'aria-label="Dislike" data-hover="tooltip" data-tooltip-alignh="center"' + //tooltip
            '>' +
            '<i class="dislike_thumb thumb16"></i>' +
            '</div>');

        $dslkrBttn.attr('id', 'dslkr' + (dslkrId++));

        $(inputContainer).append($dslkrBttn);
        $dslkrBttn.on('click', {origin: 'comment'}, me.insertEmoticon);
    };


    this.addThumbToChatBoxes = function () {
        //find chat boxes, if they aren't yet done.
        var $emoticonsPanel = $('._3s0d').parent(':not([data-dslkr-status])');

        $emoticonsPanel.each(function () {
            me.addThumbToChatBox($(this));
        });
    };

    this.addThumbToChatBox = function ($emoticonPanel) {
        var $dslkrBttn;

        $dslkrBttn = $('<a class="chatbox" ' +
            'aria-label="Dislike" data-hover="tooltip" data-tooltip-alignh="center"' + //tooltip
            '>' +
            '<i class="dislike_thumb thumb16"></i>' +
            '</a>');

        $dslkrBttn.attr('id', 'dslkr' + (dslkrId++));

        $emoticonPanel.append($dslkrBttn);
        $dslkrBttn.on('click', {origin: 'chat'}, me.insertEmoticon);
        $emoticonPanel.attr('data-dslkr-status', 1);
    };

    this.insertEmoticon = function (e) {
        var inputField = me.findInputField(e.target);
        var data = e.data;

        inputField.focus();

        var ev = document.createEvent('TextEvent');
        ev.initTextEvent('textInput', true, true, null, ' \uD83D\uDC4E ', 9, 'en-US');

        me.updateCounter(data.origin);

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
    this.updateCounter = function (origin) {
        $('body').append('<img src="http://idislike.hatemzidi.com/update.php?r=fb&o=' + origin + '/>');
    };

}