import http from 'http';
import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import expressValidator from 'express-validator';
import errorHandler from 'errorhandler';
import lusca from 'lusca';
import cors from 'cors';

import middleware from './middleware';
import api from './api';
import config from '../config.json';

let app = express();
app.server = http.createServer(app);

// 3rd party middleware
app.use(morgan('dev')); //logger

app.use(bodyParser.json({ //parse json input data
  limit: config.bodyLimit
}));

app.use(expressValidator()); //for req validation
app.use(lusca.xframe("SAMEORIGIN"));
app.use(lusca.xssProtection(true));
app.use(cors({credentials: true, origin: true})); //enable all cors for now

// internal middleware
app.use(middleware({
  config
}));

// router
app.get('/', (req, res) => {
  res.json({
    status: 'success',
    message: 'welcome to home page!'
  });
});

/**
 * load router config
 */
app.use('/', api({
  config
}));

/**
 * Handle 404
 */
app.get("*", (req, res, next) => {
  next("Request doesn't match any route");
});

/**
 * Error Handler. Provides full stack - remove for production
 */
if (config.NODE_ENV === 'development') {
  app.use(errorHandler());
} else if (config.NODE_ENV === 'production') {
  app.use((err, req, res, next) => {
    res.json({
      status: 'failed',
      message: err
    });
  });
}

app.server.listen(process.env.PORT || config.port, () => {
  console.log(`Started on port ${app.server.address().port}`);
});

export default app;
