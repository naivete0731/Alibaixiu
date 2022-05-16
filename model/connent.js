// 数据库模块
const mongoose = require('mongoose');
// 引入config
const config = require('config')
mongoose.connect(`mongodb://${config.get('db.user')}:${config.get('db.pwd')}@${config.get('db.host')}:${config.get('db.port')}/${config.get('db.name')}`,{ useNewUrlParser: true }).then(() => console.log('数据库连接成功')).catch((err) => console.log(err+'数据库连接失败'))