const { Post, validatePost } = require('../../../model/Post');
// 验证模块
const Joi = require('joi');
// 路径模块
const path = require('path');
// fs模块
const fs = require('fs');
// 方法改善
const { promisify } = require('util');
// 删除文件
const unlink = promisify(fs.unlink);

module.exports = async (req, res) => {
    // 要修改的文章id
    const id = req.params['id'];
    // 验证规则
    const schema = Joi.string().required().regex(/^[0-9a-fA-F]{24}$/).error(new Error('文章id非法'))
    // 验证
    const { error } = Joi.validate(id, schema);
    // 数据格式错误
    if (error) return res.status(400).send({message: error.message})
    // 通过验证
    let posts = await Post.findById(id);
    // console.log(req.fields);
    if (posts.thumbnail.trim() != '' && posts.thumbnail) {
        // 删除封面
        await unlink(path.join(__dirname, '../','../','../','public', posts.thumbnail))
    }
    let post = await Post.findByIdAndUpdate(id, {$set: req.fields}, {new: true, fields: '-password'})
    
    res.send(post);
}