"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GrowlScene = GrowlScene;
exports["default"] = CrystallizeGrowl;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireWildcard(require("react"));

var _mitt = _interopRequireDefault(require("mitt"));

var _framerMotion = require("framer-motion");

var _styles = require("./styles");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var emitter = (0, _mitt["default"])();

var getKey = function () {
  var index = 0;
  return function () {
    return index++;
  };
}();

function GrowlScene(_ref) {
  var growlComponent = _ref.growlComponent,
      defaultTimeout = _ref.defaultTimeout,
      props = (0, _objectWithoutProperties2["default"])(_ref, ["growlComponent", "defaultTimeout"]);

  var _useState = (0, _react.useState)([]),
      _useState2 = (0, _slicedToArray2["default"])(_useState, 2),
      items = _useState2[0],
      setItems = _useState2[1]; // Listen for emitter events


  (0, _react.useEffect)(function () {
    emitter.on('add', addGrowl);
    emitter.on('remove', removeGrowl);
    return function () {
      emitter.off('add', addGrowl);
      emitter.off('remove', removeGrowl);
    };
  }); // Remove old growls

  (0, _react.useEffect)(function () {
    function check() {
      var now = Date.now();
      var itemsToKeep = items.filter(function (item) {
        if ('removeAt' in item && item.removeAt <= now) {
          return false;
        }

        return true;
      });

      if (itemsToKeep.length < items.length) {
        setItems(itemsToKeep);
      }
    }

    var interval = setInterval(check, 50);
    return function () {
      return clearInterval(interval);
    };
  }, [items]);

  function removeGrowl(key) {
    var index = items.findIndex(function (i) {
      return i.key === key;
    });

    if (index !== -1) {
      setItems([].concat((0, _toConsumableArray2["default"])(items.slice(0, index)), (0, _toConsumableArray2["default"])(items.slice(index + 1))));
    }
  }

  function addGrowl(_ref2) {
    var callback = _ref2.callback,
        rest = (0, _objectWithoutProperties2["default"])(_ref2, ["callback"]);
    var defaultOptions = {
      timeout: defaultTimeout || 7000,
      key: getKey(),
      type: 'info',
      sticky: false
    };
    var growl = Object.assign({}, defaultOptions, rest);

    if (!growl.sticky) {
      growl.removeAt = Date.now() + growl.timeout;
    }

    setItems([growl].concat((0, _toConsumableArray2["default"])(items)));

    growl.hide = function () {
      return emitter.emit('remove', growl.key);
    };

    growl.update = function (props) {
      setItems(function (items) {
        var newItems = (0, _toConsumableArray2["default"])(items);
        var item = newItems.find(function (i) {
          return i.key === growl.key;
        });

        if (item) {
          Object.assign(item, props);

          if (!item.sticky) {
            item.removeAt = Date.now() + item.timeout;
          }

          return newItems;
        }

        return items;
      });
    };

    if (callback) {
      callback(growl);
    }

    return growl;
  }

  var Cmp = growlComponent || _styles.Growl;
  return /*#__PURE__*/_react["default"].createElement(_styles.Outer, props, /*#__PURE__*/_react["default"].createElement(_framerMotion.AnimatePresence, {
    initial: false
  }, items.map(function (item) {
    return /*#__PURE__*/_react["default"].createElement(_framerMotion.motion.li, {
      key: item.key,
      positionTransition: true,
      initial: {
        opacity: 0,
        y: 50,
        scale: 0.3
      },
      animate: {
        opacity: 1,
        y: 0,
        scale: 1
      },
      exit: {
        opacity: 0,
        scale: 0.5,
        transition: {
          duration: 0.2
        }
      }
    }, /*#__PURE__*/_react["default"].createElement(Cmp, (0, _extends2["default"])({
      remove: function remove() {
        return !item.sticky && removeGrowl(item.key);
      }
    }, item)));
  })));
}

function CrystallizeGrowl(opt) {
  return new Promise(function (resolve) {
    var options = opt;

    if (typeof opt === 'string') {
      options = {
        title: opt
      };
    }

    emitter.emit('add', _objectSpread({
      callback: resolve
    }, options));
  });
}