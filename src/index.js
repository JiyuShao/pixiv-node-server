import http from 'http';
import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import expressValidator from 'express-validator';
import lusca from "lusca";

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
 * load api config
 */
app.use('/', api({
  config
}));

/**
 * Handle 404
 */
app.get("*", function(req, res){
  res.json({status: "failed", message: "Request doesn't match any route"});
});

app.server.listen(process.env.PORT || config.port, () => {
  console.log(`Started on port ${app.server.address().port}`);
});

export default app;
