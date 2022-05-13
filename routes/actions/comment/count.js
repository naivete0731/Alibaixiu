// 评论模块
const { Comment } = require('../../../model/Comment');

module.exports = async (req, res) => {
    // 查询所有文章数量
    const commentCount = await Comment.countDocuments();
    const draftCount = await Comment.countDocuments({state: 0})
    // 响应
    res.send({commentCount, draftCount});
}