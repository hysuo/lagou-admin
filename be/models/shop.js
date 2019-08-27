const mongoose = require('../utils/db')

const Model = mongoose.model('shops', {
    pic: String,
    salesNo: String,
    salesName: String,
    link: String,
    agio: String
})
module.exports = {
    //{pic,salesNo,salesName,link,agio}
    save(data){
        let model = new Model(data)
        return model.save()
    },
    // find(){
    //     return Model.find({}).sort({_id:-1})
    // },
    find({start,count}){
        return {
            list:Model.find({}).sort({_id:-1}).limit(~~count).skip(~~start),
            total:Model.count({})
        }
    },
    findOne(id){
        return Model.findById(id)
    },
    put(data){
        return Model.update({_id:data.id},data)
    },
    delete(id){
        return Model.deleteOne({_id:id})
    },
    search(keywors){
        return Model.find({salesName:new RegExp(keywors,'gi')}).sort({_id:-1})
    }
}