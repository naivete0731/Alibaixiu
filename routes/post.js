// 文章模型
const post = require('express').Router();

// 添加文章信息
post.post('/', require('./actions/post/create'))
// 查询所有文章
post.get('/', require('./actions/post/find'))
module.exports = post;