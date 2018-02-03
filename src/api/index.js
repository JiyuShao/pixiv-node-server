import { Router } from 'express';
import NormalApi from './normal_api';

export default ({ config }) => {
	let api = Router();

	api.use('/', NormalApi());

	return api;
}
