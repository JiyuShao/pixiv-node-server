import request from 'request-promise';
import responseDataFormat from '../lib/response-data-format';

class Pixiv {
  constructor(params = {
    client_id: '',
    client_secret: '',
    authorization: ''
  }) {
    // this.username = params.username;
    // this.password = params.password;
    this.client_id = params.client_id;
    this.client_secret = params.client_secret;
    this.authorization = params.authorization;

    this.loginOption = {
      'method': 'POST',
      'url': 'https://oauth.secure.pixiv.net/auth/token',
      'headers': {
        'content-type': 'application/x-www-form-urlencoded'
      },
      'form': {
        'username': '',
        'password': '',
        'grant_type': 'password',
        'client_id': 'KzEZED7aC0vird8jWyHM38mXjNTY',
        'client_secret': 'W9JZoJe00qPvJsiyCGT3CCtC6ZUtdpKpzMbNlUGP'
      }
    };

    this.imageOption = {
      'method': 'GET',
      'encoding': null,
      'url': 'https://i.pximg.net/img-original/img/2018/01/12/12/08/31/66763809_p0.jpg',
      'headers': {
        'upgrade-insecure-requests': '1',
        'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36',
        'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
        'accept-encoding': 'gzip, deflate, br',
        'accept-language': 'en-US,en;q=0.8',
        'cache-control': 'no-cache',
        'referer': 'https://www.pixiv.net/member_illust.php?mode=medium&illust_id=66666666',
      }
    };
  }

  login(params = {
    username: '',
    password: ''
  }) {
    this.loginOption.form = { ...this.loginOption.form,
      ...params
    };
    return request(this.loginOption).then((data) => {
      return responseDataFormat(JSON.parse(data).response);
    });
  }

  refreshToken(params = {
    refresh_token: ''
  }) {
    this.loginOption.form = { ...this.loginOption.form,
      ...{
        grant_type: 'refresh_token'
      },
      ...params
    };
    return request(this.loginOption).then((data) => {
      return responseDataFormat(JSON.parse(data).response);
    });;
  }

  getPage(path = '') {
    return request({
      method: 'GET',
      url: `https://app-api.pixiv.net${path}`,
      headers: {
        'cache-control': 'no-cache',
        authorization: this.authorization
      }
    }).then((data) => {
      return responseDataFormat(data);
    });
  }

  getImage(path = '') {
    return request({ ...this.imageOption,
      ...{
        url: `https://i.pximg.net${path}`
      }
    });
  }
}
export default Pixiv;
