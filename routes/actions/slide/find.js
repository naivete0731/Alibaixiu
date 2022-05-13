// 轮播模块
const { Slide } = require('../../../model/slide');

module.exports = async (req, res) => {
    // 查找
    let slides = await Slide.find();
    // 响应
    res.send(slides);
}