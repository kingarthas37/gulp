'use strict';

require('jquery-datetimepicker');

console.info('index loaded~');
console.info('sourcemap debug!! click');
console.info('ok');


$('#date-start,#date-end').datetimepicker({
    lang: 'ch',
    timepicker: false,
    format: 'Y/m/d',
    maxDate: '+1970/01/01',
    onSelectDate: function () {

    }
});