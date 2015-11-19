/*
 👎
 THUMBS DOWN SIGN
 Unicode: U+1F44E (U+D83D U+DC4E), UTF-8: F0 9F 91 8E
 */


function iDislike() {

    var me = this;
    var dslkrId = 0;
    var platform = "dunno";


    this.setPlatform = function (p) {
        platform = p;
        //console.debug("platform is " + platform);
    };

    this.getDislikeHtml = function (container) {
        return $('<div class="' + container + '" ' +
            'aria-label="Dislike" data-hover="tooltip" data-tooltip-alignh="center"' + //tooltip
            '>' +
            '<i class="dislike_thumb thumb16"></i>' +
            '</div>');
    };

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

        var $dslkrBttn = me.getDislikeHtml("dslkr_container");

        $dslkrBttn.attr('id', 'dslkr' + (dslkrId++));

        $(inputContainer).append($dslkrBttn);

        $(inputContainer).find('[contenteditable]').addClass('box');
        //todo disabled, can't figure out how to manage the text area now ...
        // $(inputContainer).find('textarea').addClass('box');

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
        // mark as visited
        $emoticonPanel.attr('data-dslkr-status', 1);

        var $dslkrBttn = me.getDislikeHtml("chatbox")

        $dslkrBttn.attr('id', 'dslkr' + (dslkrId++));
        $emoticonPanel.append($dslkrBttn);

        //todo disabled, can't figure out how to manage the text area now ...
        // $emoticonPanel.find('textarea').addClass('box');

        $dslkrBttn.on('click', {origin: 'chat'}, me.insertEmoticon);
    };

    this.insertEmoticon = function (e) {
        var inputField = me.findInputField(e.target);
        var data = e.data;

        inputField.focus();

        var ev = document.createEvent('TextEvent');
        ev.initTextEvent('textInput', true, true, null, ' \uD83D\uDC4E ', 9, 'en-US');

        inputField.dispatchEvent(ev);

        me.updateCounter(data.origin);

    };


    //todo : to optimize/refactor
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

                //todo : apply only with old browsers
                if (platform !== 'mac') {
                    $('.UFIAddCommentInput', wrapperEl).addClass('emj'); // apply the emoji police
                }
            }

            if ($('textarea', wrapperEl).length > 0) {
                $inputEl = $('textarea', wrapperEl)[0];

                //todo : apply only with old browsers
                if (platform !== 'mac') {
                    $($inputEl).addClass('emj'); // apply the emoji police
                }
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
        $('body').append('<img src="http://idislike.hatemzidi.com/update.php?r=fb&o=' + origin + '"/>');
    };

}