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
  },
  UNTIL_ADOPTED: {
    OPPORTUNITY: ['web', '広告', 'イベント', '他社からの紹介', 'その他'],
    FIRST_CONTACT: ['web', '電話', 'メール', 'その他'],
    REASON: ['業務の効率化', 'その他'],
    PERIOD: ['1ヶ月以内', '1~3ヶ月', '半年以内', '半年以上'],
  },
  UNTIL_ADOPTED_TITLE: {
    OPPORTUNITY: 'サービスを知ったきっかけ',
    FIRST_CONTACT: '企業との初回接点',
    REASON: '検討理由',
    PERIOD: '検討期間',
    OTHER_SAAS: '他に検討したサービス',
  },
  BEING_ADOPTED: {
    IS_DISCOUNTED: ['有り', '無し'],
    DISCOUNT_RATE: ['0%', '0~10%', '10~30%', '30~50%', '50%以上'],
    ONBOADING_PERIOD: ['~1週間', '~1ヶ月', '1~3ヶ月', '半年~'],
    PRICE: ['~1万/月', '1~5万/月', '5~10万/月', '10万~'],
    PERIOD: ['1ヶ月前', '1~3ヶ月前', '3ヶ月~半年前', '半年~1年前', '1年以上前'],
    FROM_NOW: ['継続', '解約'],
  },
  BEING_ADOPTED_TITLE: {
    IS_DISCOUNTED: '割引の有無',
    DISCOUNT_RATE: '割引率',
    ONBOADING_PERIOD: 'オンボーディング期間',
    PRICE: '購入した価格',
    PERIOD: '導入時期',
    FROM_NOW: '今後の契約予定',
    ONBOADING_SYSTEM: 'オンボーディング体制',
  },
};

export default REVIEW;
