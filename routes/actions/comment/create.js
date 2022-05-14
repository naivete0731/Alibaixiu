// 评论模型
const { Comment, vaildateComment, validateComment } = require('../../../model/Comment');
const { Post } = require('../../../model/Post');

module.exports = async (req, res) => {
    if (req.session.userInfo) {
        // 存储评论人信息
        req.fields.author = req.session.userInfo._id;
        // 数据格式验证
        const { error } = validateComment(req.fields);
        // 格式不符合要求
        if (error) return res.status(400).send({message: error.message})
        // 创建评论
        const comment = new Comment(req.fields);
        // 保存评论
        await comment.save();
        // 找到被评论的文章
        let post = await Post.findOne({_id: req.fields.post});
        // 更新评论数量
        post.meta.comments = post.meta.comments + 1;
        // 保存文章信息
        await post.save();
        // 响应
        res.send(comment);
    } else {
        res.status(400).send({message: '请登录'})
    }
}