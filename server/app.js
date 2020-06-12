if (process.env.NODE_ENV === 'development') {
    require('dotenv').config()
}
require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT
const cors = require('cors')
const router = require('./routers')
// const errorHandler = require('./middlewares/errorHandler.js')

app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.get('/', (req, res) => res.json({msg: 'NOE server is running'}))
app.use(router)
// app.use(errorHandler)

app.listen(port, _=> console.log('Stephanie Poetri - I love you', port))
