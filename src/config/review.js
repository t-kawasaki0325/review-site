const REVIEW = {
  SATISFACTION_LEVEL: [
    '非常に不満',
    '不満',
    'どちらでもない',
    '満足',
    '非常に満足',
  ],
  RECOMMENDATION_LEVEL: [
    '全く推奨できない',
    'あまり推奨できない',
    'どちらでもない',
    '推奨できる',
    'とても推奨できる',
  ],
  YES_OR_NO: ['いいえ', 'はい'],
  BASIC: {
    CONTRACT_STATUS: ['契約中', '解約済み', '検討中'],
    LISENCE_NUM: ['0', '1', '2~5', '6~10', '11~30', '31~100', '101以上'],
    CONTRACT_PERIOD: ['~1ヶ月', '1ヶ月~半年', '半年~1年', '1年~3年', '3年~'],
  },
  UNTIL_ADOPT: {
    FIRST_CONTACT: ['web', 'イベント', '他社からの紹介', 'その他'],
    PERIOD: ['1ヶ月以内', '1~3ヶ月', '3~6ヶ月', '6ヶ月~1年', '1年以上'],
    IS_DISCOUNTED: ['無し', '有り'],
    DISCOUNT_RATE: ['0%', '0~10%', '10~30%', '30~50%', '50%以上'],
    ONBOADING_PERIOD: ['~1ヶ月', '1~3ヶ月', '3~6ヶ月', '6ヶ月~1年', '1年以上'],
  },
  TOTAL_TITLE: {
    TITLE: 'レビューのタイトル',
    GOOD: 'プロダクトの優れている点',
    BAD: 'プロダクトの改善点',
  },
  BASIC_TITLE: {
    IS_ADMIN: 'プロダクトの管理者ですか',
    CONTRACT_STATUS: '契約ステータス',
    CONTRACT_PERIOD: '契約期間',
    PRICE_SATISFACTION: '価格の満足度',
    LISENCE_NUM: 'ライセンス数',
    IS_CONTINUE: '今後も継続予定ですか',
    REASON_NOT_CONTINUE: 'その理由を教えてください',
  },
  UNTIL_ADOPTED_TITLE: {
    IS_PARTICIPANT: '導入に携わりましたか',
    FIRST_CONTACT: '製品を知ったきっかけ',
    REASON_FIRST_CONTACT: 'きっかけを入力してください',
    CONSIDERATION_REASON: '検討理由',
    OTHER_SAAS: '他に検討した製品',
    CONSIDERATION_PERIOD: '検討期間',
    IS_DISCOUNTED: 'ディスカウントの有無',
    DISCOUNT_RATE: 'ディスカウントの割合',
    DECISION: '導入の決め手',
    ONBOADING_PERIOD: '導入期間',
    ONBOADING_SATISFACTION: '導入体制の満足度',
  },
  ADOPTING_TITLE: {
    IS_OPERATION_PARTICIPANT: '運用に携わっていますか',
    SUPPORT_SATISFACTION: 'サポートについて感じることを教えてください',
  },
};

export default REVIEW;
