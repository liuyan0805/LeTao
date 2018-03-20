
			//初始化MUI框架
			mui.init();
			//自调用函数
			(function($) {
			
				//1.#####页面的动态渲染
				getCartData();
				var btnArray = ['确认', '取消'];

				//删除
				$('#OA_task_1').on('tap', '.mui-btn-red', function(event) {
					var elem = this;
					var li = elem.parentNode.parentNode;
					mui.confirm('确认删除该商品吗？', '温馨提示', btnArray, function(e) {
						if (e.index == 0) {
							//######删除 获取当前要删除的那个id 转成数组 ajax发送的data是对象所以再转成对象
							// 需要一个购物车id数组
							var id = elem.dataset.id
							// console.log(id);
							var arr = [];
							arr.push(id);
							var obj = {
								id:arr
							}
							// console.log(obj);
							//发送ajax
							$.ajax({
								type:"GET",
								url:'/cart/deleteCart',
								data:obj,
								success:function(result){
									// console.log(result);
									if(result.success==true){
										mui.toast('删除成功');
									}
								}
							})

							li.parentNode.removeChild(li);
						} else {
							//取消删除
							setTimeout(function() {
								$.swipeoutClose(li);
							}, 0);
						}
					});
				});
			
				//#####编辑 注意：点击编辑按钮的时候获取编辑按钮上的自定义属性值  →然后获取数据 →写模板 →调用模板
				 $('#OA_task_1').on('tap', '.mui-btn-blue', function (event) {
					var elem = this;
					var li = elem.parentNode.parentNode;
					//1.获取编辑商品的数据
					// 需要一个购物车id数组
					var id = elem.dataset.id;
					// 尺码范围
					var productSize = elem.dataset.productSize;
					var productArr = productSize.split('-');
					//鞋码
					var size =  elem.dataset.size;
					//数量
					var num = elem.dataset.num;
					//库存
					var  productNum = elem.dataset.productNum
					//渲染对象
					var obj = {
						id:id,
						data:productArr,
						size:size,
						num:num,
						productnum:productNum
					}
					//2.把数据重新整理一下
					//3.把整理好的数据 渲染到模板中
					var editResult = template("edit-template",obj).replace(/\n/g,'');
					// console.log(editResult);
					mui.confirm(editResult, '编辑商品', btnArray, function(e) {
						//确认按钮
						if (e.index == 0) {
							// elem.parentNode.removeChild(elem);
							//1.1获取数据
							var cartId = id;
							// console.log(cartId);
							//1.2 产品尺码
						    var size = $('span.active')[0].innerHTML;
							//  console.log(size);
							//1.3 产品数量
							var num =  mui('.mui-numbox').numbox().getValue();
							// console.log(num);

							//2.发送ajax请求
							$.ajax({
								type:'POST',
								url:'/cart/updateCart',
								data:{
									id:cartId,
									size:size,
									num:num
								},
								success:function(result){
									// console.log(result);
									if(result.success==true){
										getCartData();
									}
								}
							})

						} else { //取消按钮
							setTimeout(function() {
								$.swipeoutClose(li);
							}, 0);
						}
					});
						//######手动初始化
					mui('.mui-numbox').numbox();
				});
			
			})(mui);

			//#####获取购物车 发送ajax
			function getCartData(){
				$.ajax({
					type:'GET',
					url:'/cart/queryCart',
					data:null,
					success:function(result){
						console.log(result);
						//绑定模板
						var cartResult =  template('cart-template',{data:result});
						//渲染页面
						$('#OA_task_1').html(cartResult);
					}
				})
			}
		
		//点击编辑商品中的span 给span添加active类名
		$('body').on('tap','.edit-size span',function(){
			// console.log(1);
			//删除所有的active类名
			$('.edit-size span').removeClass('active');
			//给当前点击的span添加active类名
			$(this).addClass('active');
		})