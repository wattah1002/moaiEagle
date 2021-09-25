"use strict";
(() => {
var exports = {};
exports.id = 888;
exports.ids = [888];
exports.modules = {

/***/ 430:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ _app)
});

// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(297);
var external_react_default = /*#__PURE__*/__webpack_require__.n(external_react_);
;// CONCATENATED MODULE: external "@material-ui/core"
const core_namespaceObject = require("@material-ui/core");
// EXTERNAL MODULE: ./node_modules/@material-ui/core/esm/styles/createTheme.js + 19 modules
var createTheme = __webpack_require__(121);
;// CONCATENATED MODULE: ./services/theme.ts
 // const prefersDarkMode = useMediaQuery('(prefers-color-scheme: light)'); // userがダークモードを使用しているかどうかをチェック
// const theme = React.useMemo(
//   () =>

const theme = (0,createTheme/* default */.Z)({
  palette: {
    // メインページの配色設定
    // type: prefersDarkMode ? 'dark' : 'light', // userがダークモードを使用しているかどうかでモードを切り替える
    // type: "dark", // userがダークモードを使用しているかどうかでモードを切り替える
    primary: {
      light: "#757ce8",
      main: "#ffffff",
      // テーマmainカラー
      dark: "#002884",
      contrastText: "#fff444"
    },
    secondary: {
      light: "#ff7961",
      main: "#ff1111",
      dark: "#ba000d",
      contrastText: "#000"
    },
    background: {
      default: "#f0ffe4"
    }
  }
}); // [prefersDarkMode],
// );

/* harmony default export */ const services_theme = (theme);
// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(282);
;// CONCATENATED MODULE: ./pages/_app.tsx
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }








const MyApp = ({
  Component,
  pageProps
}) => {
  external_react_default().useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side");

    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);
  return (
    /*#__PURE__*/
    // テーマ設定
    (0,jsx_runtime_.jsxs)(core_namespaceObject.ThemeProvider, {
      theme: services_theme,
      children: [/*#__PURE__*/jsx_runtime_.jsx(core_namespaceObject.CssBaseline, {}), /*#__PURE__*/jsx_runtime_.jsx(Component, _objectSpread({}, pageProps))]
    })
  );
};

/* harmony default export */ const _app = (MyApp);

/***/ }),

/***/ 137:
/***/ ((module) => {

module.exports = require("@material-ui/system");

/***/ }),

/***/ 958:
/***/ ((module) => {

module.exports = require("@material-ui/utils");

/***/ }),

/***/ 297:
/***/ ((module) => {

module.exports = require("react");

/***/ }),

/***/ 282:
/***/ ((module) => {

module.exports = require("react/jsx-runtime");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [121], () => (__webpack_exec__(430)));
module.exports = __webpack_exports__;

})();