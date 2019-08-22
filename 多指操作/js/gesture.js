(function (w) {
    /**
     * 封装多指操作
     * @param callback  对象，可以指定3个回调函数
     *      start       手势事件开始
     *      change      多指手势移动
     *      end         手势事件结束
     */
    w.gesture = function (node, callback) {

        // 手势开始  当有手指触摸元素，且此时屏幕上手指数量>=2
        node.addEventListener('touchstart', function (event) {
            // 如果此时屏幕上手指个数 >= 2
            if (event.touches.length >= 2) {
                // 调用回调函数
                if (callback && typeof callback['start'] === 'function') {
                    callback['start'](event);
                }
                // 计算两根手指的初始距离
                node.startDst = getDistance(event.touches[0], event.touches[1]);
                // 计算两根手指的初始角度
                node.startDeg = getDeg(event.touches[0], event.touches[1]);

                // 添加标记，标记是否触发 start
                node.isStarted = true;
            }
        });

        // 手势移动 当有手指在元素上移动，且此时屏幕上手指数量>=2
        node.addEventListener('touchmove', function (event) {
            // 如果此时屏幕上手指个数 >= 2
            if (event.touches.length >= 2) {
                // 计算此时两根手指之间的距离
                var currDst = getDistance(event.touches[0], event.touches[1]);

                // 计算此时两根手指之间的角度
                var currDeg = getDeg(event.touches[0], event.touches[1]);

                // 计算比例  当前距离/初始距离
                event.scale = currDst / node.startDst;

                // 计算滑动角度  当前角度 - 初始角度
                event.rotation = currDeg - node.startDeg;

                //调用回调函数
                if (callback && typeof callback['change'] === 'function') {
                    callback['change'](event);
                }
            }
        });

        // 手势事件结束   当有手指离开元素，判断 此时元素上手指个数<2 并且 之前触发过start
        node.addEventListener('touchend', function (event) {
            // 此时元素上手指个数 < 2 并且 前面触发了 start
            if (node.isStarted && event.targetTouches.length < 2) {
                // 调用回调函数
                if (callback && typeof callback['end'] === 'function') {
                    callback['end'](event);
                }

                // 重新标记start没有触发
                node.isStarted = false;
            }
        });

        /**
         * 计算两个触点之间的长度
         * @param touch1 触点一
         * @param touch2 触点二
         */
        function getDistance(touch1, touch2) {
            //计算水平方向的 直角边长度
            var a = touch2.clientX - touch1.clientX;

            // 计算垂直方向的 直角边长度
            var b = touch2.clientY - touch1.clientY;

            // 计算斜边的长度 勾股定理
            var c = Math.sqrt(a * a + b * b);

            // 返回结果
            return c;
        }

        /**
         * 计算两个触点之间的角度
         * @param touch1 触点一
         * @param touch2 触点二
         */
        function getDeg(touch1, touch2) {
            //计算水平方向的 直角边长度
            var x = touch2.clientX - touch1.clientX;

            // 计算垂直方向的 直角边长度
            var y = touch2.clientY - touch1.clientY;

            // 根据tan值 计算弧度
            var angle = Math.atan2(y, x);

            // 转为角度 返回
            return angle / Math.PI * 180
        }
    }
})(window);