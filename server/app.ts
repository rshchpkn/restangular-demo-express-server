import * as express from 'express';
import { json, urlencoded } from 'body-parser';
import * as path from 'path';
import * as compression from 'compression';

let cors = require('express-cors');


import {heroesRouter} from "./routes/heroes";


let mongoose = require('mongoose');


const app: express.Application = express();

let mongodb = require('mongodb').MongoClient;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("connected");
});

mongoose.connect('mongodb://localhost:27017/test');

app.disable('x-powered-by');

app.use(json());
app.use(compression());
app.use(urlencoded({ extended: true }));

// allow cors only for local dev
app.use(cors({
  allowedOrigins: [
    'http://localhost:4200', 'run.plnkr.co'
  ],
  headers: [
    'id','X-Requested-With', 'Content-Type'
  ]
}));
// origin: 'http://localhost:4200'


// app.set('env', 'production');

// api routes
app.use('/api/heroes', heroesRouter);

if (app.get('env') === 'production') {

  // in production mode run application from dist folder
  app.use(express.static(path.join(__dirname, '/../client')));
}

// catch 404 and forward to error handler
app.use(function(req: express.Request, res: express.Response, next) {
  let err = new Error('Not Found');
  next(err);
});

// production error handler
// no stacktrace leaked to user
app.use(function(err: any, req: express.Request, res: express.Response, next: express.NextFunction) {

  res.status(err.status || 500);
  res.json({
    error: {},
    message: err.message
  });
});

export { app }
