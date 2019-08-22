function changeTime(time){
    time = parseInt(time); //3000
    var h=toZero(Math.floor(time/3600));
    var m=toZero(Math.floor(time%3600/60)); //0-59
    var s=toZero(Math.floor(time%60));//0-59
    return h+":"+m+":"+s;
}
function toZero(mun){
    if(mun<10){
        mun = "0"+mun;
    }else{
        mun = ""+mun;
    }
    return mun;
}
