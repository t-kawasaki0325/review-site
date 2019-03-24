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
    if (!email) return 'メールアドレスを入力してください';

    const regex = /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/;
    if (!regex.test(email)) return 'メールアドレスの形式が不正です';

    return '';
  };

  static passwordValidation = password => {
    if (!password) return 'パスワードを入力してください';
    if (password.length < 6) return 'パスワードは6文字以上で入力してください';

    return '';
  };

  static textValidation = text => {
    if (!text) return '不正な入力値です';

    return '';
  };

  static textareaValidation = text => {
    if (text.length < 30) return 'テキストは30文字以上で入力してください';

    return '';
  };

  static selectValidation = option => {
    if (option === 0) return '「選択なし」は選択できません';

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
