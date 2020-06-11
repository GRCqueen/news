const router = require('express').Router()

router.get('/news', (req, res) => res.json({ data: 'news' }))
router.get('/ap', (req, res) => res.json({ data: 'ap' }))
router.get('/covid19', (req, res) => res.json({ data: 'covid19' }))

module.exports = router