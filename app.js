//引入express框架
const express = require('express');
//引入数据库处理模块
const mongoose = require('mongoose');
//引入路径处理模块
const path = require('path');
//引入session模块
var session = require('express-session');
/// 处理文件上传
const formidableMiddleware = require('express-formidable');
// 创建服务器
const app = express();
// 开放静态路由
app.use(express.static(path.join(__dirname, 'public')));
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
    }
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

require('./model/connent');

//路由
require('./routes')(app);
//返回系统监听
app.listen(3000)
console.log('服务器启动成功');