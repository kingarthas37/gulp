'use strict';

require('jquery-datetimepicker');

console.info('index loaded~');


$('#date-start,#date-end').datetimepicker({
    lang: 'ch',
    timepicker: false,
    format: 'Y/m/d',
    maxDate: '+1970/01/01',
    onSelectDate: function () {

    }
});