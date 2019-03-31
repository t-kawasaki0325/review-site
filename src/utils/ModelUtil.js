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
      sales_review_num,
      support_review_num,
      utilization_review_num,
      recommendation_review_num,
      satisfaction_review_num,
    } = saas;
    const { sales, support, utilization, satisfaction, recommendation } = info;

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

    return {
      sales: newSales,
      support: newSupport,
      utilization: newUtilization,
      recommendation: newRecommendation,
      satisfaction: newSatisfaction,
    };
  };
  static getCurrentAverage = info => {
    const { sales, support, utilization, recommendation, satisfaction } = info;
    return ModelUtil.currentAverage([
      sales,
      support,
      utilization,
      recommendation,
      satisfaction,
    ]);
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
    if (newer === '') return current;
    // 配列のkeyは0から始まるが点数は1から始まるため+1する
    return (current * length + newer + 1) / (length + 1);
  };
  static incrementArgumentIfNotEmpty = (value, target) => {
    return value === '' ? target : target + 1;
  };
  static addPointHistory = (pointHistory, event) => {
    pointHistory.push(Object.assign(event, { date: now }));
    if (pointHistory.length > 10) pointHistory.shift();
    return pointHistory;
  };
  static objectKeyChangeCase = (object, toCase = 'snake') => {
    let returnObject = {};
    toCase === 'snake'
      ? Object.keys(object).forEach(key => {
          Object.assign(returnObject, {
            [ModelUtil.toSnakeCase(key)]: object[key],
          });
        })
      : Object.keys(object).forEach(key => {
          Object.assign(returnObject, {
            [ModelUtil.toCamelCase(key)]: object[key],
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
  static toCamelCase = snake => {
    return snake.replace(/_./g, string => string.charAt(1).toUpperCase());
  };
}

export default ModelUtil;
