import PositionView from '../views/position.art'

export default {
    render(req,res,next){
        $.ajax({
            url: '/api/position/list',
            dataType:'json',
            success(result) {
              if (result.ret) {
                res.render(PositionView({
                  list: result.data
                }))
              } else {
                res.go('/')
              }
            }
          })
        // res.render(PositionView())
    }
}