const router = require('express').Router()

const ggnaligController = require('../controllers/ggnaligController')

router.get('/news/:query', ggnaligController.getData)
router.get('/ap', (req, res) => res.json({ data: 'ap' }))
router.get('/covid19', (req, res) => res.json({ data: 'covid19' }))

module.exports = router