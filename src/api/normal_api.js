import _ from 'lodash';
import request from 'request-promise';
import {
  Router
} from 'express';

export default () => {
  let api = Router();

  api.get('/', (req, res) => {
    res.json({
      status: 'success',
      message: 'welcome to home page!'
    });
  });

  /**
   * /login api
   */
  api.post('/login', (req, res, next) => {
    req.assert("username", "Username cannot be blank").notEmpty();
    req.assert("password", "Password cannot be blank").notEmpty();

    const error = req.validationErrors();

    if (error) {
      next(error);
    }

    res.locals.pixiv.login({
      username: req.body.username,
      password: req.body.password,
    }).then((data) => {
      res.json({
        status: 'success',
        response: data
      });
    }).catch((error) => {
      next(error);
    });
  });

  /**
   * refresh access token by refresh token
   */
  api.post('/login_refresh', (req, res, next) => {
    req.assert("refresh_token", "Refresh token cannot be blank").notEmpty();

    const error = req.validationErrors();

    if (error) {
      next(error);
    }

    res.locals.pixiv.refreshToken({
      refresh_token: req.body.refresh_token,
    }).then((data) => {
      res.json({
        status: 'success',
        response: data
      });
    }).catch((error) => {
      next(error);
    });
  });

  /**
   * get user detail,
   * get params: user_id=9158367
   */
  api.get('/user/detail', (req, res, next) => {
    let query = _.isEmpty(req.query) ? '' : '?' + Object.keys(req.query).map((currentKey) => `${currentKey}=${req.query[currentKey]}`).join('');
    let data = res.locals.pixiv.getPage('/v1/user/detail' + query)
      .then((data) => {
        res.json({
          status: 'success',
          response: data
        });
      })
      .catch((error) => {
        next(error);
      });
  });

  /**
   * /image/* to get pixiv image, the pixiv image api will have some header limition
   */
  api.get('/image/*', async function (req, res, next) {
    let imageRealUrl = '/' + req.originalUrl.split('/').slice(2).join('/');
    let data = await res.locals.pixiv.getImage(imageRealUrl);
    res.set('Content-Type', 'image/png');
    res.send(data);
  });

  // get spotlight articles
  api.get('/spotlight/articles', function (req, res, next) {
    let data = res.locals.pixiv.getPage('/v1/spotlight/articles?filter=for_ios', true)
      .then((data) => {
        res.json(data);
      })
      .catch((error) => {
        next(error);
      });
  });

  return api;
}
