'use strict';

require('jquery-datetimepicker');
require('jquery-zclip');
var FlashDetect = require('flash-detect');


var list = $('.lists');

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


$('#date-start,#date-end').datetimepicker({
    lang: 'ch',
    timepicker: false,
    format: 'Y/m/d',
    maxDate: '+1970/01/01',
    onSelectDate: function () {

    }
});
    
