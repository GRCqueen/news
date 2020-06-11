const { User } = require('../models')
const { decrypt } = require('../helpers/bcrypt.js')
const { encryptToken } = require('../helpers/jwt.js')
const { OAuth2Client } = require('google-auth-library')
const { CLIENT_ID, DEFAULT } = process.env
const client = new OAuth2Client(CLIENT_ID)

class UserController {
    static register(req, res, next) {
        const { email, password } = req.body

        User.create({ email, password })
            .then(result => {
                const { id, email } = result
                res.status(201).json({
                    User: { id, email }
                })
            })
            .catch(err => {
                next(err)
            })
    }

    static login(req, res, next) {
        const { email, password } = req.body
        User.findOne({
            where: { email }
        })
        .then(result => {
            const { id, email } = result
            if(decrypt(password, result.password)) {
                const access_token = encryptToken({
                    id, email
                })
                res.status(200).json({ access_token })
            } else {
                let err = { name: 'WrongPass', msg: "Wrong email or password" }
                next(err)
            }
        })
        .catch(err => {
            next(err)
        })
    }

    static googleOAuth(req, res, next) {
        console.log('googleOAuth kepanggil');
        
        const { token } = req.body
        client.verifyIdToken({
            idToken: token,
            audience: CLIENT_ID
        })
        .then(ticket => {            
            const payload = ticket.getPayload()
            const { email } = payload
            const user = {
                email, password: DEFAULT
            }
            console.log(user);            
            User.findOne({ where: { email }})
                .then(data => {
                    if (data) {
                        return data
                    } else {                            
                        return User.create(user)
                    }
                })
                .then(data => {
                    const { id, email } = data
                    const access_token = encryptToken({
                        id, email
                    })
                    res.status(200).json({ access_token })
                })
                .catch(err => {
                    err.msg = 'Google OAuth SignUp error'
                    next(err)
                })
        })        
        .catch(err => {
            err.msg = 'Google OAuth SignIn error'
            next(err)
        })
    }
}

module.exports = UserController