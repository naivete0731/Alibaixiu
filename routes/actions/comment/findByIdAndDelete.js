// 评论模块
const { Comment } = require('../../../model/Comment');
// 验证模块
const Joi = require('joi');

module.exports = async (req, res) => {
    try {
    // 获取评论id
        const id = req.params['id'];
        // 验证模型
        const schema = Joi.string().required().regex(/^[0-9a-fA-F]{24}$/).error(new Error('评论id非法'))
        // 如果id中存在
        if(id.indexOf('-') != -1) {
            // 批量删除
            // 将字符串分割为数值
            const ids = id.split('-');
            // 存储结果数值
            const  result = [];
            // 验证
            for (const item of ids) {
                let { error } = Joi.validate(item, schema);
                // 没有通过
                if (error) return res.status(400).send({message: error.message})
            }
            // 通过验证
            for (const item of ids) {
                // 删除评论
                let comment = await Comment.findByIdAndDelete(item);
                result.push(comment);
            }
            res.send(result);
        } else {
             // 验证
        const { error } = Joi.validate(id, schema);
        // 数据格式没有通过验证
        if (error) return res.status(400).send({message: error.message})
        // 通过验证
        let comment = await Comment.findByIdAndDelete(id);
        // 响应
        res.send(comment);
        }
       
    } catch(ex) {
        next(ex)
    }
    
}