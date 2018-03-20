//封装一个一级菜单的方法
$(function () {
    var getFirstCategory = function () {
        //调用ajax发送请求
        $.ajax({
            type: 'GET',
            // type: 'GET',
            url: '/category/queryTopCategory',
            data: null,
            dataType: 'json',
            beforeSend: function () {
                $('.mui-content .lt-loading').show().css({'transform-origin':'center'});
            },
            success: function (result) {
                // console.log(result);
                //渲染页面
                var firstResult = template('first-category', result);
                $('.first-category').html(firstResult);
                getSecondCategory(result.rows[0].id);

            },
            complete: function () {
                $('.mui-content .lt-loading').hide();
            }
        })

    }
    //二级菜单联动
    var getSecondCategory = function (id) {
        $.ajax({
            type: 'GET',
            data: {
                id: id
            },
            url: '/category/querySecondCategory',
            dataType: 'json',
            success: function (result) {
                console.log(result);
                var secondResult = template('second-template', result);
                $('.second-category').html(secondResult);
            }
        })
    }
    getFirstCategory();

    //点击一级分类 联动二级分类(事件委托)
    $('.first-category').on('tap', 'a', function () {
        //console.log(11);
        //删除所有带active的类名
        $('.first-category li').removeClass('active');
        // //给当前点击的添加类名
        $(this).parents('li').addClass('active');
        // //获取data-id的值
        var id = $(this).attr('data-id');
        //console.log(id);
        // //把data-id传给getSecondCategory这个方法
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

});
