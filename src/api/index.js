import { Router } from 'express';
import NormalApi from './normal_api';

export default ({ config }) => {
	let api = Router();

  // for the apis which don't require access token
	api.use('/', NormalApi());

  // for the apis which require access token
  // api.use('/auth/', AuthApi());

	return api;
}
