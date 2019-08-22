(function (w) {

    w.moveStop = function (box, content, scroll) {
        var timeInt = null;

        //阻止浏览器默认动作
        box.addEventListener('touchstart', function (e) {
            e.preventDefault();
        });

        //计算滚动条高度
        scroll.style.height = box.clientHeight / content.offsetHeight * box.clientHeight + 'px';

        //开启3D加速
        myTransform(content, 'translateZ', 0);

        //监听touchstart
        box.addEventListener('touchstart', function (e) {
            content.style.transition = 'none';
            scroll.style.opacity = 1;
            var touch = e.changedTouches[0];
            this.touchStartY = touch.clientY;
            this.eleStartY = myTransform(content, 'translateY');
            this.disY = 0;
            this.startTime = (new Date).getTime();
            clearInterval(timeInt);
        });

        //监听touchmove
        box.addEventListener('touchmove', function (e) {
            var touch = e.changedTouches[0];
            var touchEndY = touch.clientY;
            this.disY = touchEndY - this.touchStartY;
            var translateY = this.eleStartY + this.disY;

            //判断临界值
            if (translateY > 0) {
                var scale = 1 - translateY / (box.clientHeight * 1.5);
                translateY = translateY * scale;
            } else if (translateY < box.clientHeight - content.offsetHeight) {
                var endY = box.clientHeight - (content.offsetHeight + translateY);
                var scale = 1 - endY / (box.clientHeight * 1.5);
                translateY = (box.clientHeight - content.offsetHeight) - endY * scale;
            }

            getScroll(translateY);
            myTransform(content, 'translateY', translateY);
        });
        //监听touchend
        box.addEventListener('touchend', function () {
            var endTime = (new Date).getTime();
            var disTime = endTime - this.startTime;
            var speed = this.disY / disTime * 200;

            if (disTime < 300){
                var translateY = myTransform(content,'translateY') + speed;
            } else {
                var translateY = myTransform(content, 'translateY') ;
            }


            var scrollEnd = myTransform(scroll, 'translateY');


            var type = 'ease';
            if (translateY > 0) {
                translateY = 0;
                type = 'backEaseOut';
            } else if (translateY < box.clientHeight - content.offsetHeight) {
                translateY = box.clientHeight - content.offsetHeight;
                type = 'backEaseOut';
            }
            if (scrollEnd > box.clientHeight - scroll.offsetHeight) {
                scrollEnd = box.clientHeight - scroll.offsetHeight;
            } else if (scrollEnd < 0) {
                scrollEnd = 0;
            }
            myTransform(scroll, 'translateY', scrollEnd);
            moveTween(content, translateY, 500, type);
        });
        box.addEventListener('transitionend',function () {
            scroll.style.opacity = 0;
        });

        //封装Tween算法
        /**
         * 即点即停函数
         * @param ele：元素名
         * @param translateY：要移动的距离
         * @param timer：持续时间
         * @param type：类型默认是ease
         */
        function moveTween(el, translateY, timer, type = 'ease') {
            //定义tween变量
            var Tween = {
                backEaseOut: function (t, b, c, d, s) {
                    if (s == undefined) s = 1.70158;
                    return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
                },
                Linear: function (t, b, c, d) { //t==当前时间，b==初始值，c==变化量，d==持续时间
                    return c * t / d + b;
                },
                ease: function (t, b, c, d) {
                    return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
                }
            };
            // 定义tween的4个参数
            var t = 0; //当前时间
            var b = myTransform(el, 'translateY'); //初始值
            var c = translateY - b;
            var d = timer;

            //使用定时器来改变tween
            timeInt = setInterval(function () {
                //时间变化
                t += 50;

                //计算当前位置
                var currentTranslateY = Tween[type](t, b, c, d);

                // 设置位置
                myTransform(el, 'translateY', currentTranslateY);
                getScroll(currentTranslateY);
                // 判断持续时间到达，结束定时器
                if (t > d) {
                    clearInterval(timeInt);
                }
            }, 20);
        }

        // 设置滚动条的位置
        function getScroll(translateY) {
            //计算滚动距离
            var scrollEndY = translateY / (box.clientHeight - content.offsetHeight) * (box.clientHeight - scroll.offsetHeight);
            //设置滚动距离
            myTransform(scroll, 'translateY', scrollEndY);
        }
    };
})(window);
