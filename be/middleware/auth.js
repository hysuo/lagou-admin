const tokenUtil = require('../utils/token')
module.exports = {
    auth(req,res,next){
        // let username = req.session.username
        let token = req.get('x-access-token')
        let result = tokenUtil.verify(token)
        if(result){
                next()
        }else{
            res.render('fail',{
                data:JSON.stringify({
                    msg:'用户没有权限'
                })
            })
        }
    }
}