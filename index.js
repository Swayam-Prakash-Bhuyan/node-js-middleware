var express = require('express');
var app = express();
var PORT = process.env.PORT || 3000;

app.get('/example',(req,res)=>{
    res.send('Hello from the example route')
});

app.get('/example/c',(req,res) => {
    res.send('Hello from sub route C!')
});

app.get('/example/b',(req,res) => {
    res.send('Hello from sub route B!')
});

let callbackOne = (req,res,next) => {
    console.log('callBackOne');
    next();
};

let callbackTwo = (req,res,next) => {
    console.log('callbackTwo');
    next();
};

let callbackThree = (req,res) => {
    console.log('callbackThree says hello from route C!');
    res.send('callbacks triggered');
}

app.get(
    '/example/d',
    (req,res,next) => {
        console.log('the response will be sent by the next function ...');
        next();
    },
    (req,res) => {
        res.send('Hello from D!');
    }
);

app.get('/example/c/withmiddleware',[callbackOne,callbackTwo,callbackThree]);

app.listen(PORT,() => {
    console.log(`Listening on port: ${PORT}`);
});