/*
 👎
 THUMBS DOWN SIGN
 Unicode: U+1F44E (U+D83D U+DC4E), UTF-8: F0 9F 91 8E
 */


function iDislike() {

    var me = this;
    me.dslkrId = 0;
    me.platform = "dunno";


    this.setPlatform = function (platform) {
        me.platform = platform;
        // console.debug("platform is " + platform);
    };

    this.getDislikeHtml = function (container) {
        var el = '<div id="dslkr_' + (me.dslkrId++) + '" class="' + container + '" ' +
            'aria-label="Dislike" data-hover="tooltip" data-tooltip-alignh="center"' + //tooltip
            '>' +
            '<i class="dislike_thumb thumb16"></i>' +
            '</div>';

        return $(el);
    };

    this.addThumbs = function () {
        me.addThumbToComments();
        me.addThumbToChatBoxes();
    };

    this.addThumbToComments = function () {
        //find input fields, if they aren't yet done.
        var $inputFields = $('textarea[name="add_comment_text_text"],' +
            'textarea[name="add_comment_text"],' +
            'textarea[name="xhpc_message_text"],' +
            'textarea[name="xhpc_message"],' +
            '._5yk2,' +   // status for personal page
            '.shareInput, ' +
                //'.UFIAddCommentInput,' +
            '.UFIInputContainer'
        ).not('[data-dslkr-status]');

        $inputFields.each(function () {
            me.addThumbToComment($(this));
        });

    };

    this.addThumbToComment = function ($el) {
        // mark as visited
        $el.attr('data-dslkr-status', "done");

        var $inputContainer = $el;

        if (!$inputContainer.hasClass('UFIInputContainer')) {
            $inputContainer = $el.parent();
        }

        var $dslkrBttn = me.getDislikeHtml("commentbox");

        $inputContainer.append($dslkrBttn);

        $inputContainer.find('[contenteditable]').addClass('box');
        //todo disabled, can't figure out how to manage the text area now ...
        // $(inputContainer).find('textarea').addClass('box');

        $dslkrBttn.on('click', {origin: 'comment'}, me.insertEmoticon);
    };


    this.addThumbToChatBoxes = function () {
        //find chat boxes, if they aren't yet done.
        var $emoticonsPanel = $('._3s0d').parent(':not([data-dslkr-status])');  // _3s0d is the thumb up icon

        $emoticonsPanel.each(function () {
            me.addThumbToChatBox($(this));
        });
    };

    this.addThumbToChatBox = function ($emoticonPanel) {
        // mark as visited
        $emoticonPanel.attr('data-dslkr-status', "done");

        var $dslkrBttn = me.getDislikeHtml("chatbox");

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


    //todo : to optimize/refactor if possible ?
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

                //todo : apply only with old browsers (from a list to make)
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


    this.replaceEmoticon = function (e) {
        var $inputField = $(e.target);
        var $contentEls;

        if (e.target.tagName === "DIV") {
            // use this only on comment
            $contentEls = $inputField.find('span[data-text]');
        } else {
            // console.log(e.target.tagName + "#"+ e.target.id);
            //  inputField = ;
        }

        $contentEls.each(function () {
            var text = $(this).html();
            var newtext = '';

            var indexOf = typeof text !== 'undefined' ? text.indexOf('(n)') : -1;

            if (e.keyCode === 32 && indexOf > -1) {
                e.data = {origin: 'keyboard'};

                dslkr.insertEmoticon(e);

                newtext = $(this).html().replace(/\(n\)/g, ""); // clean the content
                $(this).html(newtext.substring(1)); //todo : here i have a very strange behaviour, a space is added at the begining

            }
        });

    };

    // this is just a counter, no data are stored
    this.updateCounter = function (origin) {
        $('body').append('<img src="http://idislike.hatemzidi.com/blank.gif?r=fb&o=' + origin + '"/>');
    };

}