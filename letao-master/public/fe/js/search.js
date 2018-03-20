
// 功能
// 1.点击搜索按钮 如果没有内容那么提示输入内容 如果有内容 那么就根据内容去搜索 跳转
// 2.历史记录列表的展示
// 3.点击某一条记录的文字 回跳转搜索
// 4.点击X号 会删除一条历史记录  重新渲染列表
// 5.点击清空历史记录 历史记录就被清空了 重新加载列表 没有就显示 --没有历史搜索记录


$(function () {
  // 0.历史记录列表的展示
  showHistory();
  // 1.点击搜索按钮 如果没有内容那么提示输入内容 如果有内容 那么就根据内容去搜索 跳转搜索结果页
  //  1.1 获取按钮点击 
  $('.search-btn').on('tap', function () {
    var keywords = $.trim($(".search-box input").val());
    // console.log(keywords);
    //  1.2 判断有没有数据 没有数据就提示
    if (keywords == '') {
      mui.toast("请输入关键字");
    } else {
      // console.log(keywords);
      //  1.3 输入有数据  就设置历史记录
      setHistory(keywords);
      $(".search-box input").val('');
      // 下一页是搜索结果页 那么结果怎么搜索出来呢？
      location.href = './searchList.html?'+'keywords='+keywords;
    }

  })

  // 2.点击某一条记录的文字 去搜索结果列表
  $(".history").on('tap','.history-list span',function(){
    // 2.1 获取点击的元素的文字
    var keywords = $(this).text();
    
    location.href = './searchList.html?'+'keywords='+keywords;
  })
  // 3.点击X号 会删除一条历史记录  重新渲染列表
  $(".history").on('tap', '.history-list i', function () {
    // console.log(1);
    // 3.1 得我要删除的记录是什么 找到那个字
    var text =$(this).siblings('span').text();
      // console.log(text);
    // 点击删除按钮(X号)的时候，我们去获取它的兄弟元素中的历史记录数据
    // 当我们获取到历史记录数据中的关键字的时候 我们通过删除方法 把这个关键字从localStorage中删除 那再次渲染的时候 就没有了
    // 3.2 调用删除方法删掉
    delHistory(text);
    // 3.3 重新渲染页面
    showHistory();
  })

  // 4. 点击清空历史记录 历史记录就被清空了
  $('.history').on('tap','.history-title-manager span:nth-child(2)',function(){
    // console.log(1);
    clearHistory();
    showHistory();
  })

})

// 获取历史记录
function getHistory() {
  // 0.我们通过localstorage存入的是json数据
  // 1.我们需要的是什么样的数据 --js对象或数组 把json转成数组或对象
  return JSON.parse(window.localStorage.getItem('ltHistory') || '[]');
}

// console.log(getHistory()); 需要的数组

// 设置历史记录
function setHistory(key) {
  // 1.获取历史记录  ['1','2']
  var historyArray = getHistory();
  // 2.遍历获取来的历史记录 然后 判断新传入的关键字是否已经在历史记录中了如果在了就删掉
  $.each(historyArray, function (index, item) {
    if (item == key) {
      historyArray.splice(index, 1);
    }
  })
  // 3.把新的关键字添加到历史记录数组中
  historyArray.push(key);
  // 4.把数组转换为字符串 然后放入localStorage中
  window.localStorage.setItem('ltHistory', JSON.stringify(historyArray));
}

// setHistory('nike');

// 删除历史记录
function delHistory(key) {
  // 获取历史记录
  var historyArray = getHistory();
  // 遍历删除
  $.each(historyArray, function (index, item) {
    if (item == key) {
      historyArray.splice(index, 1);
    }
  })
  // 把数组转换为json 放入localStorage
  window.localStorage.setItem('ltHistory', JSON.stringify(historyArray));
}

// delHistory('nike');

// 清空历史记录
function clearHistory() {
  window.localStorage.removeItem('ltHistory');
}

// 展示历史记录(模板 只是用在结构比较复杂的时候)
function showHistory() {
  // 1.获取历史记录(数组)
  var historyArray = getHistory();
  // console.log(historyArray);
  // 2.渲染数据 template(id,对象)
  var historyResult = template('history-template', { arr: historyArray });
  // 3.把数据写入页面中
  $('.history').html(historyResult);
}

showHistory();


// 历史记录搜索框输入什么都会跳转 我想的是应该输入能匹配到的才能跳转