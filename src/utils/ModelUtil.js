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
    const { point, numOfReviews } = saas;
    const { sales, support, utilization, recommendation, satisfaction } = info;
    const average =
      (sales + support + utilization + recommendation + satisfaction) / 5;

    const newSales = ModelUtil.averagePoint(point.sales, sales, numOfReviews);
    const newSupport = ModelUtil.averagePoint(
      point.support,
      support,
      numOfReviews
    );
    const newUtilization = ModelUtil.averagePoint(
      point.utilization,
      utilization,
      numOfReviews
    );
    const newRecommendation = ModelUtil.averagePoint(
      point.recommendation,
      recommendation,
      numOfReviews
    );
    const newSatisfaction = ModelUtil.averagePoint(
      point.satisfaction,
      satisfaction,
      numOfReviews
    );
    const newTotal = ModelUtil.averagePoint(point.total, average, numOfReviews);

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
}

export default ModelUtil;
