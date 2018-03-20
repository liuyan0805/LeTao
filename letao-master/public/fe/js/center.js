$(function(){
  // 1.获取用户信息
  // 
  getUserData();

  // 点击退出按钮 跳转到登陆页面
  $(".btn_outLogin").on('tap',function(){
    $.ajax({
      type: 'GET',
      url: '/user/logout',
      data: null,
      success: function(result){
        // console.log(result);
        if(result.success == true) {
          location.href = "./user/login.html";
        }
      }
    })
  })
})

function getUserData(){
  $.ajax({
    type: 'GET',
    url: '/user/queryUserMessage',
    data: null,
    success:function(result){
      console.log(result);
      if(result.error == 400) {
        var url = location.href;
        location.href = './user/login.html?returnUrl='+url;
      }

      // 页面渲染
      var centerResult = template("center-template",result);
      $('.account').html(centerResult);
    }
  })
}