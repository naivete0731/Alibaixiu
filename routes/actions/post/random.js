// 文章模块
const { Post } = require('../../../model/Post')
// 随机
require('mongoose-query-random');

module.exports = async (req, res) => {
    try {
    // 随机获取文章
        Post.find().random(5, true, (err, docs) => {
            res.send(docs);
        })
    } catch(ex) {
        next(ex)
    }
   
}