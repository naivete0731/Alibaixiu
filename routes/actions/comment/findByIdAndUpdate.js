// 评论模块
const { Comment } = require('../../../model/Comment');
// 验证模块
const Joi = require('joi');

module.exports = async (req, res) => {
    // try {
    // 待修改的评论id
        const id = req.params['id'];
        // 定义对象验证规则
        const schema = Joi.string().required().regex(/^[0-9a-fA-F]{24}$/).error(new Error('评论id非法'))

        if(id.indexOf('-') != -1) {
            // 批量更新
            // 将字符串分割为数组
            const ids = id.split('-');
            const status = req.fields;
           const state = JSON.stringify(status).substr(11).split('}')[0].replace(/\[|]/g,'').replace(/\"/g,'').split(',');
           let arr = [];
        //     // 存储结果数据
        //     console.log(ids);
            console.log(status);
        //     console.log(state);
        //     console.log(req.params);
        //     console.log(typeof status);
            for (let i = 0; i < state.length;i++) {
                // console.log(state[i]);
                arr.push(state[i])
            }
            console.log(arr);
        //     console.log(typeof arr);
        //     // console.log(ste);
            const result = [];
            let i = 0;
        //     // 验证
            for (const item of ids) {
                let { error } = Joi.validate(item, schema);
                // 没有通过验证
                if (error) return res.status(400).send({message: error.message})
            }
            // 通过验证
            for (let item of ids) {
                let comments = await Comment.findById(item);
                // console.log(comments);
                // console.log('初始'+comments.state);
                comments.state == 0 ? 1 : 0;
                // let comment = await Comment.findByIdAndUpdate(item, {$set: arr[i]}, {new: true})  
                // console.log('最终'+comments.state);
                
                let comment = await Comment.findByIdAndUpdate(item, {$set: {state:arr[i]}}, {new: true})
                // result.push(comment);
                // console.log(item);
                //  console.log(arr[i]);
                i++;    
            //    await comments.save();
                
            }   
            i=0;
            res.send(result)
        } else {    
            // 验证
        const { error } = Joi.validate(id, schema);
        // 数据没有通过验证
        if (error) return res.status(400).send({message: error.message})
        // 通过验证
        let comment = await Comment.findByIdAndUpdate(id, {$set: {state: req.fields.state}}, {new: true});
        // 响应
        res.send(comment);
        }
    
    // } catch(ex) {
    //     next(ex)
    // }
    
}   