// 文章模型
const { Post, validatePost } = require('../../../model/Post');

module.exports = async (req, res) => {
    try {
        // 数据格式验证
            const { error } = validatePost(req.fields);
            // 格式不符合要求
            if (error) return res.status(400).send({message: error.message})
            // 通过验证
            // 添加作者
            req.fields.author = req.session.userInfo._id;
            // 创建文章
            const post = new Post(req.fields);
            // 保存文章
            await post.save();
            // 响应
            res.send(post);
    } catch(ex) {
        next(ex)
    }
    
}