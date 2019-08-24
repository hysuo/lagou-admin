const shopModel = require('../models/shop')
module.exports = {
    async list(req,res,next){
        let result = shopModel.find(req.query)
        if(await result.list){
            res.render('succ', {
                data: JSON.stringify({
                  list:await result.list,
                  total:await result.total
                })
              })
        }
    },
    async save(req,res,next){
        let result = await shopModel.save(req.body)
        if(result){
            res.render('succ',{
              data:JSON.stringify({
                msg:'数据添加成功'
              })
            })
          }else{
            res.render('fail',{
              data:JSON.stringify({
                msg:'数据添加失败'
              })
            })
          }
    },
    async findone(req,res,next){
      let result = await shopModel.findOne(req.body.id)
      if(result){
        res.render('succ',{
          data:JSON.stringify(result)
        })
      }
    },
    async put(req,res,next){
      let result = await shopModel.put(req.body)
      if(result){
        res.render('succ',{
          data:JSON.stringify({
            msg:'数据修改成功'
          })
        })
      }
    },
    async delete(req,res,next){
      let result = await shopModel.delete(req.body.id)
      if(result){
        if(result){
          res.render('succ',{
            data:JSON.stringify({
              msg:'数据删除成功'
            })
          })
        }
      }
    }
}