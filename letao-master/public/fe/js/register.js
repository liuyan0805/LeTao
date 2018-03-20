$(function () {
  // 1获取短信验证
  // 1.1 点击获取验证码
  $(".btn_getCode").on('tap', function () {
    // 缓存this
    var _this = $(this);

    //  2.4 在60s以内不让用户再次点击
    if (_this.hasClass('btn_disabled')) {
      return false;
    }
    // 1.2 发送ajax请求
    $.ajax({
      type: 'GET',
      url: '/user/vCode',
      data: null,
      success: function (result) {
        console.log(result);

        // 倒计时
        // 1.声明一个总时间
        var sumTime = 60;
        // 2.声明一个定时器
        var timer = setInterval(function () {
          // 2.1 让时间一秒减去1
          sumTime--;
          // 2.2 把时间写到按钮中去
          _this.html(sumTime + '秒后再获取');
          // 2.3 让按钮变成灰色
          _this.addClass('btn_disabled');
          // 2.4 在60s以内不让用户再次点击
          // 如果有btn_disabled这个类 阻止点击
          // 2.5 如果总时间小于等于0 清除定时器
          if (sumTime <= 0) {
            clearInterval(timer);
            // 2.6 把按钮的颜色变回来
            _this.removeClass('btn_disabled');
            //  2.7 把内容变回来
            _this.html('获取验证码');
          }
        }, 1000);
        // 3.

      }
    })
  })

  //2 用户注册功能
  // 2.1 点击
  $('.btn_register').on('tap', function () {
    // 2.2 获取表单信息
    // 2.2.1 username
    var username = $('input[name="mobile"]').val();
    //       password
    var password = $('input[name="pass"]').val();
    // mobile
    // var mobile = username;
    // vCode
    var vCode = $('input[name="code"]').val();

    var data = {
      username: username,
      password: password,
      mobile: username,
      vCode: vCode
    }

    // console.log(data);
    // 2.3 发送ajax
    $.ajax({
      type: 'POST',
      url: '/user/register',
      data: data,
      beforeSend: function () {
        // 2.4 表单校验

        // 校验用户名
        if (!$('input[name="mobile"]').val()) {
          mui.toast("用户名不能为空");
          return false;
        }
        // 校验密码
        if (!$('input[name="pass"]').val()) {
          mui.toast("密码不能为空");
          return false;
        }
        // 校验确认密码
        if ($('input[name="pass"]').val() != $('input[name="rePass"]').val()) {
          mui.toast("两次密码不一致");
          return false;
        }
        // 校验认证吗
        if (!$('input[name="code"]').val()) {
          mui.toast("请点击右侧按钮获取");
          return false;
        }
      },
      success: function (result) {
        // console.log(result);
        if (result.error == 401) {
          mui.toast(result.message);
        }

        if (result.success == true) {
          location.href = "./login.html";
        }
      }
    })
  })


})


