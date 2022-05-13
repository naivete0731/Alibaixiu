// 评论模块
const { Comment } = require('../../../model/Comment');
// 分页
const pagination = require('mongoose-sex-page');
// 工具
const _ = require('lodash');

module.exports = async (req, res) => {
    // 当前也
    let page = +req.query.page;
    if (!page || !_.isNumber(page)) page = 1;
    // 查询用户信息
    const posts = await pagination(Comment).page(page).size(10).display(5).populate('author', '-password').populate('post', '-content -meta').exec();
    // 响应
    res.send(posts);
}