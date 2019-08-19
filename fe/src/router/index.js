import SMERouter from 'sme-router'
import Home from '../controller/home'
import Position from '../controller/position'
 
const router = new SMERouter('router-view','hash')

router.route('/',Home.render)
router.route('/position',Position.render)

router.redirect('/')

export default router