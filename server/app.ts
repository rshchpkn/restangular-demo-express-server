import * as express from 'express';
import { json, urlencoded } from 'body-parser';
import * as path from 'path';
import * as cors from 'cors';
import * as compression from 'compression';

import { loginRouter } from './routes/login';
import { protectedRouter } from './routes/protected';
import { publicRouter } from './routes/public';
import { feedRouter } from './routes/feed';
import {heroesRouter} from "./routes/heroes";


let mongoose = require('mongoose');

import {User} from "./models/users";

// import * as mongodb from "mongodb";

const app: express.Application = express();

let mongodb = require('mongodb').MongoClient;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("connected");
});

mongoose.connect('mongodb://localhost:27017/test');



// let user = new User({name: "user4"});
// // user.save((err,user)=>{
// //   console.log(user);
// // });
// User.find({name: "user4"}).remove();
// User.find({name: "user4"},(err,res)=>{
//   console.log(res);
// });




app.disable('x-powered-by');

app.use(json());
app.use(compression());
app.use(urlencoded({ extended: true }));

// allow cors only for local dev
app.use(cors({
  origin: 'http://localhost:4200'
}));

// app.set('env', 'production');

// api routes
// app.use('/api/secure', protectedRouter);
app.use('/api/heroes', heroesRouter);
// app.use('/api/login', loginRouter);
// app.use('/api/public', publicRouter);
// app.use('/api/feed', feedRouter);

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
