// 验证模块
const Joi = require('joi');
// 分类模块
const { Category } = require('../../../model/Category');
module.exports = async (req, res) => {
    // 获取用户id
    const id = req.params['id'];
    // 验证模型
    const schema = Joi.string().required().regex(/^[0-9a-fA-f]{24}$/).error(new Error('分类id非法'))

    // 单个删除
    // 验证
    const { error } = Joi.validate(id, schema);
    // 数据格式没有通过
    if (error) return res.status(400).send({message: error.message});
    // 通过验证
    // 删除分类
    let category = await Category.findByIdAndDelete(id);
    // 响应
    res.send(category)
}