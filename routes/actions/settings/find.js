// 配置模块
const { Setting } = require('../../../model/Setting');

module.exports = async (req, res) => {
    try {
        // 查询配置信息
         let settings = await Setting.find();
         // 响应
         return res.send(settings[0]);
    } catch(ex) {
        next(ex)
    }
}