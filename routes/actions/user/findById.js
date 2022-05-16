// 验证模块
const Joi = require('joi');
// 用户模块
const { User } = require('../../../model/user');

module.exports = async (req, res) => {
    try {
    // 获取用户id
        const id = req.params['id'];
        // 验证模型
        const schema = Joi.string().required().regex(/^[0-9a-fA-F]{24}$/).error(new Error('用户id非法'))
        // 验证
        const { error } = Joi.validate(id, schema, {
            // 允许对象包含被忽略的未知键
            allowUnknown: true
        });
        // 数据格式没有通过验证
        if (error) return res.status(400).send({message: error.message})
        // 验证通过
        // 查询用户信息
        const user = await User.findById(id).select('-password')
        // 响应
        return res.send(user);
    } catch (ex) {
        next(ex);
    }
    
}