// 分类模型
const { Category } = require('../../../model/Category');

module.exports = async (req, res) => {
    // 查询用户信息
    const category = await Category.find();
    //响应 文章分类
    res.send(category);
}
