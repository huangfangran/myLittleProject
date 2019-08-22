//判断数据类型
function getTypeOf(data) {
    let str = Object.prototype.toString.call(data)
    return str.slice(8,-1)
}
//深度克隆，拆到不能再拆
function deepClone(data) {
    let result = null;
    //判断传进来的数据是什么类型
    if (getTypeOf(data) === 'Array'){
        result = [];
    } else if (getTypeOf(data) === 'Object'){
        result = {};
    } else {
        return data;
    }

    //循环遍历传进来的数据
    for(let key in data){
        if (getTypeOf(data[key] === 'Array' || getTypeOf(data[key] === 'Object'))){
            result[key] = deepClone(data[key]);
        } else {
            result[key] = data[key]
        }
    }
    return result;
}