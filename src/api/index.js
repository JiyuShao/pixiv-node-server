import { Router } from 'express';
import NormalApi from './normal_api';
import AuthApi from './auth_api';

export default ({ config }) => {
	let api = Router();

	api.use('/', NormalApi());

  api.use('/auth/', AuthApi());

	return api;
}
