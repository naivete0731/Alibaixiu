// 验证模块
const Joi = require('joi');
// 分类模块
const { Category } = require('../../../model/Category');
// 文章模块
const { Post } = require('../../../model/Post');
module.exports = async (req, res) => {
    // 获取用户id
    const id = req.params['id'];
    // 验证模型
    const schema = Joi.string().required().regex(/^[0-9a-fA-f]{24}$/).error(new Error('分类id非法'))
    // 如果用户存在-
    if (id.indexOf('-') != -1) {
         // 批量删除
         // 将字符串id分割为数组
         const ids = id.split('-');
         // 存储结构数组
         const result = [];
         // 验证
         for (const item of ids) {
             // 验证
             const { error } = Joi.validate(item, schema);
             // 数据格式没有通过验证
             if (error) return res.status(400).send({message: error.message})
         }
         // 通过验证
         for (const item of ids) {
            // 删除分类
            let category = await Category.findByIdAndDelete(item);
            // 删除分类下的文章
            let post = await Post.deleteMany({category: item})
            // 将删除的用户存储在数组中
            result.push(category);
         }
         // 响应
         res.send(result);
    } else {
         // 单个删除
         // 验证
         const { error } = Joi.validate(id, schema);
         // 数据格式没有通过
         if (error) return res.status(400).send({message: error.message});
         // 通过验证
         // 删除分类
         let category = await Category.findByIdAndDelete(id);
         // 删除分类下面的文章
         let post = await Post.deleteMany({category: id})
         // 响应
         res.send(category)
    }
   
}