// 路由集合
module.exports = app => {
    // 用户
    app.use('/users', require('./user'));
    // 分类
    app.use('/categories', require('./category'));
    // 文章

    // 评论

    // 轮播图

    // 网站设置


    // 其他
    // 用户登录
    app.post('/login', require('./actions/other/login'))
    // 用户退出
    app.post('/logout', require('./actions/other/logout'))
    // 判断用户是否登陆
    app.get('/login/status', require('./actions/other/loginStatus'))
    // 图片文件上传
    app.post('/upload', require('./actions/other/upload'))
}
