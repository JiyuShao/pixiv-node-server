import { Router } from 'express';
import Pixiv from '../models/pixiv';

export default ({ config }) => {
	let api = Router();

  // load pixiv
  api.use((req, res, next) => {
    res.locals.pixiv = new Pixiv({
      ...config.pixiv,
      authorization: req.headers.authorization
    });
    next();
	});

	return api;
}
