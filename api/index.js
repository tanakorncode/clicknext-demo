const path = require('path')
const express = require('express')
const cookieParser = require('cookie-parser')
const compression = require('compression')
const bodyParser = require('body-parser')
const helmet = require('helmet')
const cors = require('cors')
const session = require('express-session')
const corsMiddleware = require('./middlewares/cors')
const autoRoutes = require('./utils/auto-routes')
const error = require('./middlewares/error')
const customResponse = require('./middlewares/custom-response')
/**
 * Express instance
 * @public
 */
const app = express()

/**
 * gzip compression
 * http://expressjs.com/en/resources/middleware/morgan.html
 */
app.use(compression())

/**
 * secure apps by setting various HTTP headers
 */
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
)

/**
 * enable CORS - Cross Origin Resource Sharing
 * http://expressjs.com/en/resources/middleware/cors.html
 */
app.use(cors())
app.use(corsMiddleware)

/**
 * session
 * http://expressjs.com/en/resources/middleware/session.html
 */
// app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 24 * 60 * 60 * 1000,
    // httpOnly: true,
    // secure: true,
    // domain: process.env.BASE_URL,
    // //  new Date(Date.now() + 60 * 60 * 1000) Cookie will expire in 1 hour from when it's generated
    // expires: 24 * 60 * 60 * 1000, // 24 hours
  },
  name: process.env.SESSION_NAME,
}))

/**
 * parse body params and attache them to req.body
 */
// app.use(express.json())
// app.use(express.urlencoded({ extended: false }))
app.use(bodyParser.urlencoded({ extended: true, limit: process.env.BODY_REQUEST_LIMIT || '50mb' }))
app.use(bodyParser.json())

// http://expressjs.com/en/resources/middleware/cookie-parser.html
app.use(cookieParser())

/**
 * custom response
 */
app.use(customResponse())

// auto load routes
const appRoutes = autoRoutes(app, path.join(__dirname, 'routes'))
app.appRoutes = appRoutes


// if error is not an instanceOf APIError, convert it.
app.use(error.converter)

// catch 404 and forward to error handler
app.use(error.notFound)

// error handler, send stacktrace only during development
app.use(error.handler)

module.exports = app
