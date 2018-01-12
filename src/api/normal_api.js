import request from 'request-promise';

import {
  Router
} from 'express';

export default () => {
  let api = Router();

  /**
   * /login api
   */
  api.post('/login', (req, res) => {
    req.assert("username", "Username cannot be blank").notEmpty();
    req.assert("password", "Password cannot be blank").notEmpty();

    const errors = req.validationErrors();

    if (errors) {
      return res.json({
        status: "failed",
        message: errors
      });
    }

    res.locals.pixiv.login({
      username: req.body.username,
      password: req.body.password,
    }).then((data) => {
      res.json({
        status: 'success',
        response: JSON.parse(data).response
      });
    }).catch((error) => {
      res.json({
        status: 'failed',
        message: JSON.parse(error.error).errors
      });
    });
  });

  /**
   * /image/* to get pixiv image, the pixiv image api will have some header limition
   */
  api.get('/image/*', async function (req, res) {
    let imageRealUrl = req.originalUrl.split('/').slice(2).join('/');
    let data = await res.locals.pixiv.getImage(imageRealUrl);
    res.set('Content-Type', 'image/png');
    res.send(data);
  });

  // get spotlight articles
  api.get('/v1/spotlight/articles', function (req, res) {
    let data = res.locals.pixiv.getPage('v1/spotlight/articles?filter=for_ios', true)
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.json({
        status: 'failed',
        message: JSON.parse(error.error).error
      });
    });
  });

  return api;
}
