$(function(){
    //功能
    //1.分页展示信息
  getUserList();
    //2.用户的禁用和启用
    
    //2.1点击按钮
    $('tbody').on('click','.btn',function(){
        //2.2获取当前的状态(1代表正常 0代表禁用)
        //现在用户都是1 但是 按钮是danger
        //意味着 点击按钮 是要去竟用用户的
        var isDelete = $(this).hasClass('btn-danger')?0:1;
        var id = $(this).data('id');
        console.log(isDelete,id);

        //1.让模态框出现
        $('#optionModal').modal('show');
        //2.改变字样 
        $('#optionModal').find('strong').text($(this).text()+$(this).data('username'));

        //2.3 切换状态
        $('#optionModal').on('click','.btn-yes',function(){
            $.ajax({
                type:'POST',
                url:'/user/updateUser',
                data:{
                    id:id,
                    isDelete:isDelete
                },
                success:function(result){
                    console.log(result);
                    if(result.success==true){
                        getUserList();
                        $('#optionModal').modal('hide');
                    }
                }
            })
        })
    })
    
})


//1分页展示信息
function getUserList(pageNum,pageSize){
    $.ajax({
        type:'GET',
        url:'/user/queryUser',
        data:{
            page:pageNum || 1,
            pageSize:pageSize || 10
        },
        success:function(result){
            console.log(result);
            var userResult =  template('user-template',result);
            //把页面添加到html中去
            $('tbody').html(userResult);
            //分页展示
            $('.pagination').bootstrapPaginator({
                //固定写法 但是不能不写 代表了bootstrap的版本
                bootstrapMajorVersion:3,
                //当前页面page当前第几页
                currentPage:result.page,
                //一页显示几个按钮(在ul里面生成5个li)
                //numberOfPages:5
                //总页数 total 代表数据总条数 size代表一页显示几个
                totalPages:Math.ceil(result.total/result.size),
                //你要去第几页 那么就点击 要获取currentPage
                onPageChanged:function(event,originalEvent,typePage,currentPage){
                    var page =  currentPage;
                    //让页面重新渲染到某一页
                    getUserList(page);
                }
            })
        }
    })
}

//思路总结：分页信息展示：第一步：①查看后台接口文档，返回数据，调用模板，渲染页面 ②调用bootstrap的分页插件进行分页
           //用户的禁用与启用：第二步：①获取禁用或启用的按钮，②绑定点击事件 ③获取当前按钮的状态
           //以及id 和用户名  ④让模态框显示，⑤改变模态框的字样 ⑥给模态框的确定按钮添加类名并绑定点击事件
           //⑦发送ajax请求 获取数据后重新展示信息(这里调用分页信息展示方法即可)
