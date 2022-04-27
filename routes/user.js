// 用户路由
const user = require('express').Router();

// 查询所有用户信息
user.get('/', require('./actions/user/find'))

module.exports = user;