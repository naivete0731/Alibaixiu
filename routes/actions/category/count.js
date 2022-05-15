const { Category } = require('../../../model/Category');

module.exports = async (req, res) => {
    try {
    // 查询所有分类
        const categoryCount = await Category.countDocuments();
        // 响应
        res.send({categoryCount})
    } catch(ex) {
        next(ex)
    }
   
}