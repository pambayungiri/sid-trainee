import enUSLocale from "./src/app/utils/locale/en/en-US.json";
import idIDLocale from "./src/app/utils/locale/id/id-ID.json";

const locale = "id-ID";
const locales = {
  "en-US": enUSLocale,
  "id-ID": idIDLocale
};
const lang = locales[locale];

global.my = {
  showLoading: vi.fn(),
  hideLoading: vi.fn(),
  hideBackHome: vi.fn(),
  showModal: vi.fn(),
  request: vi.fn(({ success, fail }) => {
    success && success({});

    fail &&
      fail({
        error: "error",
        errorMessage: "errorMessage"
      });
  }),
  getStorageSync: vi.fn(() => ({})),
  showShareMenu: vi.fn(),
  showToast: vi.fn(),
  alert: vi.fn(),
  getSystemInfoSync: vi.fn(),
  getSystemInfo: vi.fn(({ success, fail }) => {
    success && success({});

    fail &&
      fail({
        error: "error",
        errorMessage: "errorMessage"
      });
  }),
  removeStorageSync: vi.fn(),
  reLaunch: vi.fn(),
  redirectTo: vi.fn(),
  canIUse: vi.fn(),
  setNavigationBar: vi.fn(),
  setCanPullDown: vi.fn(),
  getLocation: vi.fn(({ cacheTimeout, type, success, fail, complete }) => {
    success &&
      success({
        longitude: "longitude",
        latitude: "latitude",
        accuracy: "accuracy",
        horizontalAccuracy: "Horizontal Accuracy",
        country: "country",
        countryCode: "Country code",
        province: "province",
        city: "city",
        cityAdcode: "city-level area code",
        district: "district and county",
        districtAdcode: "District code at the district and county level",
        streetNumber: {},
        pois: []
      });

    fail &&
      fail({
        error: "error",
        errorMessage: "errorMessage"
      });

    complete &&
      complete({
        cacheTimeout: cacheTimeout,
        type: type
      });
  }),
  getAuthCode: vi.fn(({ scopes, success, fail, complete }) => {
    success &&
      success({
        authCode: scopes, // mock authCode
        authErrorScopes: {},
        authSuccessScopes: []
      });
    fail &&
      fail({
        errorMessage: "this is errorMessage"
      });
    complete && complete();
  }),
  navigateTo: vi.fn(({ url, complete, success, fail }) => {
    complete &&
      complete({
        error: undefined,
        errorMessage: undefined
      });

    success && success();
    if (url) {
      // console.log("Navigating to URL:", url);
    }
    fail &&
      fail({
        error: "error",
        errorMessage: "errorMessage"
      });
  }),
  navigateBack: vi.fn(),
  setStorageSync: vi.fn(),
  authorize: vi.fn(({ scopes }) => {
    // Perform authorization actions based on the given scopes

    if (scopes.includes("read")) {
      // console.log('Authorization for reading data');
      // Perform authorization action for reading data
    }

    if (scopes.includes("write")) {
      // console.log('Authorization for writing data');
      // Perform authorization action for writing data
    }

    return {};
  }),
  tb: {
    chooseAddress: ({
      addAddress,
      searchAddress,
      locateAddress,
      success,
      fail
    }) => {
      // Simulate the logic for adding an address
      if (addAddress) {
        // console.log('Adding address:', addAddress);
        // Perform the logic to add the address
      }

      // Simulate the logic for searching an address
      if (searchAddress) {
        // console.log('Searching address:', searchAddress);
        // Perform the logic to search for the address
      }

      // Simulate the logic for locating an address
      if (locateAddress) {
        // console.log('Locating address:', locateAddress);
        // Perform the logic to locate the address
      }

      success &&
        success({
          type: "locationAddress",
          name: "my.tb.chooseAddress",
          latitude: "111",
          longitude: "222"
        });

      fail &&
        fail({
          error: "error",
          errorMessage: "errorMessage"
        });
    }
  },
  chooseLocation: vi.fn(({ success, fail }) => {
    success &&
      success({
        latitude: "12",
        longitude: "345",
        address: "chooseLocation address",
        name: "chooseLocation name"
      });

    fail &&
      fail({
        error: "error",
        errorMessage: "errorMessage"
      });
  }),
  showAuthGuide: vi.fn(),
  stopPullDownRefresh: vi.fn()
};

const appOptions = {
  globalData: {
    locale: lang
  },
  onLaunch: vi.fn()
};

global.getApp = vi.fn(() => appOptions);

global.Page = ({ data, ...rest }) => {
  const page = {
    data,
    /**
     * mock ali miniprogram this.setData function
     * https://opendocs.alipay.com/mini/framework/page-detail#Page.prototype.setData(data%3A%20Object%2C%20callback%3A%20Function)
     */
    setData: vi.fn(function setData(newData, cb) {
      const keys = Object.keys(newData);
      keys.forEach(key => {
        const arr = [];
        const _keys = key.split(".");
        _keys.forEach(_key => {
          const reg = /(\w+)?(\[(\d+)\])/g;
          let matched;
          let mark = false;
          while ((matched = reg.exec(_key))) {
            mark = true;
            if (matched[1]) {
              arr.push(matched[1]);
            }
            if (matched[3]) {
              arr.push(+matched[3]);
            }
          }
          if (!mark) {
            arr.push(_key);
          }
        });

        arr.reduce((obj, prop, index) => {
          if (index === arr.length - 1) {
            obj[prop] = newData[key]; // Separate assignment statement
            return obj[prop];
          }
          if (obj[prop]) {
            return obj[prop];
          }
          if (typeof arr[index + 1] === "number") {
            obj[prop] = [];
            return obj[prop];
          }
          obj[prop] = {};
          return obj[prop];
        }, this.data);
      });
      cb && cb();
    }),
    /**
     * mock ali miniprogram this.$spliceData function
     * https://opendocs.alipay.com/mini/framework/page-detail#Page.prototype.%24spliceData(data%3A%20Object%2C%20callback%3A%20Function)
     */
    $spliceData: vi.fn(function $spliceData(data, cb) {
      const keys = Object.keys(data);
      keys.forEach(key => {
        let _obj;
        const _keys = key.split(".");
        const arr = _keys.reduce((data, prop) => {
          _obj = data;
          const reg = /(\w+)?(\[(\d+)\])/g;
          let matched;
          let mark = false;
          while ((matched = reg.exec(prop))) {
            mark = true;
            if (matched[1]) {
              _obj = _obj[matched[1]];
            }
            if (matched[3]) {
              _obj = _obj[matched[3]];
            }
          }
          if (mark) return _obj;
          return _obj[prop];
        }, this.data);
        arr.splice(data[key][0], data[key][1], ...data[key].slice(2));
      });
      cb && cb();
    }),
    ...rest
  };
  global.pageInstance = page;
  return page;
};

global.getCurrentPages = vi.fn(() => []);

global.delay = timeout => {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
};
