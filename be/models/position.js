const mongoose = require('../utils/db')

const Model = mongoose.model('positions', {
    companyName: String,
    positionName: String,
    city: String,
    salary: String,
    createTime: String
})
module.exports = {
    save(data){
        let model = new Model(data)
        return model.save()
    },
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
    }
}