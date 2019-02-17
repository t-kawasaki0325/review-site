class ModelUtil {
  static initializeKeys = object => {
    const keys = Object.keys(object);
    let value = {};

    keys.forEach(element => {
      Object.assign(value, { [element]: 0 });
    });
    return value;
  };
}

export default ModelUtil;
