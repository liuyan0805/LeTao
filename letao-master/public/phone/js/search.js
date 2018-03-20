//功能
//1.点击搜索按钮，如果没有内容那么提示输入内容，如果有内容 那么根据内容去搜索 跳转
//2.历史记录列表的展示
//3.点击某一条记录的文字 会跳转搜索
//4.点击x号 会删除一条历史记录 重新渲染列表
//5.点击清空历史记录 历史记录就被清空了 重新加载列表 没有就显示---没有搜索历史记录

$(function () {
    //0.历史记录列表的展示
    showHistory();
    //1.点击搜索按钮如果没有内容那么提示输入内容 如果有内容 那么就根据内容去搜索 跳转搜索结果页
    //1.1获取点击按钮
    $('.search-btn').on('tap',function(){
        var keywords = $.trim($('.search-box input').val());
        // console.log(keywords);
        //1.2判断有没有数据 没有数据就提示
        if(keywords==''){
            mui.toast('请输入关键字');
        }else{
            //调用搜索历史记录的方法
            setHistory(keywords);
            //清空输入框
            $('.search-box input').val('');
            //跳转到搜索结果页
            location.href = '../search/searchList.html?'+'keywords='+keywords;
        }
    });

    //2.点击某一条记录的文字 去搜索结果列表
    $('.history').on('tap','.history-list span',function(){
        var keywords = $(this).text();
        // console.log("../search/searchList.html?"+'productId='+keywords);
        location.href = "../search/searchList.html?"+'keywords='+keywords;
    });
    //3.1点击x号，会删除一条历史记录 重新渲染列表
    $('.history').on('tap','.history-list i',function(){
        var text = $(this).siblings('span').text();
        //点击删除按钮(X号)的时候，我们去获取它的兄弟元素中的历史记录数据
        //当我们获取到历史记录数据中的关键字的时候，我们通过删除方法，把这个关键字从
        //localStorage中删除
        //3.2 调用删除的方法删掉
        delHistory(text);
        //3.3重新渲染页面
        showHistory();
    })
    //4.点击清空历史记录 历史记录就被清空了
    $('.history').on('tap','.history-title-manager span:nth-child(2)',function(){
        clearHistory();
        showHistory();
    })


})



//######获取历史记录
function getHistory() {
    //把json转成j数组或对象
    return JSON.parse(window.localStorage.getItem('ltHistory') || '[]');
}

//#####设置历史记录
function setHistory(key) {
    //1.获取历史记录
    var historyArray = getHistory();
    //2.遍历获取来的历史记录 然后 判断新传入的关键字是否在历史记录中 如果在就删除
    $.each(historyArray, function (index, item) {
        if (item == key) {
            historyArray.splice(index, 1);
        }
    })
    //3.把新的关键字添加到历史记录数组中
    historyArray.push(key);
    //4.把数组转换成字符串，然后放入localStorage中
    window.localStorage.setItem('ltHistory', JSON.stringify(historyArray));
}
setHistory('nini');
//#####删除历史记录
function delHistory(key) {
    //1.获取历史记录
    var historyArray = getHistory();
    //2.循环遍历获取的历史记录 删除历史记录
    $.each(historyArray, function (index, item) {
        if (item == key) {
            historyArray.splice(index, 1);
        }

    })
    //3.把数组转成字符串，然后放入localStorage中
    window.localStorage.setItem('ltHistory', JSON.stringify(historyArray));
}

//#####点击清空历史记录
function clearHistory() {
    window.localStorage.removeItem('ltHistory');
}

//#######展示历史记录
function showHistory() {
    //1.获取历史记录(数组)
    var historyArray = getHistory();
    //2.渲染数据 template(id,对象)
    var historyResult = template('history-template', { arr: historyArray });
    $('.history').html(historyResult);

}
showHistory();
