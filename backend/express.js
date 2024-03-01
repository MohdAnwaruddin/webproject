import express from 'express';
import path from 'path';
import mongoSanitize from 'express-mongo-sanitize';
import httpContext from 'express-http-context';
import routes from './routes/index.js';




const app = express();
const server = require('http').createServer(app); 

// mount assets folder on / path


// parse body params and attache them to req.body
app.use(express.json());

app.use(express.urlencoded({ extended: true, limit: '50mb', parameterLimit: 200000 }));



// Data sanitization against NoSQL query injection
app.use(mongoSanitize());



// Prevent parameter pollution

app.use(httpContext.middleware);

app.use(function (req, res, next) {
  let requestId = req.headers['x-request-id'] || uuid();
  httpContext.set('requestId', requestId);
  next();
});


app.use('/node/api', routes);

app.use((err, req, res, next) => globalErrorHandler(err, req, res, next));

export default server;