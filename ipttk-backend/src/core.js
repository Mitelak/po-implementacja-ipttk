import express from 'express'
import path from 'path'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import bodyParser from 'body-parser'
import { notFound, catchErrors } from './middlewares/errors'
import { user, routes, segments, points } from './routes/v1'
import mongoose from 'mongoose'
import dbConfig from './config/database'

mongoose.connect(dbConfig.mongoUrl);
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', err => {
    console.log(`Could not connect to the database. Error: ${err}`);
    process.exit();
});

const app = express();
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.use('/api/v1', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE,PATCH,OPTIONS')
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization")
    next()
});

app.use(logger('dev'))
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'public')))

const v1 = express.Router()
v1.use('/user', user)
v1.use('/segments', segments)
v1.use('/points', points)
v1.use('/routes', routes)
app.use('/api/v1', v1)

app.use(notFound)
app.use(catchErrors)

module.exports = app;
