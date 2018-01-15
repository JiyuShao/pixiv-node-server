import _ from 'lodash';
import config from '../../config.json';

function isJson(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}

function formatData(obj, params = {
  domain: config.domain
}) {
  obj = isJson(obj) ? JSON.parse(obj) : obj;
  if (!_.isObject(obj)) {
    return obj;
  }
  _.forEach(obj, function (value, key) {
    if (_.isString(value)) {
      ['http://i.pximg.net', 'https://i.pximg.net'].map((currentDomain) => {
        if (_.includes(value, currentDomain)) {
          obj[key] = _.replace(value, currentDomain, `${params.domain}/image`);
        }
      });
    } else if (_.isObject(value) || isJson(value)) {
      formatData(value, params);
    }
  })

  if (typeof obj.next_url !== 'undefined') {
    obj.next_url = _.replace(obj.next_url, 'https://app-api.pixiv.net', `${params.domain}/page`);
  }
  return obj;
}

export default formatData;
