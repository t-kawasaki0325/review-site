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
    const { point, num_of_reviews } = saas;
    const { sales, support, utilization, recommendation, satisfaction } = info;
    const average =
      (sales + support + utilization + recommendation + satisfaction) / 5;

    const newSales = ModelUtil.averagePoint(point.sales, sales, num_of_reviews);
    const newSupport = ModelUtil.averagePoint(
      point.support,
      support,
      num_of_reviews
    );
    const newUtilization = ModelUtil.averagePoint(
      point.utilization,
      utilization,
      num_of_reviews
    );
    const newRecommendation = ModelUtil.averagePoint(
      point.recommendation,
      recommendation,
      num_of_reviews
    );
    const newSatisfaction = ModelUtil.averagePoint(
      point.satisfaction,
      satisfaction,
      num_of_reviews
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
    const average =
      (sales + support + utilization + recommendation + satisfaction) / 5;
    return {
      total: average + 1,
      sales: sales + 1,
      support: support + 1,
      utilization: utilization + 1,
      recommendation: recommendation + 1,
      satisfaction: satisfaction + 1,
    };
  };
  static averagePoint = (current, newer, length) => {
    // 配列のkeyは0から始まるが点数は1から始まるため+1する
    return (current * length + newer + 1) / (length + 1);
  };
  static addPointHistory = (pointHistory, event) => {
    pointHistory.push(Object.assign(event, { date: now }));
    if (pointHistory.length > 10) pointHistory.shift();
    return pointHistory;
  };
}

export default ModelUtil;
