function addClass(node,className){
    var reg=new RegExp("\\b"+className+"\\b"); //'active'
    if(!reg.test(node.className)){
        node.className +=(" "+className);
    }
}
