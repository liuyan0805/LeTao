// 功能: 
// 1.一级菜单渲染
//1.1  当页面刚打开 需要渲染一级菜单
//1.2  点某一个   也要渲染
// 2.二级分类联动渲染
// 3.菜单区域滚动


$(function () {


  // 声明一个方法 -- 专门来做一级菜单渲染的
  // 如何得到ajax中的参数呢？ 查接口文档
  var getFirstCategory = function () {
    $.ajax({
      type: 'GET',
      url: '/category/queryTopCategory',
      data: null,
      // 预期服务器的返回数据类型 
      // 如果dataType为json,jquery或zepto会把json转成对象
      dataType: 'json',
      beforeSend: function () {
        // console.log(1);
        // 让图片显示u
        $(".mui-content  .loading").show();
      },
      success: function (result) {
        console.log(result);
        // 用模板引擎的方法 把数据渲染出来
        // template(id,必须是对象)
        var firstResult = template('first-template', result);

        // console.log(firstResult);
        // 把渲染好的结果 放入first-category这个ul中
        $(".first-category").html(firstResult);

        getSecondCategory(result.rows[0].id);
      },
      complete: function () {
        // console.log(2);
        // 让图片隐藏
        $(".mui-content  .loading").hide();
      }
    })
  }

  // 声明一个方法 -- 专门用来做二级分类渲染
  var getSecondCategory = function (id) {
    // 如何得到ajax中的参数呢？ 查接口文档
    $.ajax({
      type: 'GET',
      url: '/category/querySecondCategory',
      data: {
        id: id
      },
      success: function (result) {
        // console.log(result);
        var secondResult = template('second-template', result);

        $(".second-category").html(secondResult);
      }
    })
  }

  getFirstCategory();

  // 点击一级分类  联动二级分类 (事件委托)
  $('.first-category').on('tap', 'a', function () {
    // 删除所有带有active的类名
    $('.first-category li').removeClass('active');
    // 给当前的li添加active
    $(this).parents('li').addClass('active');
    // console.log(1);
    // 1.获取data-id的值
    var id = $(this).attr('data-id');
    // 2.把data-id传给getSecondCategory这个方法
    getSecondCategory(id);
  })

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

})

