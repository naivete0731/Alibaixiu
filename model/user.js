//引入数据库模块
const mongoose = require('mongoose');
//模型规则类
const { Schema } = mongoose;
// hash模块
const bcrypt = require('bcrypt');
//引入Joi验证
const Joi = require('joi');
//用户集合规则
const UserSchema = new Schema({
    // 昵称
    nickName: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 30
    },
    // 邮箱
    email: {
        type: String,
        required: true,
        unique: true
    },
    // 密码
    password: {
        type: String,
        required: true,
        minlength: 6,
        maxlength:100
    },
    //角色
    role: {
        type: String,
        default: 'normal',
        enum: ['admin','normal']
    },
    //头像
    avater: {
        type: String,
        default: null
    },
    //创建时间
    createTime: {
        type: Date,
        default: Date.now
    },
    //状态
    status: {
        type: Number,
        required: true,
        default: 1
    }
}, {versionKey:false})

// 用户集合类
const User = mongoose.model('User', UserSchema);

// 注册数据格式验证
const validateUser = user => {
    // 定义对象验证规则
    const schema = {
        nickName: Joi.string().min(2).max(30).required().error(new Error('用户名不符合规则')),
        email: Joi.string().regex(/^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/).required().error(new Error( '邮箱不符合验证规则')),
        password: Joi.string().required().regex(/^[A-Za-z0-9]{6,30}$/).error(new Error('密码不符合规则')),
        status: Joi.number().vaild(0,1),
        role: Joi.string().valid('normal','admin')
    };
    // 验证
    return Joi.validate(user, schema, {
        // 检测到所有错误
        abortEarly: false,
        // 允许对象包括被忽略的未知键
        allowUnknown: true
    })
}

// 登陆数据格式
const validateLogin = user => {
    // 定义对象验证规则
    const schema = {
        email: Joi.string().regex(/^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/).required().error(new Error('邮箱或密码错误')),
        password: Joi.string().regex(/^[a-zA-Z0-9]{6,60}$/).error(new Error('邮箱或密码错误'))
    }
    // 验证
    return Joi.validate(user, schema, {
        // 检测到错误立即返回
        abortEarly: true
    })
}

User.findOne({email: 'Wuxie@126.com'}).then(async result => {
    if (result == null) {
        //生成盐
        const salt = await bcrypt.genSalt(10);
        //使用盐加密
        const password = await bcrypt.hash('123456',salt);

        const user = await User.create({
            nickName: 'Wuxie',
            email: 'Wuxie@126.com',
            password: password,
            role: 'admin',
            avater: null,
            create: new Date,
            status: 1
        })
        console.log('用户创建成功');
    }
})
module.exports = {
    User,
    validateUser,
    validateLogin
}