const Koa = require('koa');
const Router = require('koa-router')
const app = new Koa();
const router = Router()
// logger

// app.use(async (ctx, next) => {
//   await next();
//   const rt = ctx.response.get('X-Response-Time');
//   console.log(`${ctx.method} ${ctx.url} - ${rt}`);
// });

// x-response-time

app.use(async (ctx, next) => {
  const start = Date.now();
  console.log(ctx.request == ctx.req);

  await next();
  const ms = Date.now() - start;
  ctx.set('X-Response-Time', `${ms}ms`);
  console.log('X-Response-Time', `${ms}ms`)
});

app.use((ctx, next) => {
  let i =0;
  console.log(i++);
  
  console.log('这是一个普通函数1');
  next()
});


app.use((ctx, next) => {
  console.log('这是一个普通函数2', ctx.app == ctx.request.app);
  throw Error('测试')
  next()
});

router.get('/test', async(ctx, next) => {
  ctx.body = 'hello'
})

app.use(router.routes())

app.on('error',async (err) => {
  console.log('触发了', err)
})
//
// app.use(async (ctx, next)=>{
// 	console.log('1 up')
// 	app.env = "dev";
//
// 	await next();
//
// 	console.log(ctx.state)
// 	console.log('1 down')
// })
//
// app.use( async (ctx, next)=>{
// 	console.log('2 up');
// 	await next();
// 	const rt = ctx.response.get('X-Response-Time');
// 	console.log(`2 ${rt}`)
// 	console.log('2 down')
// })
//
// app.use( (ctx, next)=>{
// 	console.log('3 up');
//
// 	next();
// 	console.log(ctx.app)
// 	console.log('3 down')
// })
//
// app.use( (ctx, next)=>{
// 	console.log('4 up');
//
// 	next();
// 	ctx.state = {
// 		name:'123'
// 	}
// 	console.log('4 down')
// 	console.log(app.env)
// })
//
// app.use( async (ctx, next)=>{
// 	if (ctx.request.path === '/') {
//         ctx.response.body = 'index page';
//         next();
//     } else {
//         await next();
//     }
// })

// response

// app.use(async ctx => {
// 	ctx.cookies.set('tok','12344')
// 	setTimeout(()=>console.log('body',ctx.url, ctx.ip, ctx.etag),1000);
// 	ctx.status = 415;
//   ctx.body = 'Hello World';
//   // ctx.throw(401);
// });

app.listen(3000);
