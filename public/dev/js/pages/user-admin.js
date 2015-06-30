'use strict';


require('jquery-validate');


var formDataAdd = $('#form-data-add');
formDataAdd.validate({
    messages:{
        category: formDataAdd.find('[name=category]').attr('error-info'),
        key:formDataAdd.find('[name=key]').attr('error-info')
    }
});

var formDataEdit = $('#form-data-edit');
formDataEdit.validate({
    messages:{
        category: formDataEdit.find('[name=category]').attr('error-info'),
        key:formDataEdit.find('[name=key]').attr('error-info')
    }
});

var modalAlert = $('#modal-alert');

var ckbs = $('.table :checkbox');

//修改数据
$('.table-header .edit').click(function() {

    var selectId = '',
        isChecked = 0;

    ckbs.each(function(i) {
        if(this.checked) {
            isChecked ++;
            selectId = $(this).attr('data-id');
        }
    });

    if(isChecked === 0) {
        modalAlert.modal();
        modalAlert.find('.modal-body').text('请选择至少一条需要编辑的数据!');
        $('#data-edit-checkbox-value').val(0);
        return false;
    }else if(isChecked > 1) {
        modalAlert.modal();
        modalAlert.find('.modal-body').text('最多只能选择一条需要编辑的数据!');
        $('#data-edit-checkbox-value').val(0);
        return false;
    }

    $('#data-edit-checkbox-value').val(selectId);

});


//删除数据
$('.table-header .delete').click(function() {

    var selectId = '',
        isChecked = false;

    ckbs.each(function() {
        if(this.checked) {
            isChecked = true;
            selectId += $(this).attr('data-id') + ',';
        }
    });

    if(!isChecked) {
        modalAlert.modal();
        modalAlert.find('.modal-body').text('请至少选择一条需要删除的数据!');
        $('#data-delete-checkbox-value').val(0);
        return false;
    }

    $('#data-delete-checkbox-value').val(selectId.substr(0,selectId.length-1));

});