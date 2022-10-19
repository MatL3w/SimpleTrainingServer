const http  = require('http');

const server = http.createServer((req,res)=>{
    console.log(req.url,req.method,req.headers);

    res.setHeader('Contet-Type','text/html');
    res.write('<html>');
    res.write('<head><tittle>My firts page</tittle></head>');
    res.write('</head>');
    res.end();
});

server.listen(3000);