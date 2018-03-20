//1.渲染页面
$(function () {
  // 区域滚动
  mui('.mui-scroll-wrapper').scroll({
    scrollY: true, //是否竖向滚动
    scrollX: false, //是否横向滚动
    startX: 0, //初始化时滚动至x
    startY: 0, //初始化时滚动至y
    indicators: true, //是否显示滚动条
    deceleration: 0.0006, //阻尼系数,系数越小滑动越灵敏
    bounce: true //是否启用回弹
  });
  //1.######渲染页面
  //1.1 获取搜索关键字(可以用截取字符串的方法)另外一种方法：URLSearchParams
  //是用来获取url后面参数的
  //实例化对象  传入参数 location.search 固定写法
  var url = new URLSearchParams(location.search);
  //在url.ger(键值)
  var key = url.get('keywords');
  //1.2获取搜索结果
  getSearchResult(1, key);


  //2.#####按照价格排序
  //2.1声明表示升序降序的标识
  var priceFlag = true;
  //2.2获取元素添加事件
  $('.sort li:nth-child(2) a').on('tap', function () {
    //改变元素的样式
    $('.sort li').removeClass('active');
    $(this).parents('li').addClass('active');
    //判断升序还是降序
    if (priceFlag == true) {
      //降序
      //发送ajax请求
      getSearchResult(1, null, 2);
      priceFlag = false;
      //改变类名
      $(this).find('i').removeClass('fa-angle-up');
      $(this).find('i').addClass('fa-angle-down');

    } else {
      //升序
      getSearchResult(1, null, 1);
      priceFlag = true;
      //改变类名
      $(this).find('i').removeClass('fa-angle-down');
      $(this).find('i').addClass('fa-angle-up');
    }
  })

  //######3.根据数量排序
  var numFlag = true;
  $('.sort li:nth-child(3) a').on('tap', function () {
    // console.log(1); 
    //当前元素的样式改变
    $('.sort li').removeClass('active');
    $(this).parents('li').addClass('active');

    if (numFlag == true) {
      getSearchResult(1, null, null, 2);
      //降序
      numFlag = false;
      //改变类名
      $(this).find('i').removeClass('fa-angle-up');
      $(this).find('i').addClass('fa-angle-down');
    } else {
      getSearchResult(1, null, null, 1);
      //升序
      numFlag = true;
      $(this).find('i').removeClass('fa-angle-down');
      $(this).find('i').addClass('fa-angle-up');
    }


  })

  //########4.下拉刷新 上拉加载页面
  mui.init({
  pullRefresh : {
    container:"#refreshContainer",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
    down : {
      height:50,//可选,默认50.触发下拉刷新拖动距离,
      auto: true,//可选,默认false.首次加载自动下拉刷新一次
      contentdown : "下拉可以刷新",//可选，在下拉可刷新状态时，下拉刷新控件上显示的标题内容
      contentover : "释放立即刷新",//可选，在释放可刷新状态时，下拉刷新控件上显示的标题内容
      contentrefresh : "正在刷新...",//可选，正在刷新状态时，下拉刷新控件上显示的标题内容
      callback :function(){
        //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
        //关闭下拉刷新
        //  console.log(5);
        //  getSearchResult(1,key);
        //   console.log(6);
        //   mui('#refreshContainer').pullRefresh().endPulldownToRefresh();

        setTimeout(function(){
          getSearchResult(1,key);
          mui('#refreshContainer').pullRefresh().endPulldownToRefresh();
      },1000)
         
      } 
    },
     up : {
      height:50,//可选.默认50.触发上拉加载拖动距离
      auto:true,//可选,默认false.自动上拉加载一次
      contentrefresh : "正在加载...",//可选，正在加载状态时，上拉加载控件上显示的标题内容
      contentnomore:'没有更多数据了',//可选，请求完毕若没有更多数据时显示的提醒内容；
      callback :function(){
        //true表示没有更多数据了 false表示可以继续加载
          this.endPullupToRefresh(true);
      } //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
    }
  }
});
//5.点击购买 跳转到商品详情页 传递商品id
$('.lt-sports').on('tap','button',function(){
  // console.log(1);
  //5.1获取button上的id
  var id = $(this).data('id');
  // console.log(id);
  //5.2 跳转
  location.href="../search/detail.html?productId="+id;
})
})

function getSearchResult(pageNum, proName, price, num) {
  //1.2根据关键字去搜索结果
  $.ajax({
    type: 'GET',
    url: '/product/queryProduct',
    data: {
      page: pageNum || 1,
      pageSize: 5,
      proName: proName || '',
      price: price || null,
      num: num || null
    },
    success: function (result) {
      console.log(result);
      //1.3渲染页面 
      var productResult = template('product-template', result);
      $('.lt-sports-content').html(productResult);
    }
  })
}