// 文章模块
const { Post } = require('../../../model/Post');

module.exports = async (req, res) => {
    try {
    const posts = await Post.find({state: 1}).select('-content').limit(4).sort('-meta.comments')
        // 响应
        res.send(posts);
    } catch(ex) {
        next(ex)
    }
    
}