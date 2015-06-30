'use strict';

require('jquery-zoom');


var zoomContent = $('.jqzoom'),
    zoomList = $('.zoom-list');

$(".jqzoom").jqueryzoom({
    xzoom:350,
    yzoom:350
});

zoomList.find('a').click(function() {

    var $this = $(this);

    zoomList.find('.cur').removeClass('cur');
    $this.addClass('cur');

    zoomContent.find('img').attr({
        src:$this.find('img').attr('src'),
        jqimg:$this.find('img').attr('zoom-src')
    });

});