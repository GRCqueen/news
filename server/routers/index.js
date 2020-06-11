const router = require('express').Router()
const thirdParty = require('./3rdParty.js')
const { authentication } = require('../middlewares/auth.js')
const { register, login, googleOAuth } = require('../controllers/userController.js')

router.post('/register', register)
router.post('/login', login)
router.post('/googleSignIn', googleOAuth)
router.use(authentication)
router.use('/api', thirdParty)


module.exports = router