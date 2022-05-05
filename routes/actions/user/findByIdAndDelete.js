// 用户模块
const { User } = require('../../../model/user')
// 验证模块
const Joi = require('joi')
// 路径模块
const path = require('path');
// 文件模块
const fs = require('fs');
// 方法改进
const { promisify } = require('util')
// 删除文件
const unlink = promisify(fs.unlink);

module.exports = async (req, res) => {
    // 获取用户id
    const id = req.params['id'];
    // 模型验证
    const schema = Joi.string().required().regex(/^[0-9a-fA-F]{24}$/).error(new Error('用户id非法'))
    // 单个删除
    // 验证
    const { error } = Joi.validate(id, schema);
    // 数据格式没有通过
    if (error) return res.status(400).send({message: error.message})
    // 通过验证
    // 删除验证
    let user = await User.findByIdAndDelete(id);
    // 如果缩略图存在
    if (user.avatar) {
        // 删除缩略图
        await unlink(path.join(__dirname, '../','../','../', 'public', user.avatar))
    }
    // 响应
    res.send(user);
}