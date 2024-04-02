require('source-map-support/register');
module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./server/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./server/api/index.js":
/*!*****************************!*\
  !*** ./server/api/index.js ***!
  \*****************************/
/*! exports provided: envConfigs, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "envConfigs", function() { return envConfigs; });
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ "express");
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! axios */ "axios");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var apicache__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! apicache */ "apicache");
/* harmony import */ var apicache__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(apicache__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var redis__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! redis */ "redis");
/* harmony import */ var redis__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(redis__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var qs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! qs */ "qs");
/* harmony import */ var qs__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(qs__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var body_parser__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! body-parser */ "body-parser");
/* harmony import */ var body_parser__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(body_parser__WEBPACK_IMPORTED_MODULE_5__);
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }





// import { envConfigs } from '../../config';
let baseUrl = 'http://localhost:3000'; // http://localhost:3000
let siteUrl = 'http://kontainer-api.test'; // https://kontainer.dev.konform.com // no trailing slash
let apiUrl = 'http://kontainer-api.test/'; // 'https://kontainercms.dev.konform.com'
let appUrl = 'http://kontainer.test';
let sentryDSN = 'https://52449f0e189c4bdc9abcf7274853a78b@sentry.konform.com/24';
if (process.env.SERVER_NAME === 'production') {
  baseUrl = 'https://kontainer.com';
  siteUrl = 'https://kontainer.com';
  apiUrl = 'https://cms.kontainer.com';
  appUrl = 'https://app.kontainer.com';
  sentryDSN = 'https://ed48997570fa466fb0a3fd668ea387ea@sentry.konform.com/15';
} else if (process.env.SERVER_NAME === 'next') {
  baseUrl = 'https://kontainer.dev.konform.com';
  siteUrl = 'https://kontainer.dev.konform.com';
  apiUrl = 'https://kontainercms.dev.konform.com';
  appUrl = 'https://next.kontainer.com';
}
const envConfigs = {
  env: {
    baseUrl,
    siteUrl,
    apiUrl,
    appUrl,
    postTypes: {
      news: 'news',
      blog: 'blog',
      prices: 'prices',
      prices_new: 'prices_new',
      cases: 'cases'
    }
  }
};
const DEFAULT_LOCALE = "en";

const router = Object(express__WEBPACK_IMPORTED_MODULE_0__["Router"])();
const redisOptions = process.env.REDIS_DB ? {
  db: process.env.REDIS_DB
} : {};
const redisClient = redis__WEBPACK_IMPORTED_MODULE_3___default.a.createClient(redisOptions);
const cacheOptions = {
  headers: {
    'cache-control': 'no-cache'
  },
  defaultDuration: '100 hours'
};
if (true) {
  cacheOptions.redisClient = redisClient;
}
const cache = apicache__WEBPACK_IMPORTED_MODULE_2___default.a.options(cacheOptions).middleware;
router.use(body_parser__WEBPACK_IMPORTED_MODULE_5___default.a.json({
  limit: '50mb'
}));
router.use(body_parser__WEBPACK_IMPORTED_MODULE_5___default.a.urlencoded({
  extended: true
}));
const wpapi = axios__WEBPACK_IMPORTED_MODULE_1___default.a.create({
  baseURL: envConfigs.env.apiUrl
});
const getUrlWithLangPrefix = (path, options) => {
  const {
    params: {
      lang = false
    } = {}
  } = options;
  const base = `/wp-json/${path}`;
  if (lang && lang !== DEFAULT_LOCALE) {
    return `/${lang}${base}`;
  }
  return base;
};
console.log(envConfigs.env.apiUrl);
router.get('/global', cache('10 minutes'), (req, res, next) => {
  const axiosOptions = {
    params: _objectSpread({}, req.query)
  };
  const optionsUrl = getUrlWithLangPrefix('kustom/options', axiosOptions);
  const menuPrimaryUrl = getUrlWithLangPrefix('kustom/menu/primary', axiosOptions);
  const categoriesUrl = getUrlWithLangPrefix('wp/v2/categories', axiosOptions);
  axios__WEBPACK_IMPORTED_MODULE_1___default.a.all([wpapi.get(optionsUrl, axiosOptions), wpapi.get(menuPrimaryUrl, axiosOptions), wpapi.get(categoriesUrl, axiosOptions)])
  // eslint-disable-next-line max-params
  .then(axios__WEBPACK_IMPORTED_MODULE_1___default.a.spread((options, primary, categories) => {
    res.json({
      options: prepareAcf(options.data),
      menus: {
        primary: primary.data
      },
      categories: prepareCategories(categories.data)
    });
  })).catch(e => {
    console.log(e);
    res.status(404).send('Could not get global options');
  });
});
router.post('/sendmessage', (req, res, next) => {
  const contactUrl = getUrlWithLangPrefix('kustom/contactform', req.body);
  wpapi.post(contactUrl, req.body).then(response => {
    res.json({
      success: true
    });
  }).catch(e => {
    res.status(400).send('Something went wrong');
  });
});
router.post('/signupcontactform', (req, res, next) => {
  const contactUrl = getUrlWithLangPrefix('kustom/signupcontactform', req.body);
  wpapi.post(contactUrl, req.body).then(response => {
    res.json({
      success: true
    });
  }).catch(e => {
    res.status(400).send('Something went wrong');
  });
});
router.get('/search/:q', (req, res, next) => {
  const axiosOptions = {
    params: _objectSpread({}, req.query)
  };
  const searchUrl = getUrlWithLangPrefix(`kustom/search/${req.params.q}`, axiosOptions);
  wpapi.get(searchUrl, axiosOptions).then(response => {
    res.json(prepareCollection(response.data));
  }).catch(e => {
    res.status(404).send('Not found');
  });
});
router.get('/content/home', cache('10 minutes'), (req, res, next) => {
  const axiosOptions = {
    params: _objectSpread({}, req.query)
  };
  const frontpageUrl = getUrlWithLangPrefix('kustom/frontpage', axiosOptions);
  wpapi.get(frontpageUrl, axiosOptions).then(response => {
    const pagesUrl = getUrlWithLangPrefix(`wp/v2/pages/${response.data}`, axiosOptions);
    wpapi.get(pagesUrl, axiosOptions).then(pageresponse => {
      const pageData = preparePage(pageresponse.data);
      res.json(pageData);
    }).catch(e => {
      console.warn('Frontpage died 2', e);
      res.status(404).send('Not found');
    });
  }).catch(e => {
    console.warn('Frontpage died');
    res.status(404).send('Not found');
  });
});
const postTypes = envConfigs.env.postTypes;
function prepareCollection(posts) {
  const collection = [];
  Object.keys(posts).forEach(i => {
    collection.push(preparePage(posts[i]));
  });
  return collection;
}
function prepareCollectionFromArray(posts) {
  const collection = [];
  for (let i = 0; i < posts.length; i += 1) {
    collection.push(preparePage(posts[i]));
  }
  return collection;
}
function prepareAcf(data) {
  const result = {};
  if (typeof data === 'object') {
    Object.keys(data).forEach(i => {
      let field = data[i];
      if (Array.isArray(field) && field.length) {
        if (field[0].ID) {
          field = field.map(normalizePost);
        } else {
          field = field.map(prepareAcf);
        }
      }
      result[i] = field;
    });
  }
  return result;
}
function normalizePost(post) {
  return {
    date: post.post_date,
    title: post.post_title,
    type: post.post_type,
    slug: post.slug || post.post_name
  };
}
function preparePage(data) {
  const acfData = data.custom ? prepareAcf(data.custom) : null;
  const page = {
    id: data.id,
    title: data.title,
    slug: data.slug,
    date: data.date,
    type: data.type,
    categories: data.categories || [],
    translated: data.translated,
    taxonomies: data.taxonomies,
    yoast_title: data.yoast_title,
    yoast_meta: data.yoast_meta,
    yoast_json_ld: data.yoast_json_ld
  };
  if (acfData) {
    Object.keys(acfData).forEach(i => {
      page[i] = acfData[i];
    });
  }
  return page;
}
function prepareCategories(items) {
  const categories = {};
  for (let i = 0; i < items.length; i += 1) {
    const item = items[i];
    categories[item.id] = {
      slug: item.slug,
      name: item.name
    };
  }
  return categories;
}
router.get('/content/:collection/preview', (req, res, next) => {
  const {
    collection
  } = req.params;
  const postType = postTypes[collection];
  const {
    key
  } = req.query;
  const axiosOptions = {
    params: _objectSpread({}, req.query)
  };
  if (postType) {
    // eslint-disable-next-line no-console
    console.log('Getting collection archive', postType);
    const pagesUrl = getUrlWithLangPrefix('wp/v2/pages', axiosOptions);
    const postTypeUrl = getUrlWithLangPrefix(`wp/v2/${postType}`, axiosOptions);
    axios__WEBPACK_IMPORTED_MODULE_1___default.a.all([wpapi.get(pagesUrl, {
      params: _objectSpread(_objectSpread({}, req.query), {}, {
        slug: collection
      })
    }), wpapi.get(postTypeUrl, axiosOptions)]).then(axios__WEBPACK_IMPORTED_MODULE_1___default.a.spread((page, posts) => {
      const pagedata = preparePage(page.data[0]);
      pagedata.posts = {
        [collection]: prepareCollection(posts.data)
      };
      res.json(pagedata);
    })).catch(e => {
      res.status(404).send('Not found');
    });
  } else {
    const pageCollectionUrl = getUrlWithLangPrefix(`wp/v2/pages/${collection}/`, axiosOptions);
    wpapi.get(pageCollectionUrl, {
      params: _objectSpread(_objectSpread({}, req.query), {}, {
        preview: true,
        previewkey: key
      })
    }).then(response => {
      res.json(preparePage(response.data));
    }).catch(e => {
      res.status(404).send('Not found');
    });
  }
});
function prepTaxonomy(data = []) {
  return data.map(item => {
    return {
      id: item.id,
      name: item.name,
      slug: item.slug,
      parent: item.parent,
      description: item.description
    };
  });
}
router.get('/content/taxonomy/:taxonomy', cache('10 minutes'), (req, res, next) => {
  const {
    taxonomy
  } = req.params;
  const axiosOptions = {
    params: req.query
  };
  const taxonomyUrl = getUrlWithLangPrefix(`wp/v2/${taxonomy}`, axiosOptions);
  wpapi.get(taxonomyUrl, {
    params: _objectSpread({}, req.query)
  }).then(response => {
    res.json(prepTaxonomy(response.data));
  }).catch(e => {
    res.status(404).send('Not found');
  });
});
router.get('/content/:collection', cache('10 minutes'), (req, res, next) => {
  const {
    collection
  } = req.params;
  const postType = postTypes[collection];
  const axiosOptions = {
    params: req.query
  };
  const pageUrl = getUrlWithLangPrefix('wp/v2/pages', axiosOptions);
  if (postType) {
    // eslint-disable-next-line no-console
    console.log('Getting collection archive', postType);
    const postTypeUrl = getUrlWithLangPrefix(`wp/v2/${postType}`, axiosOptions);
    axios__WEBPACK_IMPORTED_MODULE_1___default.a.all([wpapi.get(pageUrl, {
      params: _objectSpread(_objectSpread({}, req.query), {}, {
        slug: collection
      })
    }), wpapi.get(postTypeUrl, axiosOptions)]).then(axios__WEBPACK_IMPORTED_MODULE_1___default.a.spread((page, posts) => {
      const pagedata = preparePage(page.data[0]);
      pagedata.posts = {
        [collection]: prepareCollection(posts.data)
      };
      res.json(pagedata);
    })).catch(e => {
      res.status(404).send('Not found');
    });
  } else {
    wpapi.get(pageUrl, {
      params: _objectSpread(_objectSpread({}, req.query), {}, {
        slug: collection
      })
    }).then(response => {
      res.json(preparePage(response.data[0]));
    }).catch(e => {
      res.status(404).send('Not found');
    });
  }
});
router.get('/content/list/:collection', cache('10 minutes'), (req, res, next) => {
  const {
    collection
  } = req.params;
  const postType = postTypes[collection];
  const axiosOptions = {
    params: req.query
  };
  const postTypeUrl = getUrlWithLangPrefix(`wp/v2/${postType}`, axiosOptions);
  wpapi.get(postTypeUrl, axiosOptions).then(response => {
    const result = prepareCollectionFromArray(response.data);
    res.json(result);
  }).catch(e => {
    res.status(404).send('Not found');
  });
});
router.get('/content/:collection/:slug/preview', (req, res, next) => {
  const {
    collection,
    slug
  } = req.params;
  const {
    key
  } = req.query;
  const postType = postTypes[collection];
  const axiosOptions = {
    params: _objectSpread(_objectSpread({}, req.query), {}, {
      preview: true,
      previewkey: key,
      slug
    })
  };
  const postTypeUrl = getUrlWithLangPrefix(`wp/v2/${postType}`, axiosOptions);
  wpapi.get(postTypeUrl, axiosOptions).then(response => {
    res.json(preparePage(response.data[0]));
  }).catch(e => {
    res.status(404).send('Not found');
  });
});
router.get('/content/:collection/:slug', cache('10 minutes'), (req, res, next) => {
  const {
    collection,
    slug
  } = req.params;
  const postType = postTypes[collection];
  const axiosOptions = {
    params: _objectSpread(_objectSpread({}, req.query), {}, {
      slug
    })
  };
  const postTypeUrl = getUrlWithLangPrefix(`wp/v2/${postType}`, axiosOptions);
  wpapi.get(postTypeUrl, axiosOptions).then(response => {
    res.json(preparePage(response.data[0]));
  }).catch(e => {
    res.status(404).send('Not found');
  });
});
router.get('/cache/index', (req, res) => {
  redisClient.keys('*', (err, keys) => {
    res.json(keys);
  });
});
router.get('/cache/reindex', (req, res, next) => {
  redisClient.keys('*', (err, keys) => {
    for (let i = 0; i < keys.length; i += 1) {
      deleteUrlFromCache(req, keys[i]);
    }
  });
  res.send('Cache cleared');
});
router.get('/cache/clear', (req, res, next) => {
  redisClient.keys('*', (err, keys) => {
    for (let i = 0; i < keys.length; i += 1) {
      redisClient.del(keys[i]);
    }
  });
  apicache__WEBPACK_IMPORTED_MODULE_2___default.a.clear();
  res.send('Cache cleared');
});
function deleteUrlFromCache(req, url, deep = false, params = false) {
  let urlWithQS = url;
  if (params && params.lang) {
    urlWithQS = url + qs__WEBPACK_IMPORTED_MODULE_4___default.a.stringify(params, {
      addQueryPrefix: true
    });
  }

  // eslint-disable-next-line no-console
  console.log('Deleting url from cache', urlWithQS);
  redisClient.del(urlWithQS);
  axios__WEBPACK_IMPORTED_MODULE_1___default.a.get(`${req.protocol}://${req.get('host')}${url}`);
  if (deep) {
    redisClient.keys('*', (err, keys) => {
      for (let i = 0; i < keys.length; i += 1) {
        if (keys[i].indexOf(url) === 0) {
          deleteUrlFromCache(req, keys[i]);
        }
      }
    });
  }
}
router.post('/cache/clear', (req, res, next) => {
  const {
    slug,
    type,
    lang
  } = req.body;
  console.log('Clear cache, type:', type, ' slug:', slug, ' lang: ', lang); // eslint-disable-line no-console
  if (type === 'global') {
    deleteUrlFromCache(req, '/api/global', false, {
      lang
    });
    return res.send('options cleared');
  }
  let redisKey = '/api/content/';
  if (type !== 'page') {
    redisKey += postTypes[type] ? postTypes[type] : type;
    if (postTypes[type]) {
      deleteUrlFromCache(req, `/api/content/list/${postTypes[type]}`, true, {
        lang
      });
      deleteUrlFromCache(req, '/api/content/home', false, {
        lang
      });
      deleteUrlFromCache(req, redisKey, false, {
        lang
      });
    }
    if (slug) redisKey += '/';
  }
  redisKey += slug;
  deleteUrlFromCache(req, redisKey, false, {
    lang
  });
  res.send(redisKey);
});
/* harmony default export */ __webpack_exports__["default"] = (router);

/***/ }),

/***/ "./server/index.js":
/*!*************************!*\
  !*** ./server/index.js ***!
  \*************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ "express");
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! http */ "http");
/* harmony import */ var http__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(http__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var nuxt__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! nuxt */ "nuxt");
/* harmony import */ var nuxt__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(nuxt__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _api_index_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./api/index.js */ "./server/api/index.js");
// server/index.js




async function start() {
  const app = express__WEBPACK_IMPORTED_MODULE_0___default()();
  const nuxt = await Object(nuxt__WEBPACK_IMPORTED_MODULE_2__["loadNuxt"])( true ? 'dev' : undefined);
  const server = Object(http__WEBPACK_IMPORTED_MODULE_1__["createServer"])(app);

  // Apply API middleware
  app.use('/api', _api_index_js__WEBPACK_IMPORTED_MODULE_3__["default"]);

  // Build in development
  if (nuxt.options.dev) {
    Object(nuxt__WEBPACK_IMPORTED_MODULE_2__["build"])(nuxt);
  }
  app.use(nuxt.render);
  const port = process.env.PORT || 3000;
  server.listen(port, () => console.log(`Server listening on port: ${port}`));
}
start();

/***/ }),

/***/ "apicache":
/*!***************************!*\
  !*** external "apicache" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("apicache");

/***/ }),

/***/ "axios":
/*!************************!*\
  !*** external "axios" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("axios");

/***/ }),

/***/ "body-parser":
/*!******************************!*\
  !*** external "body-parser" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("http");

/***/ }),

/***/ "nuxt":
/*!***********************!*\
  !*** external "nuxt" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("nuxt");

/***/ }),

/***/ "qs":
/*!*********************!*\
  !*** external "qs" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("qs");

/***/ }),

/***/ "redis":
/*!************************!*\
  !*** external "redis" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("redis");

/***/ })

/******/ });
//# sourceMappingURL=main.map