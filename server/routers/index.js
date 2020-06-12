const router = require('express').Router()
const thirdParty = require('./3rdParty.js')
const RayRoute = require('./rayhanRoute.js')
const { authentication } = require('../middlewares/auth.js')
const { register, login, googleOAuth } = require('../controllers/userController.js')

router.post('/register', register)
router.post('/login', login)
router.post('/googleSignIn', googleOAuth)
router.use('/api', authentication, thirdParty)
router.use('/rayhan', authentication, RayRoute)

module.exports = router