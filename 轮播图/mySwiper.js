(function(w) {
	/**
	 * @param {
		 * @param ele：要添加的轮播元素
		 * @param dotList：小圆点包裹元素 默认false（没有小圆点）
		 * @param isAutoPlay：是否自动播放 默认false
		 * @param time：自动播放事件间隔 默认1000
		 * @param isGPU：是否开启3D加速 默认false
	 } option
	 *
	 */
	w.mySwiper = function(option) {
		if (!option) {
			console.error('ele选项必须指定');
			return;
		}

		var caro = option.ele;
		var dotList = option.dotList || false;
		var isAutoPlay = option.isAutoPlay || false;
		var time = option.time || 1000;
		var isGPU = option.isGPU || false;

		caro.classList.add('caro');

		var caroList = caro.querySelector('.caroList');
		var caroItemsNum = caro.querySelectorAll('.caroItem').length;
		var index = 0;

		//判断是否开启3D加速
		if (isGPU){
			myTransform(caroList,'translateZ',0);
		}

		// 判断是否有小圆点,如果有，就动态创建小圆点
		if (dotList) {
			dotList.classList.add('dotList');
			for (var i = 0; i < caroItemsNum; i++) {
				var span = document.createElement('span');
				dotList.appendChild(span);
				span.classList.add('dotItem');
			}
			var dotItems = caro.querySelectorAll('.dotItem');
		}


		//添加一组li
		caroList.innerHTML += caroList.innerHTML;
		// 重新获取所有li
		var caroItems = document.querySelectorAll('#box .caro .caroList .caroItem');

		//给caro、caroList、caroItem设置宽、高
		caro.style.width = document.documentElement.offsetWidth + 'px';
		caroList.style.width = caroItems.length * 100 + '%';
		caroItems.forEach(function(item) {
			item.style.width = 100 / caroItems.length + '%';
		});

		// 初始化,让小圆点默认选中
		caroLi(index);

		// 判断是否自动轮播
		if (isAutoPlay) {
			var timer = setInterval(autoPlay, time);
		}

		//给轮播图的盒子添加touchstart
		caro.addEventListener('touchstart', function(e) {
			if (isAutoPlay) {
				clearInterval(timer);
			}
			caroList.style.transition = 'none';
			//    判断无缝临界点
			if (index <= 0) {
				index = 5;
				myTransform(caroList, 'translateX', -index * caro.clientWidth);
			} else if (index >= caroItems.length - 1) {
				index = caroItemsNum - 1;
				myTransform(caroList, 'translateX', -index * caro.clientWidth);
			}
			//    获取触点、触点当前位置、元素初始位置
			var touch = e.targetTouches[0];
			this.touchStartX = touch.clientX;
			this.touchStartY = touch.clientY;
			this.eleStartX = myTransform(caroList, 'translateX');
			this.disX = 0;
			//定义第一次滑动
			this.firstTouch = true;
			//定义是第一次滑动是水平方向
			this.isFirstMove = true;
			//定义时间戳
			this.timeFast = (new Date).getTime();
		});

		//给轮播图的盒子添加touchmove
		caro.addEventListener('touchmove', function(e) {
			// 判断不是水平滑动
			if (!this.isFirstMove) {
				this.disX = 0;
				return;
			}
			//    获取触点、触点结束位置、触点移动距离、元素结束位置、设置元素的left值
			var touch = e.targetTouches[0];
			var touchEndX = touch.clientX;
			var touchEndY = touch.clientY;
			this.disX = touchEndX - this.touchStartX;
			var disY = touchEndY - this.touchStartY;
			//判断第一次滑动
			if (this.firstTouch) {
				this.firstTouch = false;
				//判断水平滑动距离大，还是垂直滑动距离大
				if (Math.abs(disY) > Math.abs(this.disX)) {
					//    垂直滑动 > 水平滑动 == 垂直滑动
					this.disX = 0;
					this.isFirstMove = false;
					return;
				}
			}
			//计算ul的移动距离
			var translateX = this.disX + this.eleStartX;
			//设置ul的translate值
			myTransform(caroList, 'translateX', translateX);
			e.stopPropagation();
			e.preventDefault();
		});

		//给轮播图的盒子添加touchend
		caro.addEventListener('touchend', function(e) {
			var timeEndFast = (new Date).getTime();
			var disTimeFast = timeEndFast - this.timeFast;
			if (disTimeFast < 300) {
				if (this.disX > 0) {
					index--;
				} else if (this.disX < 0) {
					index++;
				}
			} else {
				//    判断滑动距离是否超过屏幕一半
				index = -Math.round(myTransform(caroList, 'translateX') / caro.clientWidth);
			}
			//判断index的临界值
			if (index < 0) {
				index = 0;
			} else if (index > caroItems.length - 1) {
				index = caroItems.length - 1;
			}
			caroLi(index);
			caroList.style.transition = '.5s';
			if (isAutoPlay) {
				timer = setInterval(autoPlay, time);
			}
		});

		//轮播图中的ul的left值
		function caroLi(num) {
			myTransform(caroList, 'translateX', -num * caro.clientWidth);
			if (dotList) {
				//    小圆点切换
				dotItems.forEach(function(item) {
					item.classList.remove('active');
				});
				dotItems[num % caroItemsNum].classList.add('active');
			}
		}


		//自动轮播
		function autoPlay() {
			if (index >= caroItems.length - 1) {
				caroList.style.transition = 'none';
				index = caroItemsNum - 1;
				myTransform(caroList, 'translateX', -index * caro.clientWidth);
			}
			index++;
			caroLi(index);
			caroList.style.transition = '.5s';
		}
	}
})(window);
