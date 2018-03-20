$(function () {
  // 异步登陆

  // 1.点击登陆按钮
  $('.login-btn').on('tap', function () {
    // 2.获取用户信息(用户名和密码)  FormData 内置对象 可以序列化表单 username: zhangsan  -> username=zhangsan&password=1234576

    // zepto或jquery中如何序列化表单呢？ serialize();
    // 1.所有的表单元素要放在form标签中才可以使用serialize();
    // 2.$("只要能选择到表单元素form").serialize();
    var formData = $("#form").serialize();
    // console.log(formData);
    // 所谓的序列化  就是把 所有的表单信息 变成 key=value&key=value的过程
    // 因为http协议要求表单的数据格式: key=value&key=value

    // 3.发送ajax请求
      $.ajax({
        type: 'POST',
        url: '/user/login',
        // 正常情况 data的值是对象 
        // http协议要求表单的数据格式: key=value&key=value
        // zepto或jquery会把正常情况下的对象 转换成http协议要求的数据格式

        // 如果不会把对象转成http协议要求的格式: parmas

        data: formData,
        // 表单校验  表单校验插件
        beforeSend:function(){
          // 如果用户名没有填写 提示用户填写用户名
          if(!$('.mui-input-username').val()){
             mui.toast("请填写用户名");
             return false;
          }
          // 如果用户密码没有填写 提示用户填写密码
          if(!$('.mui-input-password').val()){
            mui.toast("请填写密码");
            return false;
         }

        },
        success:function(result){
            console.log(result);
            if(result.error == 403){
              mui.toast(result.message);
            }

            if(result.success == true) {
            // 4.回跳到上一页
            // 4.1 获取地址栏中的returnUrl
            var url = new URLSearchParams(location.search);
            // console.log(location.search);
            var returnURL = url.get('returnUrl');

            // 注意: 直接到登陆页之后 可能不知道跳转的路径 所以判断一下 如果有returnURL 就跳到returnURL 如果没有  跳到 首页
              if(!returnURL) {
                location.href = "../index.html";
              }else {
                // console.log(returnURL);
                // 4.2 跳转
                location.href = returnURL;
              }
          

            }
        }
      })
 
  })

})