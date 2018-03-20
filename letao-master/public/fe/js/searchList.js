// 1.渲染页面

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
  // 1.渲染页面
  // 1.1 获取搜索关键字(可以用截取字符串的方法)  另外一种方法: URLSearchParams 是用来获取url后面的参数的
  // 实例化对象 传入参数 location.search 固定写法
  var url = new URLSearchParams(location.search);
  // 在url.get(键值) 
  var key = url.get('keywords');
  // console.log(key);
  // 1.2 获取搜索结果
  getSearchResult(1, key);

  // 2.按照价格进行排序
  // 2.1 获取元素添加事件
  var priceFlag = true;
  $(".sort li:nth-child(2) a").on('tap', function () {

    // 给点击的元素添加红色样式
    $('.sort li').removeClass('active');
    $(this).parents('li').addClass('active');
    // 2.2 发起请求(按照价格排序的方式把数据请求过来)
    // console.log(1);
    if (priceFlag == true) {
      // 发起请求(按照价格排序的方式把数据请求过来)
      // 降序
      getSearchResult(1, null, 2);
      priceFlag = false;
      // 改变类名
      $(this).find('i').removeClass('fa-angle-up');
      $(this).find('i').addClass('fa-angle-down');

      // 问题: 为什么不用toggleClass
      // <i class="fa-angle-down"><i>
      // 默认是down  要用toggle 直接把down给干掉了 

      // 问题: 排序的时候按照数据库中的所有商品排序输出了
      //      
    } else {

      // 升序
      getSearchResult(1, null, 1);
      priceFlag = true;
      $(this).find('i').removeClass('fa-angle-down');
      $(this).find('i').addClass('fa-angle-up');
    }
  })

  // 3.按照库存(销量)排序
  // 3.1 声明一个变量
  var numFlag = true;
  // 3.2 获取元素添加事件
  $(".sort li:nth-child(3) a").on('tap', function () {
    $('.sort li').removeClass('active');
    $(this).parents('li').addClass('active');
    // 3.3 判断是升序还是降序
    if (numFlag == true) {
      // 3.4 如果是降序 就调用降序排列方法
      getSearchResult(1, null, null, 2);
      // 3.4.1 改变量的值
      numFlag = false;
      // 3.4.2 改样式
      $(this).find('i').removeClass('fa-angle-up');
      $(this).find('i').addClass('fa-angle-down');
      // 
    } else {
      // 3.5  如果是升序 就调用升序排列方法
      getSearchResult(1, null, null, 1);
      numFlag = true;
      $(this).find('i').removeClass('fa-angle-down');
      $(this).find('i').addClass('fa-angle-up');
    }
  });

  // 4.下拉刷新 上拉加载
  mui.init({
    pullRefresh : {
      container:"#refreshContainer",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
      down : {
        height:50,//可选,默认50.触发下拉刷新拖动距离,
        auto: true,//可选,默认false.首次加载自动下拉刷新一次
        contentdown : "下拉可以刷新",//可选，在下拉可刷新状态时，下拉刷新控件上显示的标题内容
        contentover : "释放立即刷新",//可选，在释放可刷新状态时，下拉刷新控件上显示的标题内容
        contentrefresh : "正在刷新...",//可选，正在刷新状态时，下拉刷新控件上显示的标题内容
        callback : function(){
         
          // 关闭下拉刷新
          setTimeout(function(){
            mui('#refreshContainer').pullRefresh().endPulldownToRefresh();
            console.log(1);
            getSearchResult(1, key);
          },1000);
        } //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
      },
      up : {
        height:50,//可选.默认50.触发上拉加载拖动距离
        auto:true,//可选,默认false.自动上拉加载一次
        contentrefresh : "正在加载...",//可选，正在加载状态时，上拉加载控件上显示的标题内容
        contentnomore:'没有更多数据了',//可选，请求完毕若没有更多数据时显示的提醒内容；
        callback: function(){
            console.log(2);
            // true表示没有更多数据了： false代表的是可以继续加载
            this.endPullupToRefresh(true);
        }//必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
      }
    }
  });

  // 5.点击购买 跳转到商品详情页 传递商品id
  $(".lt-sports").on('tap','button',function(){
    // 5.1 获取button上的id
    // data相当于js中的 node.dataset
    var id = $(this).data('id');
    // 5.2 跳转
    location.href = "./detail.html?productId="+id;
  })
})

/**
 * pageNum 必须的参数  代表第几页
 * proName  非必须的参数  代表的是搜索的关键字 没有这个参数  就把数据库中的所有的商品请求来 如果有 就把符合关键字要求的请求过来
 * price  按照价格排序  1升序 2降序
 * num    按照库存 1升序 2降序
 */
function getSearchResult(pageNum, proName, price, num) {
  // 1.2 根据关键字去搜索结果
  $.ajax({
    type: 'GET',
    url: '/product/queryProduct',
    data: {
      page: pageNum || 1,
      pageSize: 10,
      proName: proName || '',
      // 如果不写null 你写什么都会对其他排序有影响
      // null这个事情不知道  1升序 2降序  传什么参数 全看后台接口 如果有疑惑 去问后台的代码
      price: price || null,
      // 按照库存
      num: num || null
    },
    success: function (result) {
      // 1.3 渲染页面
      console.log(result);
      var productResult = template('product-template', result);

      // 1.4 把数据写到页面上
      $(".lt-sports-content").html(productResult);
    },
    // complete: function(){
    //   mui('#refreshContainer').pullRefresh().endPulldownToRefresh();
    // }
  })

}
