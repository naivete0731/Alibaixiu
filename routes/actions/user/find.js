// 用户模块
const { User } = require('../../../model/user');

module.exports = async (req, res) => {
    try {
    // 查询所有用户
        const users = await User.find().select('-password').sort('createTime');
        // 响应
        res.send(users);
    } catch(ex) {
        next(ex)
    }
   
}