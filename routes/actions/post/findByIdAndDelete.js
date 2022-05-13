// 文章模型
const { Post, validatePost } = require('../../../model/Post');
// 验证模块
const Joi = require('joi');
// 文件模块
const fs = require('fs');
// 路径处理
const path = require('path');
// 方法改造
const { promisify } = require('util');
// 删除文件
const unlink = promisify(fs.unlink);

module.exports = async (req, res) => {
    // 获取用户id
    const id = req.params['id'];
    // 验证模型
    const schema = Joi.string().required().regex(/^[0-9a-fA-F]{24}$/).error(new Error('文章id非法'))
    // 如果id中存在-
    if (id.indexOf('-') != -1) {
        // 批量删除
        // 将字符串分割为数组
        const ids = id.split('-');
        // 存储结果数组
        const result = [];
        // 验证
        for (const item of ids) {
            // 验证
            let { error } = Joi.validate(item, schema);
            // 数据格式没有通过验证
  
            if (error) return res.status(400).send({message: error.message})
        }
        // 通过验证
        for (const item of ids) {
            // 删除用户
            let post = await Post.findByIdAndDelete(item);
            // 将删除文章存储在数组中
            result.push(post);
            if (post.thumbnail) {
                await unlink(path.join(__dirname, '../','../','../','public',post.thumbnail))
            }
        }
        // 响应
        res.send(result);
    } else {
        // 验证
        const { error } = Joi.validate(id, schema);
        // 数据格式没有通过验证
        if (error) return res.status(400).send({message: error.message})
        // 通过验证
        // 删除用户
        let post = await Post.findByIdAndDelete(id);
        // 如果缩略图存在
        if (post.thumbnail) {
            // 删除缩略图
            await unlink(path.join(__dirname, '../', '../', '../', 'public', post.thumbnail))
        }
        // 响应
        res.send(post);
    }
    
    
}