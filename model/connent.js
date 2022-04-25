// 数据库模块
const mongoose = require('mongoose');

mongoose.connect('mongodb://itcast:itcast@localhost:27017/baixiu',{ useNewUrlParser: true }).then(() => console.log('数据库连接成功')).catch((err) => console.log(err+'数据库连接失败'))