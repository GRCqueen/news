const jwt = require('jsonwebtoken')
const secret = process.env.SECRET

function encryptToken(payload) {
    return jwt.sign(payload, secret)
}

function decryptToken(token) {
    return jwt.verify(token, secret)
}

module.exports = { encryptToken, decryptToken }
