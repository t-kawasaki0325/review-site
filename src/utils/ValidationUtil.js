class ValidationUtil {
  static formValidate = (type, value) => {
    switch (type) {
      case 'email':
        return ValidationUtil.emailValidation(value);
      case 'password':
        return ValidationUtil.passwordValidation(value);
      case 'text':
        return ValidationUtil.textValidation(value);
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

  static selectValidation = option => {
    if (option === 0) return '「選択なし」は選択できません';

    return '';
  };
}

export default ValidationUtil;
