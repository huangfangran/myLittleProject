//引入http
let http = require('http');
//创建服务器对象
let server = http.createServer(function (request,response) {
    response.setHeader('content-type','text/html;charset=utf-8')
    response.end('我是数据头啊')
})
//绑定端口运行
server.listen(3000,function (err) {
    if (err) console.log(err)
    else console.log('服务器成功运行')
})