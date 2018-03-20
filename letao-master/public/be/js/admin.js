$(function(){
    //0 进度条
    //怎么才能检测ajax的开始和结束
    //解决方案 ajax全局事件
    //内容：
    //.ajaxStart();开始 需要的
    //.ajaxstop()停止
    //.ajaxError()错误
    //.ajaxSuccess()请求错误
    //.ajaxComplete 请求完成调用 需要的
    //.ajaxSend();
   NProgress.configure({ showSpinner: false }); //关闭进度圈
   $(document).ajaxStart(function () {
    // console.log("ajax开始");
    NProgress.start();

  })

   $(document).ajaxComplete(function(){
      //  console.log("ajax完成");
        NProgress.done();
   })
   //菜单功能
   //1#####.顶部导航折叠功能
   $('[data-menu]').on('click',function(){
    //    console.log(1);
    //1.1.获取左侧菜单 让左侧菜单切换显示和隐藏
    $('.ad_aside').toggle();
    //1.2 获取右侧菜单，让右侧菜单切换类名
    $('.ad_section').toggleClass('menu');
   }) 

   //2#####.左侧菜单切换折叠功能 注意：这里用的是属性选择器
   $('.menu [href="javascript:;"]').on('click',function(){
    //    console.log(1);
    $(this).siblings('.child').slideToggle();
   })

   //3#### 退出功能
   $('[data-logout]').on('click',function(){
    //    console.log(1);
    //3.1把模态框添加到body闭合标签之前 将模态框复制到项目中，注意给ID 设置modal-sm类名控制大小
    //更改提示内容
     var html = `<div class="modal fade" id="exit-modal">
  <div class="modal-dialog modal-sm">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title">温馨提示</h4>
      </div>
      <div class="modal-body alert-danger">
        <i class="glyphicon glyphicon-info-sign"></i> 您确定要退出后台管理系统吗?
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
        <button type="button" class="btn btn-primary exit-user">确定</button>
      </div>
    </div>
  </div>
</div>`

$('body').append(html);

//3.2让模态框显示
$('#exit-modal').modal('show');

 })

//3.3 调用ajax 退出功能
$('body').on('click','.exit-user',function(){
    $.ajax({
    type:'GET',
    url:'/employee/employeeLogout',
    data:null,
    success:function(result){
        console.log(result);
        if(result.success==true){
          //3.4 退出跳转
            location.href = './login.html';
        }
    }
})
})

})