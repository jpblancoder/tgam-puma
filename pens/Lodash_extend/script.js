console.clear(); // optional

import _ from "lodash";

const SIZES = {
  advStandardArticle: {
    mobile: {
      ldbd: [[1, 2]]
    },
    portrait: {
      ldbd: [[1, 2]]
    },
    landscape: {
      ldbd: [[1, 2]]
    },
    desktop: {
      ldbd: [[1, 2]]
    }
  },
  standardArticle: {
    mobile: {
      // ldbd: [],
      // boxr: [],
      // halfpager: [],
      // flex: [[300, 250], [320, 250]],
      // flex2: [[300, 250], [300, 600]],
      // flex3: [[300, 250]],
      // btyb: [[160, 30]],
    },
    portrait: {
      ldbd: [[728, 90], [768, 250]],
      // boxr: [],
      // halfpager: [],
      // flex: [[728, 90]],
      // flex2: [[300, 250], [728, 90]],
      // flex3: [],
      // btyb: [[160, 30]],
    },
    landscape: {
      ldbd: [[728, 90], [960, 90], [970, 250], [1000, 250], [1024, 250]],
      // boxr: [[300, 250], [300, 600]],
      // halfpager: [[300, 250], [300, 600]],
      // flex: [],
      // flex2: [],
      // flex3: [],
      // btyb: [[160, 30]],
    },
    desktop: {
      ldbd: [[728, 90], [960, 90], [970, 250], [1000, 250], [1800, 250]],
      // boxr: [[300, 250], [300, 600]],
      // halfpager: [[300, 250], [300, 600], [300, 1050]],
      // flex: [],
      // flex2: [],
      // flex3: [],
      // btyb: [[160, 30]],
    }
  }
};

SIZES.advStandardArticle = _.mergeWith(SIZES.advStandardArticle, SIZES.standardArticle, (objValue, srcValue) => {
  if (Array.isArray(objValue)) {
    return objValue.concat(srcValue);
  }
});

console.log(SIZES);
