const { Slide, validateSlide } = require('../../../model/slide');

module.exports = async (req, res) => {
    try {
            if (req.session.userInfo) {
            req.fields.author = req.session.userInfo._id;
            // 数据格式验证
            const { error } = validateSlide(req.fields);
            // 格式不符合要求
            if (error) return res.status(400).send({message: error.message})
            // 格式符合要求 
            // 创建轮播图
            let slide = new Slide(req.fields);
            // 保存用户
            await slide.save();
            // 响应
            res.send(slide);
        }
        else {
            return res.status(400).send({message: '用户id非法'})
        }
    } catch(ex) {
        next(ex);
    }
}