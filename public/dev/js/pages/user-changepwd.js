'use strict';


require('jquery-validate');


$('#form-main-changepwd').validate({
    rules: {
        confirmPassword: {
            equalTo: "input[name=newPassword]"
        }
    },
    messages:{
        passwrod:{
            required:'请输入原密码'
        },
        newPassword:{
            required:'请输入新密码'
        },
        confirmPassword:{
            required:'请输入确认新密码',
            equalTo:'请输入相同的新密码'
        }
    }
});