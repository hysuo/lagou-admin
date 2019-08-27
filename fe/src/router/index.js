import SMERouter from 'sme-router'
import Home from '../controller/home'
import Position from '../controller/position'
import shop from '../controller/shop'
 
const router = new SMERouter('router-view','hash')

router.use((req,res,next) => {
    $(`.sidebar-menu li.nav a[href="/#${req.url}"]`)
    .parent()
    .addClass('active')
    .siblings()
    .removeClass('active')
})

router.route('/',Home.render)
router.route('/position',Position.render)
router.route('/position_add',Position.add)
router.route('/position_edit',Position.edit)
router.route('/shop',shop.render)
router.route('/shop_add',shop.add)
router.route('/shop_edit',shop.edit)

router.redirect('/position')

export default router