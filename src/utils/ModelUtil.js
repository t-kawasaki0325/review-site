import { now } from '../firebase';

class ModelUtil {
  static initializeKeys = object => {
    const keys = Object.keys(object);
    let value = {};

    keys.forEach(element => {
      Object.assign(value, { [element]: 0 });
    });
    return value;
  };

  static calculatePoint = (saas, info) => {
    const {
      point,
      num_of_reviews,
      sales_review_num,
      support_review_num,
      utilization_review_num,
      recommendation_review_num,
      satisfaction_review_num,
    } = saas;
    const { sales, support, utilization, satisfaction, recommendation } = info;

    const average = ModelUtil.currentAverage([
      sales,
      support,
      utilization,
      recommendation,
      satisfaction,
    ]);

    const newSales = ModelUtil.averagePoint(
      point.sales,
      sales,
      sales_review_num
    );
    const newSupport = ModelUtil.averagePoint(
      point.support,
      support,
      support_review_num
    );
    const newUtilization = ModelUtil.averagePoint(
      point.utilization,
      utilization,
      utilization_review_num
    );
    const newRecommendation = ModelUtil.averagePoint(
      point.recommendation,
      recommendation,
      recommendation_review_num
    );
    const newSatisfaction = ModelUtil.averagePoint(
      point.satisfaction,
      satisfaction,
      satisfaction_review_num
    );
    const newTotal = ModelUtil.averagePoint(
      point.total,
      average,
      num_of_reviews
    );

    return {
      total: newTotal,
      sales: newSales,
      support: newSupport,
      utilization: newUtilization,
      recommendation: newRecommendation,
      satisfaction: newSatisfaction,
    };
  };
  static getCurrentPoint = info => {
    const { sales, support, utilization, recommendation, satisfaction } = info;
    const average = ModelUtil.currentAverage([
      sales,
      support,
      utilization,
      recommendation,
      satisfaction,
    ]);
    return {
      total: ModelUtil.incrementIfNotEmpty(average),
      sales: ModelUtil.incrementIfNotEmpty(sales),
      support: ModelUtil.incrementIfNotEmpty(support),
      utilization: ModelUtil.incrementIfNotEmpty(utilization),
      recommendation: ModelUtil.incrementIfNotEmpty(recommendation),
      satisfaction: ModelUtil.incrementIfNotEmpty(satisfaction),
    };
  };
  static currentAverage = array => {
    const target = array.filter(point => {
      return point !== '';
    });
    return (
      target.reduce((prev, current) => {
        return prev + current;
      }) / target.length
    );
  };
  static averagePoint = (current, newer, length) => {
    // 配列のkeyは0から始まるが点数は1から始まるため+1する
    return (current * length + newer + 1) / (length + 1);
  };
  static incrementIfNotEmpty = value => {
    return value === '' ? value : value + 1;
  };
  static incrementArgumentIfNotEmpty = (value, target) => {
    return value === '' ? target : target + 1;
  };
  static addPointHistory = (pointHistory, event) => {
    pointHistory.push(Object.assign(event, { date: now }));
    if (pointHistory.length > 10) pointHistory.shift();
    return pointHistory;
  };
  static objectKeyToSnakeCase = object => {
    let returnObject = {};
    Object.keys(object).forEach(key => {
      Object.assign(returnObject, {
        [ModelUtil.toSnakeCase(key)]: object[key],
      });
    });
    return returnObject;
  };
  static toSnakeCase = camel => {
    return camel.replace(
      /[A-Z]/g,
      string => '_' + string.charAt(0).toLowerCase()
    );
  };
}

export default ModelUtil;
