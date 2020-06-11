const bcrypt = require('bcryptjs')

const saltRounds = +process.env.SALT

function encrypt(password) {
    return bcrypt.hashSync(password, saltRounds)
}

function decrypt(password, hash) {
    return bcrypt.compareSync(password, hash)
}

module.exports = { encrypt, decrypt }
