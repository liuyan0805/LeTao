$(function(){
    //异步登录
    //1.点击登录按钮
    $('.login-btn').on('tap',function(){
        //2.获取用户信息(用户名和密码)
        var formData = $('#form').serialize();
        //3.发送ajax请求
        $.ajax({
            type:'POST',
            url: '/user/login',
            data:formData,
            //表单校验
            beforeSend:function(){
                if(!$('.mui-input-username').val()){
                    mui.toast('请填写用户名');
                    return false;
                }
                if(!$('.mui-input-password').val()){
                    mui.toast('请填写密码');
                    return false;
                }
            },
            success:function(result){
                // console.log(result);
                if(result.error==403){
                    mui.toast(result.message);
                }
                if(result.success==true){
                    //4.回跳到上一页
                    //4.1获取地址栏中的returnUrl
                    var url = new URLSearchParams(location.search);
                     var returnUrl = url.get('returnUrl');
                    //  console.log(returnUrl);
                     //4.2跳转 注意：直接登录页以后 可能不知道跳转的路径 所以
                     //判断一下，如果有returnUrl 就跳到 returnUrl 如果没有 就跳转到首页 
                     if(!returnUrl){
                         location.href = '../index.html';
                     }else{
                          location.href=returnUrl;
                     }
                   
                }
            }
        })
    })
})