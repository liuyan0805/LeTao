// 功能:用户的分页展示
// 1.获取用户
// 2.分页展示



$(document).ready(function () {
  // 获取用户
  getUserList();
  // 禁用和启用用户
  $("tbody").on("click",'.btn',function(){
    // console.log(1);
    // 用户id
    var userId = $(this).attr('data-id');
    // isDelete 0或1 
    var result = $(this).hasClass('btn-danger');
    console.log(result);
    // 如果这个按钮含有btn-danger 代表用户是正常的 否则是禁用的
    var isDelete = $(this).hasClass("btn-danger")?1:0;

    delUser(userId,isDelete);
    // 在这里写getUserList()想要在禁用用户的时候 重新获取用户列表 会出现304 
    // 代表的是服务器直接返回内容 不做刷新操作 原因是 服务器有缓存机制 会直接返回以前的内容
    // 解决方案就是等待delUser()方法执行成功之后再去调用getUserList()这样的代码相当于回调函数
    // getUserList();

    // 200 接收到成功的请求
    // readyState == 4成功的接收到请求
    // xhr.readyState== 4&& xhr.status == 200
    // 403(没有权限) 和 304 (modify 没有修改)
    // 404 not found
    // 500 502 
    // 重定向-- 
    // 和转发
  })
})


var getUserList = function (page, pageSize) {
  $.ajax({
    type: 'get',
    url: ' /user/queryUser',
    data: {
      page: page || 1,
      // 10
      pageSize: pageSize || 5
    },
    success: function (data) {
      console.log(data);
      var userList = template("user-template", data);
      $('tbody').html(userList);

      $(".pagination").bootstrapPaginator({
        bootstrapMajorVersion: 3,    //版本
        currentPage: data.page,    //当前页数
        numberOfPages: 5,    //最多显示Page页
        totalPages: Math.ceil(data.total/data.size),    //所有数据可以显示的页数
        onPageClicked: function (e, originalEvent, type, page) {
          getUserList(page);
        }
      });
    }

  })
}

// 功能: 用户禁用启用
var delUser = function(userId,isDelete){
  $.ajax({
    type: 'post',
    url: "/user/updateUser",
    data: {
      id: userId,
      isDelete: isDelete
    },
    success:function(data){
      // console.log(data);
      if(data.success == true) {
        getUserList();
      }
    }
  })
}