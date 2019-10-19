let simpleKoa = require('./application');
let app = new simpleKoa();

let responseData = {};
// 对ctx进行扩展
app.context.echoData = function (errno = 0, data = null, errmsg = '') {
    this.res.setHeader('Content-Type', 'application/json;charset=utf-8');
    this.body = {
        errno: errno,
        data: data,
        errmsg: errmsg
    };
};

app.use(async (ctx, next) => {
    let data = {
        name: 'tom',
        age: 16,
        sex: 'male'
    }
    // console.log('ctx.echoData', ctx.echoData);
    // 这里使用扩展，方便的返回utf-8格式编码，带有errno和errmsg的消息体
    ctx.echoData(0, data, 'success');
    await next();
});

// app.use(async (ctx, next) => {
//     responseData.name = 'tom';
//     await next();
//     ctx.body = responseData;
// });

// app.use(async (ctx, next) => {
//     responseData.age = 16;
//     await next();
// });

// app.use(async ctx => {
//     responseData.sex = 'male';
// });

app.use(async (ctx, next) => {
    ctx.body = 'hello ' + ctx.query.name;
    await next();
});

app.use(async ctx => {
    responseData.sex = 'male';
    // 这里发生了错误，抛出了异常
    throw new Error('oooops');
});

app.on('error', (err) => {
    console.log('err.stack', err.stack);
});

app.listen(3000, () => {
    console.log('listening on 3000');
});
