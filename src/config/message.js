const MESSAGE = {
  COMPLETE: {
    REGISTRATION: '登録が完了しました',
    EDIT: '編集が完了しました',
    MAIL_SENT: 'メールの送信が完了しました',
  },
  ERROR: {
    COMMON: 'エラーが発生しました。再度お試しください',
    NETWORK: 'ネットワーク接続がありません',
    ALREADY_EXIST: '既にユーザーが存在します',
    WRONG_PASSWORD: 'メールアドレスとパスワードが一致しません',
    USER_NOTO_EXISTS: 'ユーザーが存在しません',
    ALREADY_INVITED: '既にユーザーは招待済です',
  },
  VALIDATION: {
    INVALID_INPUT: '不正な入力値です',
    MAIL: 'メールアドレスの形式が不正です',
    PASSWORD: 'パスワードは6文字以上で入力してください',
    TEXTAREA: 'テキストは30文字以上で入力してください',
    NO_SELECT: '「選択なし」は選択できません',
  },
};

export default MESSAGE;
