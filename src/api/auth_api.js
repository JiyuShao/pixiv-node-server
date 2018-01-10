import {
  Router
} from 'express';

export default () => {
  let api = Router();

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

  return api;
}
