
// 初始化MUI框架
mui.init();

// 自调用函数
(function ($) {

  // 1.页面的动态渲染
  getCartData();



  var btnArray = ['确认', '取消'];


  // 删除
  $('#OA_task_1').on('tap', '.mui-btn-red', function (event) {
    var elem = this;
    // console.log(elem);
    var li = elem.parentNode.parentNode;
    mui.confirm('确认删除该商品吗？', '温馨提示', btnArray, function (e) {
      if (e.index == 0) {
        // 删除

        // 需要一个购物车id数组
        var id = elem.dataset.id;
        // console.log(id);
        var arr = [];
        arr.push(id);
        var obj = {
          id: arr
        }
        // console.log(obj);

        $.ajax({
          type: 'GET',
          url: '/cart/deleteCart',
          data: obj,
          success: function (result) {
            // console.log(result);
            if (result.success == true) {
              mui.toast("删除成功");
            }
          }
        })
        li.parentNode.removeChild(li);
      } else {
        // 取消删除
        setTimeout(function () {
          $.swipeoutClose(li);
        }, 0);
      }
    });
  });

  // 编辑
  $('#OA_task_1').on('tap', '.mui-btn-blue', function (event) {
    var elem = this;
    var li = elem.parentNode.parentNode;
    //  1.获取编辑商品的数据
    // 购物车id
    var id = elem.dataset.id;
    //  尺码范围
    var productSize = elem.dataset.productSize;
    var productArr = productSize.split('-');
    // 鞋码
    var size = elem.dataset.size;
    // 数量
    var num = elem.dataset.num;
    // 库存
    var productNum = elem.dataset.productNum;
    // 渲染对象
    var obj = {
      id : id,
      data: productArr,
      size: size,
      num: num,
      productnum: productNum
    }
    // 2. 把数据重新整理一下
    // 3.把整理好的数据 渲染到模板中
    var editResult  = template("edit-template",obj).replace(/\n/g,'');
    // console.log(editResult);
  
    mui.confirm(editResult, '编辑商品', btnArray, function (e) {
      if (e.index == 0) {
        // 在这里 要更新购物车
        // 1.准备数据   
          // 1.1  购物车数据id
          var cartId = id;
          // console.log(cartId);
          // 1.2 产品尺码(不能用html() 或 text()  因为这是mui 里面没有这样的方法)
          var size = $('span.active')[0].innerHTML;
          // console.log(size);
          // 1.3 产品数量
          var num= mui('.mui-numbox').numbox().getValue();
          // console.log(num);
        // 2.发起Ajax请求
          $.ajax({
            type: 'POST',
            url: '/cart/updateCart',
            data: {
              id: cartId,
              size: size,
              num: num
            },
            success: function(result){
              // console.log(result);
              if(result.success == true) {
                // 更新页面
                getCartData()
              }
            }
          })
        // 3.更新页面
        // li.parentNode.removeChild(li);
      } else {
        setTimeout(function () {
          $.swipeoutClose(li);
        }, 0);
      }
    });

    // 手动初始化
    mui('.mui-numbox').numbox();
  });


})(mui);

// 获取购物车
function getCartData() {
  $.ajax({
    type: "GET",
    url: '/cart/queryCart',
    data: null,
    success: function (result) {
      console.log(result);
      if (result.error == 400) {
        var url = location.href;
        location.href = "./user/login.html?returnUrl=" + url;
      }

      // 绑定模板
      var cartResult = template('cart-template', { data: result });
      // 渲染页面
      $("#OA_task_1").html(cartResult);
    }
  })
}

// 点击编辑商品中的span 给span添加active类名
$("body").on("tap",'.edit-size span',function(){
  // console.log(1);
  // 删除所有active类名
  $('.edit-size span').removeClass('active');
  // 给当前的span添加active类名
  $(this).addClass('active');
})

// 删除购物车
// function delCartData(arr){
//   $.ajax({
//     type: 'GET',
//     url: '/cart/deleteCart',
//     data: arr,
//     success: function(){

//     }
//   })
// }
