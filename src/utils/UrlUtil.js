import { PATH } from '../config';

class UrlUtil {
  static isRegistrationPage = history => {
    return history.location.pathname === PATH.REGISTRATION;
  };
  static baseUrl = url => {
    const split = url.split('/');
    return split[split.length - 1];
  };
  static matchUserId = url => {
    return url.match(/^\/registration\/[a-zA-Z0-9]{28}/ || {}).input;
  };
  static changeBaseUrl = (url, id) => {
    return url.replace(UrlUtil.baseUrl(url), id);
  };
}

export default UrlUtil;
