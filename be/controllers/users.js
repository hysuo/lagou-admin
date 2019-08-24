const userModel = require('../models/user')
const tools = require('../utils/tools')
module.exports={
    async signup(req,res,next){
        res.set('content-type', 'application/json;charset=utf-8')
        let{username,password} = req.body
        //判断用户是否存在或用户名已存在
        let result = await userModel.findOne(username)
        if(!result){
            //密码加密
            let newPassword = await tools.crypt(password)
            await userModel.save({
                username,
                password:newPassword
            })
            res.render('succ',{
                data:JSON.stringify({
                    msg:"用户注册成功"
                })
            })
        }
        res.render('fail',{
            data:JSON.stringify({
                msg:"用户名已存在"
            })
        })

    },
    async signin(req,res,next){
        res.set('content-type', 'application/json;charset=utf-8')
        let{username,password} = req.body
        let result = await userModel.findOne(username)
        if(result){
           if(await tools.compare(password,result.password)){
               req.session.username = username
                res.render('succ',{
                    data:JSON.stringify({
                        msg:'用户登录成功',
                        username
                    })
                })
           }else{
            res.render('fail',{
                data:JSON.stringify({
                    msg:'用户账户或密码错误'
                })
            })
           } 
        }else{
            res.render('fail',{
                data:JSON.stringify({
                    msg:'用户账户或密码错误'
                }) 
            })
        }
    },
    async isSignin(req,res,next){
        let username = req.session.username
        if(username){
                res.render('succ',{
                    data:JSON.stringify({
                        mes:'用户有权限',
                        username
                    })
                })
        }else{
            res.render('fail',{
                data:JSON.stringify({
                    msg:'用户没有权限'
                })
            })
        }
    },
    async signout(req,res,next){
        req.session = null
        res.render('succ',{
            data:JSON.stringify({
                msg:'用户退出成功'
            })
        })
    }
}