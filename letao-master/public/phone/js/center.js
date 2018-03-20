$(function(){
    //1.获取用户信息
    getUserData();

    //点击退出登录按钮 发送ajax请求 跳转到用户登录页(user/login.html)
    $('.btn_outLogin').on('tap',function(){
        $.ajax({
            type:'GET',
            url:'/user/logout',
            data:null,
            success:function(result){
                console.log(result);
                if(result.success==true){
                    location.href ="./user/login.html";
                }
            }
        })
    })

})


//获取用户信息
function getUserData(){
    //发送ajax请求
    $.ajax({
        type:'GET',
        url:'/user/queryUserMessage',
        data:null,
        success:function(result){
            console.log(result);
            //调用模板
            var centerResult = template('center-template',result);
            //页面渲染
            $('.account').html(centerResult);
        }
    })
}