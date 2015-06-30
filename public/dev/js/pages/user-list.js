'use strict';

var FlashDetect = require('flash-detect');

var list = $('.lists');

$('.check-all').click(function() {
    if(this.checked) {
        list.find('input[type=checkbox]').prop('checked',true);    
    }else {
        list.find('input[type=checkbox]').prop('checked',false);
    }
});



if (FlashDetect.installed) {
    list.find('.copy-text').each(function () {

        $(this).on({
            mouseenter: function () {
                if ($(this).data('clipboardInstalled')) {
                    return;
                }
                $(this).data('clipboardInstalled', true);

                $(this).zclip({
                    path: 'public/swf/ZeroClipboard.swf',
                    copy: $(this).find('a').attr('data-copy'),
                    afterCopy: function () {
                    }
                });
            },
            mouseleave: function () {
                return false;
            }
        });

    });
}