const { decryptToken } = require('../helpers/jwt.js')
const { User } = require('../models')

const authentication = (req, res, next) => {
    const { access_token } = req.headers
    
    if (!access_token) res.status(404).json({ msg: 'Access token is not found' })

    const decoded = decryptToken(access_token)
    const { email } = decoded
    req.userData = decoded

    User.findOne({ where: { email } })
        .then(user => {
            if (user) next()
            else res.status(404).json({ msg: 'User is not found', loc: '@authentication' })
        })
        .catch(error => {
            res.status(401).json({ error })
        })
}

module.exports = { authentication }
