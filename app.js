const http  = require('http');
const fs = require('fs');

const server = http.createServer((req,res)=>{
   // console.log(req.url,req.method,req.headers);
    const url=req.url;
    const method =req.method;
    if(url==='/'){
        res.setHeader('Contet-Type','text/html');
        res.write('<html>');
        res.write('<head><tittle>Enter message</tittle></head>');
        res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>');
        res.write('</head>');
        res.write('</html>');
        res.end();
        return res.end();
    }
    if(url=== '/message' && method ==='POST'){
        const body=[];
        req.on('data',(chunk)=>{
            console.log(chunk);
            body.push(chunk);
        });
        req.on('end',()=>{
            const parsedBody = Buffer.concat(body).toString();
            const message =parsedBody.split('=')[1];
            fs.writeFileSync('message.txt',message);
        });
        fs.writeFileSync('message.txt','DUMMY');
        res.statusCode = 302;
        res.setHeader('Location','/');
        return res.end();
    }
    res.setHeader('Contet-Type','text/html');
    res.write('<html>');
    res.write('<head><tittle>My firts page</tittle></head>');
    res.write('</head>');
    res.write('</html>');
    res.end();
});

server.listen(3000);