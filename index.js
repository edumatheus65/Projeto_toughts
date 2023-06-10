const express = require('express')
const exphbs = require('express-handlebars')
const session = require('express-session')
const FileStore = require('session-file-store')(session)
const flash = require('express-flash')
const sequelize = require('./db/conn')
const port = 3050

const app = express()

const conn = require('./db/conn')

conn
    .sync()
    .then(() => {
        app.listen(port)
    })
    .catch((err) => console.log(err))