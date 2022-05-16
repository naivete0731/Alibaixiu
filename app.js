//引入express框架
const express = require('express');
//引入数据库处理模块
const mongoose = require('mongoose');
//引入路径处理模块
const path = require('path');
//引入session模块
var session = require('express-session');
// const template = require('art-template');
// 引入morgan模块
const morgan = require('morgan');
// 引入config模块
const config = require('config');
const MongoStore = require('connect-mongo');
// 处理文件上传
const formidableMiddleware = require('express-formidable');
// 创建服务器
const app = express();

// 开放静态路由
app.use(express.static(path.join(__dirname, 'public')));
// 告诉express框架模板的默认后缀是什么

// session配置
app.use(session({
    // 生成密钥
    secret: 'keyboard cat',
    // 是否强制保存会话,即使未被修改也要保存,默认为true
    resave: false,
    // 强制将'未初始化'的会话保存到存储中,当会话是新的但未被修改时,它是未初始化的
    saveUninitialized: false,
    cookie: {
        maxAge: 25 * 60 * 60 * 1000
    },
store: MongoStore.create({
	mongoUrl: `mongodb://${config.get('db.user')}:${config.get('db.pwd')}@localhost:27017/alibaixiu`
	})
}))
// 处理post请求
app.use(formidableMiddleware({
    // 文件上传目录
    uploadDir: path.join(__dirname, 'public', 'uploads'),
    // 最大上传文件为
    maxFileSize: 10 * 1024 * 1024,
    // 保留文件扩展名
    keepExtensions: true
}))

require('./model/connect');

// console.log(process.env);

if (process.env.NODE_ENV == 'development') {
    // 开发环境
    console.log('is the development');
    // 在开发环境中 将客户端发送到服务器端的请求信息打印到控制台中
    app.use(morgan('dev'))
} else {
    // 生产环境
    console.log('is the production');
    app.use(morgan('dev'))
}
//路由
require('./routes')(app);
app.use((err,req,res,next) => {
    res.status(500).send(err.message)
})
app.use((req,res,next) => {
    res.status(404).redirect(path.join('404.html'))
})
// app.get('/siwa', (req, res) => {
//     // 生成错误
//     throw new Error('程序发生了错误')
// })
// 以/(斜杠)传参方式
// app.get('/index/:id/:name/:sex', (req, res) => {
//     //接收 
//     res.send(req.params);
// })
//返回系统监听
app.listen(3000)
console.log('服务器启动成功');



// 改善请求以/的方式传参
// 用 try catch 
