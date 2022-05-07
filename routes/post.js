// 文章模型
const post = require('express').Router();

// 添加文章信息
post.post('/', require('./actions/post/create'))
// 查询所有文章
post.get('/', require('./actions/post/find'))
// 根据分类获取文章列表 
post.get('/category/:id', require('./actions/post/category'))
// 根据文章id获取文章信息
post.get('/:id', require('./actions/post/findById'))
// 根据id修改文章
post.put('/:id', require('./actions/post/findByIdAndUpdate'))
// 根据id删除文章
post.delete('/:id', require('./actions/post/findByIdAndDelete'))
module.exports = post;