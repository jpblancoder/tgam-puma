console.clear();

import _ from "lodash";

// the ad guidelines sizes for different sections and pages
const SIZES = {
  standardArticle: {
    mobile: {
      ldbd: [],
      boxr: [],
      halfpager: [],
      flex: [[300, 250], [320, 250]],
      flex2: [[300, 250], [300, 600]],
      flex3: [[300, 250]],
      btyb: [[160, 30]]
    },
    portrait: {
      ldbd: [[728, 90], [768, 250]],
      boxr: [],
      halfpager: [],
      flex: [[728, 90]],
      flex2: [[300, 250], [728, 90]],
      flex3: [],
      btyb: [[160, 30]]
    },
    landscape: {
      ldbd: [[728, 90], [960, 90], [970, 250], [1000, 250], [1024, 250]],
      boxr: [[300, 250], [300, 600]],
      halfpager: [[300, 250], [300, 600]],
      flex: [],
      flex2: [],
      flex3: [],
      btyb: [[160, 30]]
    },
    desktop: {
      ldbd: [[728, 90], [960, 90], [970, 250], [1000, 250], [1800, 250]],
      boxr: [[300, 250], [300, 600]],
      halfpager: [[300, 250], [300, 600], [300, 1050]],
      flex: [],
      flex2: [],
      flex3: [],
      btyb: [[160, 30]]
    }
  },
  premiumArticle: {
    mobile: {
      ldbd: [],
      boxr: [],
      halfpager: [],
      flex: [[300, 250]],
      flex2: [[300, 250], [300, 600]],
      flex3: [[300, 250]],
      btyb: [[160, 30]]
    },
    portrait: {
      ldbd: [[728, 90]],
      boxr: [],
      halfpager: [],
      flex: [[728, 90]],
      flex2: [[728, 90], [768, 600]],
      flex3: [],
      btyb: [[160, 30]]
    },
    landscape: {
      ldbd: [[728, 90], [960, 90], [970, 250], [1000, 250]],
      boxr: [],
      halfpager: [],
      flex: [[728, 90], [960, 90], [970, 250]],
      flex2: [[728, 90], [960, 90], [970, 250], [1024, 600]],
      flex3: [],
      btyb: [[160, 30]]
    },
    desktop: {
      ldbd: [[728, 90], [960, 90], [970, 250], [1000, 250]],
      boxr: [],
      halfpager: [],
      flex: [[728, 90], [960, 90], [970, 250], [1000, 250]],
      flex2: [[728, 90], [960, 90], [970, 250], [1000, 250], [1000, 700], [1024, 600]],
      flex3: [],
      btyb: [[160, 30]]
    }
  },
  standardSection: {
    mobile: {
      ldbd: [],
      boxr: [],
      boxr2: [],
      halfpager: [],
      flex: [[300, 250], [320, 250]],
      flex2: [[300, 250], [300, 600]],
      flex3: [[300, 250]],
      btyb: [[160, 30]]
    },
    portrait: {
      ldbd: [[728, 90], [768, 250]],
      boxr: [],
      boxr2: [],
      halfpager: [],
      flex: [[300, 250]],
      flex2: [[300, 250]],
      flex3: [],
      btyb: [[160, 30]]
    },
    landscape: {
      ldbd: [[728, 90], [960, 90], [970, 250], [1000, 250], [1024, 250]],
      boxr: [[300, 250], [300, 600]],
      boxr2: [[300, 250]],
      halfpager: [[300, 250], [300, 600]],
      flex: [],
      flex2: [],
      flex3: [],
      btyb: [[160, 30]]
    },
    desktop: {
      ldbd: [[728, 90], [960, 90], [970, 250], [1000, 250], [1800, 250]],
      boxr: [[300, 250], [300, 600]],
      boxr2: [[300, 250]],
      halfpager: [[300, 250], [300, 600]],
      flex: [],
      flex2: [],
      flex3: [],
      btyb: [[160, 30]]
    }
  },
  premiumSection: {
    mobile: {
      ldbd: [],
      boxr: [],
      halfpager: [],
      flex: [[300, 250]],
      flex2: [[300, 250], [300, 600]],
      flex3: [[300, 250]]
    },
    portrait: {
      ldbd: [[728, 90]],
      boxr: [],
      halfpager: [],
      flex: [[300, 250]],
      flex2: [[300, 250]],
      flex3: []
    },
    landscape: {
      ldbd: [[728, 90], [960, 90], [970, 250]],
      boxr: [[300, 250], [300, 600]],
      halfpager: [[300, 250], [300, 600]],
      flex: [],
      flex2: [],
      flex3: []
    },
    desktop: {
      ldbd: [[728, 90], [960, 90], [970, 250]],
      boxr: [[300, 250], [300, 600]],
      halfpager: [[300, 250], [300, 600]],
      flex: [],
      flex2: [],
      flex3: []
    }
  },
  premiumSectionInvesting: {
    mobile: {
      ldbd: [],
      boxr: [],
      halfpager: [],
      flex: [[300, 250]],
      flex2: [[300, 250], [300, 600]],
      flex3: [[300, 250]]
    },
    portrait: {
      ldbd: [[728, 90]],
      boxr: [],
      halfpager: [],
      flex: [[300, 250]],
      flex2: [[300, 250]],
      flex3: []
    },
    landscape: {
      ldbd: [[728, 90], [960, 90]],
      boxr: [[300, 250], [300, 600]],
      halfpager: [[300, 250], [300, 600]],
      flex: [],
      flex2: [],
      flex3: []
    },
    desktop: {
      ldbd: [[728, 90], [960, 90]],
      boxr: [[300, 250], [300, 600]],
      halfpager: [[300, 250], [300, 600]],
      flex: [],
      flex2: [],
      flex3: []
    }
  },
  homePage: {
    mobile: {
      ldbd: [],
      boxr: [],
      boxr2: [],
      halfpager: [],
      flex: [[300, 250], [320, 250]],
      flex2: [[300, 250], [300, 600]],
      flex3: [[300, 250]],
      flex4: [[300, 250]]
    },
    portrait: {
      ldbd: [[728, 90], [768, 250]],
      boxr: [],
      boxr2: [],
      halfpager: [],
      flex: [[300, 250], [728, 90]],
      flex2: [[300, 250], [728, 90]],
      flex3: [[300, 250]],
      flex4: []
    },
    landscape: {
      ldbd: [[728, 90], [960, 90], [970, 250], [1024, 250]],
      boxr: [[300, 250], [300, 600]],
      boxr2: [[300, 250], [300, 600]],
      halfpager: [[300, 250], [300, 600]],
      flex: [],
      flex2: [],
      flex3: [],
      flex4: []
    },
    desktop: {
      ldbd: [[728, 90], [960, 90], [970, 250], [1000, 250], [1800, 250]],
      boxr: [[300, 250], [300, 600]],
      boxr2: [[300, 250], [300, 600]],
      halfpager: [[300, 250], [300, 600]],
      flex: [],
      flex2: [],
      flex3: [],
      flex4: []
    }
  },
  template1: {
    mobile: {
      ldbd: [],
      boxr: [],
      boxr2: [],
      halfpager: [],
      flex: [[300, 250], [320, 250]],
      flex2: [[300, 250], [300, 600]],
      flex3: [[300, 250]],
      btyb: [[160, 30]]
    },
    portrait: {
      ldbd: [[728, 90], [768, 250]],
      boxr: [],
      boxr2: [],
      halfpager: [],
      flex: [[300, 250]],
      flex2: [[300, 250]],
      flex3: [],
      btyb: [[160, 30]]
    },
    landscape: {
      ldbd: [[728, 90], [960, 90], [970, 250], [1000, 250], [1024, 250]],
      boxr: [[300, 250], [300, 600]],
      boxr2: [[300, 250]],
      halfpager: [[300, 250], [300, 600]],
      flex: [],
      flex2: [],
      flex3: [],
      btyb: [[160, 30]]
    },
    desktop: {
      ldbd: [[728, 90], [960, 90], [970, 250], [1000, 250], [1800, 250]],
      boxr: [[300, 250], [300, 600]],
      boxr2: [[300, 250]],
      halfpager: [[300, 250], [300, 600]],
      flex: [],
      flex2: [],
      flex3: [],
      btyb: [[160, 30]]
    }
  },
  static: {
    mobile: {
      ldbd: [],
      boxr: [],
      boxr2: [],
      halfpager: [],
      flex: [[300, 250], [320, 250]],
      flex2: [[300, 250], [300, 600]],
      flex3: [[300, 250]],
      btyb: [[160, 30]]
    },
    portrait: {
      ldbd: [[728, 90], [768, 250]],
      boxr: [],
      boxr2: [],
      halfpager: [],
      flex: [[300, 250]],
      flex2: [[300, 250]],
      flex3: [],
      btyb: [[160, 30]]
    },
    landscape: {
      ldbd: [[728, 90], [960, 90], [970, 250], [1000, 250], [1024, 250]],
      boxr: [],
      boxr2: [],
      halfpager: [],
      flex: [[300, 250]],
      flex2: [[300, 250]],
      flex3: [],
      btyb: [[160, 30]]
    },
    desktop: {
      ldbd: [[728, 90], [960, 90], [970, 250], [1000, 250], [1800, 250]],
      boxr: [],
      boxr2: [],
      halfpager: [],
      flex: [[300, 250]],
      flex2: [[300, 250]],
      flex3: [],
      btyb: [[160, 30]]
    }
  },
  financialPage: {
    mobile: {
      ldbd: [],
      boxr: [],
      halfpager: [],
      flex: [[300, 250], [320, 250]],
      flex2: [[300, 250], [300, 600]],
      flex3: []
    },
    portrait: {
      ldbd: [[728, 90], [768, 250]],
      boxr: [],
      halfpager: [],
      flex: [[300, 250]],
      flex2: [],
      flex3: []
    },
    landscape: {
      ldbd: [[728, 90], [960, 90], [970, 250], [1024, 250]],
      boxr: [[300, 250], [300, 600]],
      halfpager: [[300, 250], [300, 600]],
      flex: [],
      flex2: [],
      flex3: []
    },
    desktop: {
      ldbd: [[728, 90], [960, 90], [970, 250], [1000, 250], [1800, 250]],
      boxr: [[300, 250], [300, 600]],
      halfpager: [[300, 250], [300, 600]],
      flex: [],
      flex2: [],
      flex3: []
    },
  },
  financialPageWatchlist: {
    mobile: {
      ldbd: [],
      boxr: [],
      halfpager: [],
      flex: [[300, 250], [320, 250]],
      flex2: [],
      flex3: []
    },
    portrait: {
      ldbd: [[728, 90]],
      boxr: [],
      halfpager: [],
      flex: [[300, 250]],
      flex2: [],
      flex3: []
    },
    landscape: {
      ldbd: [[728, 90]],
      boxr: [],
      halfpager: [],
      flex: [],
      flex2: [],
      flex3: []
    },
    desktop: {
      ldbd: [[728, 90]],
      boxr: [],
      halfpager: [],
      flex: [],
      flex2: [],
      flex3: []
    }
  },
  // gallery - enhanced viewer (dynamic) ad
  galleyFlex: {
    mobile: {
      galflex: [[300, 250]]
    },
    portrait: {
      galflex: [[300, 250]]
    },
    landscape: {
      galflex: [[300, 250]]
    },
    desktop: {
      galflex: [[300, 250]]
    }
  },
  // comments - right-rail sticky (dynamic) ad
  commentsBox: {
    mobile: {
      boxc: []
    },
    portrait: {
      boxc: []
    },
    landscape: {
      boxc: [[300, 250]]
    },
    desktop: {
      boxc: [[300, 250]]
    }
  }
};

const compare = (a, b) => {
  const result = {
    different: [],
    missing_from_first: [],
    missing_from_second: []
  };
  _.reduce(a, (result, value, key) => {
    if (b.hasOwnProperty(key)) {
      if (_.isEqual(value, b[key])) {
        return result;
      } else {
        if (typeof (a[key]) != typeof ({}) || typeof (b[key]) != typeof ({})) {
          //dead end.
          result.different.push(key);
          return result;
        } else {
          let deeper = compare(a[key], b[key]);
          result.different = result.different.concat(_.map(deeper.different, subPath => {
            return key + "." + subPath;
          }));

          result.missing_from_second = result.missing_from_second.concat(_.map(deeper.missing_from_second, subPath => {
            return key + "." + subPath;
          }));

          result.missing_from_first = result.missing_from_first.concat(_.map(deeper.missing_from_first, subPath => {
            return key + "." + subPath;
          }));
          return result;
        }
      }
    } else {
      result.missing_from_second.push(key);
      return result;
    }
  }, result);

  _.reduce(b, (result, value, key) => {
    if (a.hasOwnProperty(key)) {
      return result;
    } else {
      result.missing_from_first.push(key);
      return result;
    }
  }, result);

  return result;
};

const compare1 = compare(SIZES.standardArticle, SIZES.template1);
console.log("article vs template1: ", JSON.stringify(compare1, null, 2));

const compare2 = compare(SIZES.standardArticle, SIZES.static);
console.log("article vs static: ", JSON.stringify(compare2, null, 2));

const compare3 = compare(SIZES.template1, SIZES.static);
console.log("template1 vs static: ", JSON.stringify(compare3, null, 2));

