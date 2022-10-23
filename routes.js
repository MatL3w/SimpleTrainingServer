const fs = require('fs');

function requestHandler(req,res){
    const url = req.url;
    const method = req.method;
    if(url==='/'){
        res.write('<html>');
        res.write('<head><tittle>Greetings</tittle></head>');
        res.write('</head>');
        res.write('</html>');
        return res.end();
    }
if(url==='/create-users'){
    res.write('<html>');
    res.write('<head><tittle>Add New User</tittle></head>');
    res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>');
    res.write('</head>');
    res.write('</html>');
    return res.end();
}
if(url=== '/message' && method ==='POST'){
    const body=[];
    req.on('data',(chunk)=>{
        console.log(chunk);
        body.push(chunk);
    });
   return req.on('end',()=>{
        const parsedBody = Buffer.concat(body).toString();
        const message =parsedBody.split('=')[1];
        fs.appendFile('./message.txt',message+"\n",(err)=>{
        });
        res.statusCode = 302;
        res.setHeader('Location','/');
        return res.end();
    });
}
if(url==='/users'){
    const data = fs.readFileSync('./message.txt');
    const str = data.toString().split('\n');
    res.write('<html>');
    res.write('<head><tittle>Greetings</tittle></head>');
    for(let i=0;i<str.length;i++){
        res.write(`<ul><li>${str[i]}</li></ul>`);
    }
    res.write('</head>');
    res.write('</html>');
    return res.end();
}
}

// module.exports = {
//     handler: requestHandler,
//     text: 'same text',
// };

module.exports.handler=requestHandler;
module.exports.someText='some text';