import PositionView from '../views/position.art'

export default {
    render(req,res,next){
        res.render(PositionView(req))
    }
}