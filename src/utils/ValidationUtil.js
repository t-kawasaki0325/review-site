import { MESSAGE } from '../config';

class ValidationUtil {
  static formValidate = (type, value) => {
    switch (type) {
      case 'email':
        return ValidationUtil.emailValidation(value);
      case 'password':
        return ValidationUtil.passwordValidation(value);
      case 'text':
        return ValidationUtil.textValidation(value);
      case 'textarea':
        return ValidationUtil.textareaValidation(value);
      default:
        return ValidationUtil.selectValidation(value);
    }
  };

  static emailValidation = email => {
    if (!email) return MESSAGE.VALIDATION.INVALID_INPUT;

    const regex = /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/;
    if (!regex.test(email)) return MESSAGE.VALIDATION.MAIL;

    return '';
  };

  static passwordValidation = password => {
    if (!password) return MESSAGE.VALIDATION.INVALID_INPUT;
    if (password.length < 6) return MESSAGE.VALIDATION.PASSWORD;

    return '';
  };

  static textValidation = text => {
    if (!text) return MESSAGE.VALIDATION.INVALID_INPUT;

    return '';
  };

  static textareaValidation = text => {
    if (text.length < 30) return MESSAGE.VALIDATION.TEXTAREA;

    return '';
  };

  static selectValidation = option => {
    if (option === 0) return MESSAGE.VALIDATION.NO_SELECT;

    return '';
  };

  static arrayEmpty = elements => {
    return (
      elements.filter(element => {
        return element === '';
      }).length === 0
    );
  };

  static isError = errors => {
    return (
      errors.filter(error => {
        return error !== '';
      }).length !== 0
    );
  };
}

export default ValidationUtil;
