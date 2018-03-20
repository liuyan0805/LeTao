$(function(){
    //###区域滚动
    mui('.mui-scroll-wrapper').scroll({
    scrollY: true, //是否竖向滚动
    scrollX: false, //是否横向滚动
    startX: 0, //初始化时滚动至x
    startY: 0, //初始化时滚动至y
    indicators: true, //是否显示滚动条
    deceleration: 0.0006, //阻尼系数,系数越小滑动越灵敏
    bounce: true //是否启用回弹
  });

//1.######数据展示(页面打开就要去请求数据)
//1.1 获取url中的productId
var url = new URLSearchParams(location.search);
//1.2调用gerProductData
var id= url.get('productId');
console.log(id);
getProductData(id);

//2.####添加购物车
//2.1 商品选择
$('.mui-content').on('tap','.lt-product-size span',function(){
  // console.log(1);
  //删除所有类名
  $('.lt-product-size span').removeClass('active');
  //添加类名
  $(this).addClass('active');
})
//2.2添加购物车
$('.lt-prduct-footer .product-cart').on('tap',function(){
  // console.log(1);
  //2.2.1数量获取
  var num = mui('.mui-numbox').numbox().getValue();
  //console.log(num);
  //2.2.2 获取id 
  var productId = id;
  //2.2.3获取尺码
  var size =$('.lt-product-size span.active').text() ;
  // console.log(size);
  //调用添加购物车的函数
  addCart(productId,num,size);
})
  
})


//获取商品详情数据
function getProductData(productId){
  $.ajax({
    url:'/product/queryProductDetail',
    type:'GET',
    data:{
      id:productId,
    },
    success:function(result){
      // console.log(result);
      var detaiResult = template('product-template',result);
      $('.mui-content').html(detaiResult);
      // console.log(detaiResult);

      //渲染尺码
      var sizeData = result.size;//获取到尺寸
      // console.log(sizeData);
      var sizeArray = sizeData.split('-');
      console.log(sizeArray);
      var sizeResult = template('size-template',{
        startNum:sizeArray[0],
        endNum:sizeArray[1]
      });
      $('.lt-product-size').html(sizeResult);
      //因为num-box是动态添加到页面中中的，所以需要手动初始化
      mui('.mui-numbox').numbox()
      
      // 因为轮播图是动态添加到页面中的 所以也需要初始化
      //获得slider插件对象
      var gallery = mui('.mui-slider');
      gallery.slider({
        interval: 5000//自动轮播周期，若为0则不自动播放，默认为0；
      });

    }
  })
}


//加入购物车
function addCart(productId,num,size){
  $.ajax({
    type:'POST',
    url:'/cart/addCart',
    data:{
      productId:productId,
      num:num,
      size:size
    },
    beforeSend:function(){
      //检测商品ID
      if(!productId){
      mui.toast('产品ID不合法');
      return false;
    }
    if(!num){
      //检测数量
       mui.toast('请选择数量');
       return false;
    }
    if(!num){
      //检测尺码
       mui.toast('请选择尺码');
       return false;
    }
    },
    success:function(result){
      console.log(result);
      // console.log(result.message,result.error);
      if(result.error==400){
        //未登录 跳转到登录页 然后还要跳转回来
        //1.把当前的url存储起来
        //2.把url当作一个参数存起来
        //3.登录之后 把存起来的参数拿出来作为location.href的地址
        var url = location.href;
        console.log(location);
        location.href = '../user/login.html?returnUrl='+url;
      }
    }
  })
}