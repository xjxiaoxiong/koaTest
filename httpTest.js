var http = require("http");
var url = require("url");
var querystring = require('querystring')

http.createServer(function(req, res) {
    var pathname = url.parse(req.url);
    var query = querystring.parse(pathname.query);

    if(req.method === 'POST'){
        console.log('这是接受post请求')
    } else if(req.method === 'GET'){
        console.log('这是一个get请求')
    }

    if (pathname.pathname === '/get') { //处理localhost:8000/getDo
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.write("Hello World");
        res.end();
    } else if (pathname.pathname === '/post') { //处理localhost:8000/postDo
        postTest(res);
    } else if (pathname.pathname === '/test') {
        var jsonData = '';
        req.on("data", function(data) {
            jsonData += data
            console.log('接受数据中。。。');
        });
        req.on("end", function() {
            console.log('接受完成!');
            console.log(querystring.parse(jsonData));
        })
    }


}).listen(8888);

function postTest(res) {
    var postData = querystring.stringify({
        'msg': 'Hello World!'
    })
    //发送post请求localhost:8000/test并带上参数postData
    var options = {
        hostname: 'localhost',
        port: 8888,
        path: '/test',
        method: 'POST',
        headers: {
            'Content-Type': '"text/plain',
            'Content-Length': postData.length
        }
    };

    var req = http.req(options);

    req.write(postData);
    req.end()
}
