import createError from 'http-errors';
import express from 'express';
import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import { create } from 'express-handlebars';
import { CONFIG } from './config.js';
import 'dotenv/config';

import indexRouter from './routes/index.js';
import weatherRouter from './routes/weather.js';

const app = express();

if (process.env.NODE_ENV === 'development') {
  const key = fs.readFileSync('./key.pem');
  const cert = fs.readFileSync('./cert.pem');
  const server = https.createServer({ key, cert }, app);
  server.listen(CONFIG.PORT_HTTPS, () => { console.log(`app listening on https ${CONFIG.HTTP_HOST}`); });
}

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// view engine setup
const hbs = create({ /* config */ });
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/favicon.ico', express.static(path.join(__dirname, 'public/images/favicon.ico')));

app.use('/', indexRouter);
app.use('/weather', weatherRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(CONFIG.PORT, () => {
  console.log(`app listening on http ${CONFIG.HTTP_HOST}`);
});
