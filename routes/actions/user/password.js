const { User } = require('../../../model/user');
// hash模块
const bcrypt = require('bcrypt');
// joi
const Joi = require('joi');

module.exports = async (req, res) => {
    // 判断用户是否处于登陆状态
    if (req.session.userInfo) {
        // 验证原始
        const originPass = req.session.userInfo.password;
        // 用户id
        const _id = req.session.userInfo._id;
        // 获取新密码以及确认密码
        const { userPass, newPass, confirmPass } = req.fields;
        console.log(req.fields);
        // 验证模块
        const schema_id = Joi.string().required().regex(/^[0-9a-fA-F]{24}$/).error(new Error('用户id非法'));
        const schema_pass = Joi.string().required().min(6).regex(/^[a-zA-Z0-9]{6,30}$/).error(new Error('密码非法'));
        let { error } = Joi.validate(_id,schema_id, {
            // 允许对象包含被忽略的未知键
            allowUnknown: true
        });
        if (error) return res.status(400).send({message: 'id非法'})
        

        // 如果用户输入的密码和原始的密码一致
        if (await bcrypt.compare(userPass, originPass)) {
            // 如果用输入的两次相同
            if(userPass.trim().length < 6 || newPass.trim().length < 6 || confirmPass.trim().length < 6) {
                return res.status(400).send({message: '密码不能小于6位'})
            }
            let { error1 } = Joi.validate(userPass, schema_pass, {
                 allowUnknown: true
             })
             if (error1) return res.status(400).send({message: '密码非法'})
            if (newPass.trim() == confirmPass.trim()) {
                // 判断密码是否与近期相同
                if (await bcrypt.compare(newPass, originPass)) {
                   return res.status(400).send({message: '与近期的密码相同无法更改!!'})
                }
                // 更新密码
                // 生产盐
                const salt = await bcrypt.genSalt(10);
                const finalPass = await bcrypt.hash(newPass, salt);
                let user = await User.findByIdAndUpdate(_id, {$set: {password: finalPass}})
                req.session.userInfo = null;
                res.send({message: '密码修改成功'})
            } else {
                return res.status(400).send({message: '两次新密码输入的不相同'})
            }
        } else {
            return res.status(400).send({message: '原始密码不正确'})
        }
        
    } else {
        res.status(400).send({message: '请登录'})
    }

}