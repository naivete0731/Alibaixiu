module.exports = async (req, res) => {
    if (req.session && req.session.userInfo && req.session.userInfo.role == 'admin') {
        const state = `var isLogin = true; var userId = \"${req.session.userInfo._id}\"`;
        res.send(state)
    }else {
        res.send('var isLogin = false')
    }
}