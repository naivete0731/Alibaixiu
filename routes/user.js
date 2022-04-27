// 用户路由
const user = require('express').Router();

// 创建用户
user.post('/', require('./actions/user/create'))
// 查询所有用户信息
user.get('/', require('./actions/user/find'))

module.exports = user;