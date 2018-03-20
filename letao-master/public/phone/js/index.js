// 让轮播图动起来
var gallery = mui('.mui-slider');
gallery.slider({
  interval: 5000//自动轮播周期，若为0则不自动播放，默认为0；
});


// https://ustbhuangyi.github.io/better-scroll/doc/ 更好的区域滚动插件
// 大而全: 一个项目只用一个框架 这个框架 包含了项目的各种插件和功能
      // 特点: 学习成本比较高 但是一单学会  那么各种功能都解决了
      //       太大了  很全 但是项目一旦出现bug或者解决不了的问题 很难改
// 小而美: 一个项目用了很多不同插件  用各种插件开发了项目
      // 特点: 学习的插件比较多  用各种插件堆功能
      //        如果某一个插件不能用了 可以立马换 不影响其他人和其他功能
      //     


//  选插件 一定选择 大家用都用的  这样bug少 

// 区域滚动
mui('.mui-scroll-wrapper').scroll({
  scrollY: true, //是否竖向滚动
  scrollX: false, //是否横向滚动
  startX: 0, //初始化时滚动至x
  startY: 0, //初始化时滚动至y
  indicators: true, //是否显示滚动条
  deceleration:0.0006, //阻尼系数,系数越小滑动越灵敏
  bounce: true //是否启用回弹
});


$('.mui-content').on('click','a',function(){
  console.log(1);
})