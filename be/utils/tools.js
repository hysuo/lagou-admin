const bcrypt = require('bcrypt')
module.exports = {
    crypt(myPlaintextPassword) {
        return new Promise((reslove, reject) => {
            bcrypt.genSalt(10, function (err, salt) {
                bcrypt.hash(myPlaintextPassword, salt, (err, hash) => {
                    reslove(hash)
                })
            })
        })
    },
    compare(myPlaintextPassword,hash){
        return new Promise((reslove,reject) => {
            bcrypt.compare(myPlaintextPassword,hash,function(err,res){
                reslove(res)
            })
        })
    }
}