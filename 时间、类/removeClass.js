function removeClass(node,className){
    if(node.className){
        var reg=new RegExp("\\b"+className+"\\b");
        var classes = node.className;
        node.className=classes.replace(reg,"");
    }
}
