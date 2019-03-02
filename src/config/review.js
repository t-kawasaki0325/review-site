const REVIEW = {
  SATISFACTION_LEVEL: [
    '非常に不満',
    '不満',
    'どちらでもない',
    '満足',
    '非常に満足',
  ],
  UNTIL_ADOPTED: {
    OPPORTUNITY: ['web', '広告', 'イベント', '他社からの紹介', 'その他'],
    FIRST_CONTACT: ['web', '電話', 'メール', 'その他'],
    REASON: ['業務の効率化', 'その他'],
    PERIOD: ['1ヶ月以内', '1~3ヶ月', '半年以内', '半年以上'],
  },
  BEING_ADOPTED: {
    IS_DISCOUNTED: ['有り', '無し'],
    DISCOUNT_RATE: ['0%', '0~10%', '10~30%', '30~50%', '50%以上'],
    ONBOADING_PERIOD: ['~1週間', '~1ヶ月', '1~3ヶ月', '半年~'],
    PRICE: ['~1万/月', '1~5万/月', '5~10万/月', '10万~'],
    PERIOD: ['1ヶ月前', '1~3ヶ月前', '3ヶ月~半年前', '半年~1年前', '1年以上前'],
    FROM_NOW: ['継続', '解約'],
  },
};

export default REVIEW;
