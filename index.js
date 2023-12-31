const express = require('express')
const exphbs = require('express-handlebars')
const session = require('express-session')
const FileStore = require('session-file-store')(session)
const flash = require('express-flash')
// const sequelize = require('./db/conn')
const port = 3050

const app = express()

const conn = require('./db/conn')

// Models
const Tought = require('./models/Tought')
const User = require('./models/User')

// Impot Routes
const toughtsRoutes = require('./routes/toughtsRoutes')
const authRoutes = require("./routes/authRoutes");

// Import Controller
const ToughtsController = require('./controllers/ToughtsController')


app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");

// receber resposta do body
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

//session middleware
app.use(
  session({
    name: 'session',
    secret: 'nosso_secret',
    resave: false,
    saveUninitialized: false,
    store: new FileStore({
      logFn: function () { },
      path: require('path').join(require('os').tmpdir(), 'sessions'),
    }),
    cookie: {
      secure: false,
      maxAge: 3600000,
      expires: new Date(Date.now() + 3600000),
      httpOnly: true,
    },
  }),
)
// flash messages
app.use(flash())

// public path
app.use(express.static('public'))

// set session response Estou checando se usuário está logado
app.use((req, res, next) => {
  if (req.session.userid) {
    res.locals.session = req.session
  }
  next()
})

// Routes
app.use('/toughts', toughtsRoutes)
app.use('/', authRoutes);

app.get('/', ToughtsController.ShowToughts);

conn
  // .sync({ force: true})
  .sync()
  .then(() => {
    app.listen(port)
  })
  .catch((err) => console.log(err))