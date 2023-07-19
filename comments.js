// create web server
// 1. load modules
var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');
// 2. create web server
var server = http.createServer(function(request,response){
    var parsedUrl = url.parse(request.url);
    var resource = parsedUrl.pathname;
    console.log('resource='+resource);

    // 3. process request
    if(resource == '/'){
        fs.readFile('index.html','utf-8',function(error,data){
            if(error){
                response.writeHead(500,{'Content-Type':'text/html'});
                response.end('500 Internal Server '+error);
            }else{
                response.writeHead(200,{'Content-Type':'text/html'});
                response.end(data);
            }
        });
    }else if(resource == '/comments'){
        if(request.method == 'POST'){
            request.on('data',function(data){
                var parsedStr = qs.parse(data.toString());
                var comment = parsedStr.comment;
                console.log('comment='+comment);
                response.writeHead(200,{'Content-Type':'text/html'});
                response.end(comment);
            });
        }else{
            response.writeHead(200,{'Content-Type':'text/html'});
            response.end('GET method not supported.');
        }
    }else{
        response.writeHead(404,{'Content-Type':'text/html'});
        response.end('404 Page Not Found.');
    }
}
