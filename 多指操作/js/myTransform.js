// transform函数的值有：
// translate（px）
// translateX（px）
// translateY（px）
// scale（）
// scaleX（）
// scaleY（）
// rotate（deg）
// skew（deg）
// skewX（deg）
// skewY（deg）

/**
 * 传入3个参数是设置
 * 传入2个参数是获取
 * @param ele 元素
 * @param prop 属性
 * @param value 属性值
 * @returns {*}
 */
(function (w) {
    w.myTransform = function (ele, prop, value) {
        //    一上来先判断元素中是否有transform,如果没有就设置到transformNode中，如果有就直接添加
        if (ele.transformNode === undefined) {
            ele.transformNode = {};//
        }

        //判断是设置还是获取
        if (arguments.length >= 3) {//传三个参数，设置transform
            //把值设置到transformNode中
            ele.transformNode[prop] = value;
            //    设置CSS,添加单位
            var res = '';
            for (var key in ele.transformNode) {
                //    根据不同transform值，添加不同的单位 transform：translate（10px）
                switch (key) {
                    case 'translate':
                    case 'translateX':
                    case 'translateY':
                    case 'translateZ':
                        res += key + '(' + ele.transformNode[key] + 'px) ';
                        break;
                    case 'rotate':
                    case 'skew':
                    case 'skewX':
                    case 'skewY':
                        res += key + '(' + ele.transformNode[key] + 'deg) ';
                    case 'scale':
                    case 'scaleX':
                    case 'scaleY':
                        res += key + '(' + ele.transformNode[key] + ') ';
                }
            }
            //    给元素添加CSS样式
            ele.style.transform = res;
        } else if (arguments.length === 2) {//传两个参数，获取transform
            //    判断一下之前有没有设置过
            if (ele.transformNode[prop] === undefined) {
                if (prop === 'scale' || prop === 'scaleX' || prop === 'scaleY') {
                    var value = 1;
                } else {
                    var value = 0;
                }
            } else {
                var value = ele.transformNode[prop];
            }
            return value;
        }
    }
})(window);
