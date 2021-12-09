# demo
tui song ben di xiang mu dao git
const http = require('http')
const fs = require('fs')
const url = require('url')
http.createServer((req, res) => {
    let pathObj = url.parse(req.url, true)
    switch (pathObj.pathname) {
        case '/getWeather':
            if(pathObj.query.city === 'beijing')
                res.end(JSON.stringify({city: 'beijing', weather: 'sunny'})) 
            else 
                res.end(JSON.stringify({city: pathObj.query.city, weather: 'unknown'})) 
            break
        default:
            try {
                let pathname = pathObj.pathname === '/' ? '/index.html' : pathObj.pathname
                res.end( fs.readFileSync(__dirname + pathname) )
            } catch(e) {
                res.writeHead(404, 'Not Found')
                res.end('<h1>404 Not Found~</h1>')
            }  
    }
}).listen(8080)
创建一个虚拟服务器监听8080端口，服务器收到请求后分析请求中的参数，如果请求参数（‘/’后的内容）为有获取天气字段，在进行判断对象中有city=对象，则返回数据给浏览器相关对象，否则判断是文件还是路径返回读取的内容，
如果报错了返回404
