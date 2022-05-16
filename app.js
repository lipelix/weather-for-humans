import createError from 'http-errors'
import express from 'express'
import path from 'path'
import {fileURLToPath} from 'url'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import { create } from 'express-handlebars';

import indexRouter from './routes/index.js'
import weatherRouter from './routes/weather.js'

const PORT = 3000
const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url))

// view engine setup
const hbs = create({ /* config */ });
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));
app.enable('view cache');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/weather', weatherRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(PORT, () => {
  console.log(`Example app listening on PORT ${PORT}`)
})