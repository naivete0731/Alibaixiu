// 评论模块
const { Comment } = require('../../../model/Comment');

module.exports = async (req, res) => {
    try {
    // 查询评论
        const comment = await Comment.find().populate('author', '-password').sort('-createAt').limit(5);
        // 响应
        res.send(comment);
    } catch(ex) {
        next(ex)
    }
   
}