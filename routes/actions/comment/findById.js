// 评论模块
const { Comment } = require('../../../model/Comment');
// 验证模块
const Joi = require('joi');
module.exports = async (req, res) => {
    // 根据文章id查询评论
    const id =  req.params['id'];
    // 验证模型
    const schema = Joi.string().required().regex(/^[0-9a-fA-F]{24}$/).error(new Error('评论id非法'));
    // 验证
    const { error } = Joi.validate(id, schema);
    // 数据格式没有通过
    if (error) return res.status(400).send({message: error.message})
    // 通过验证
    // 查询评论
    const comment = await Comment.find({post: id,state: 1}).populate('author','-password').sort('-createAt')
    // 响应
    return res.send(comment);
    
}