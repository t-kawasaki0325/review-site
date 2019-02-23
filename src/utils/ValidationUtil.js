class ValidationUtil {
  static formValidate = (key, value) => {
    switch (key) {
      case 'email':
        return ValidationUtil.emailValidation(value);
      case 'password':
        return ValidationUtil.passwordValidation(value);
      default:
        break;
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
}

export default ValidationUtil;
