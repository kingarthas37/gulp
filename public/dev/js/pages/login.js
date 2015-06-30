'use strict';

require('jquery-validate');

$('#form-main-login').validate({
    messages:{
        username:'请输入用户名',
        password:'请输入密码'
    }
});