// 评论模块
const { Comment } = require('../../../model/Comment');
// 验证模块
const Joi = require('joi');

module.exports = async (req, res) => {
    // 待修改的评论id
    const id = req.params['id'];
    // 定义对象验证规则
    const schema = Joi.string().required().regex(/^[0-9a-fA-F]{24}$/).error(new Error('评论id非法'))
    // 验证
    const { error } = Joi.validate(id, schema);
    // 数据没有通过验证
    if (error) return res.status(400).send({message: error.message})
    // 通过验证
    let comment = await Comment.findByIdAndUpdate(id, {$set: {state: req.fields.state}}, {new: true});
    // 响应
    res.send(comment);
}