import request from 'request-promise';

class Pixiv {
  constructor(params = {
    accessToken: ''
  }) {
    // this.username = params.username;
    // this.password = params.password;
    this.client_id = params.client_id;
    this.client_secret = params.client_secret;

    this.accessToken = params.accessToken;
    this.loginOption = {
      method: 'POST',
      url: 'https://oauth.secure.pixiv.net/auth/token',
      headers: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      form: {
        username: '',
        password: '',
        grant_type: 'password',
        client_id: 'bYGKuGVw91e0NMfPGp44euvGt59s',
        client_secret: 'HP3RmkgAmEGro0gn1x9ioawQE8WMfvLXDz3ZqxpK'
      }
    };

    this.GETOption = {
      'method': 'GET',
      'hostname': 'app-api.pixiv.net',
      'port': null,
      'path': '',
      'headers': {
        'authorization': `Bearer ${this.accessToken}`,
        'cache-control': 'no-cache'
      }
    };

    this.ImageOption = {
      'method': 'GET',
      'encoding': null,
      'hostname': 'i.pximg.net',
      'port': null,
      'path': '/img-master/img/2017/09/30/00/00/15/65193679_p0_master1200.jpg',
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
    this.loginOption.form = {...this.loginOption.form, ...params};
    return request(this.loginOption);
  }

  // getPage(path = '') {
  //   return new Promise((resolve, reject) => {
  //     this.GETOption.path = path;
  //     this.GETOption.headers.authorization = `Bearer ${this.accessToken}`;
  //     let req = https.request(this.GETOption, (res) => {
  //       let chunks = [];

  //       res.on('data', function (chunk) {
  //         chunks.push(chunk);
  //       });

  //       res.on('end', () => {
  //         let res = Buffer.concat(chunks).toString();

  //         // console.log('GETOption', JSON.stringify(this.GETOption, null, 4));
  //         if (typeof JSON.parse(res).error !== 'undefined') {
  //           console.log('error', JSON.parse(res).error);
  //           console.log('Refresh accessToken');
  //           (async() => {
  //             await this.login();
  //             resolve(await this.getPage(this.GETOption.path));
  //           })()
  //         } else {
  //           resolve(res);
  //         }
  //       });
  //     });

  //     req.end();
  //   });
  // }

  // getImage(path = '') {
  //   return new Promise((resolve, reject) => {
  //     this.ImageOption.path = path;
  //     let req = https.request(this.ImageOption, (res) => {
  //       let chunks = [];

  //       res.on('data', function (chunk) {
  //         chunks.push(chunk);
  //       });

  //       res.on('end', () => {
  //         // console.log('ImageOption', JSON.stringify(this.ImageOption, null, 4));
  //         let res = Buffer.concat(chunks);
  //         resolve(res);
  //       });
  //     });

  //     req.end();
  //   });
  // }
}
export default Pixiv;
