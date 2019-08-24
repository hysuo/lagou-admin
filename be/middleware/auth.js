module.exports = {
    auth(req,res,next){
        let username = req.session.username
        if(username){
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