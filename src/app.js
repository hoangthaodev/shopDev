const compression = require('compression')
const express = require('express')
const { default: helmet } = require('helmet')
const morgan = require('morgan')
const app = express()

//init midlewares
app.use(morgan('dev'))
app.use(helmet())
app.use(compression())

//init db

//init routes
app.get('/', (req, res, next) => {
    const strCompress = 'Hello fantipjs'
    return res.status(200).json({
        messenge: 'Welcome shopDev',
        metadata: strCompress.repeat(100000)
    })
})

//handling error

module.exports = app
