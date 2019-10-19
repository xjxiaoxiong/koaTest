var http = require('http');

var server = new http.Server();
server.on('request', (req, res)=>{
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('Hello Http Server');
    res.end();
});
server.listen(3000);