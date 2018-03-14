'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GrowlComponent = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _eventEmitter = require('event-emitter');

var _eventEmitter2 = _interopRequireDefault(_eventEmitter);

var _styles = require('./styles');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var emitter = new _eventEmitter2.default();

var GrowlComponent = exports.GrowlComponent = function (_React$Component) {
  _inherits(GrowlComponent, _React$Component);

  function GrowlComponent(props) {
    _classCallCheck(this, GrowlComponent);

    var _this = _possibleConstructorReturn(this, (GrowlComponent.__proto__ || Object.getPrototypeOf(GrowlComponent)).call(this, props));

    _this.state = { items: [] };
    _this.key = 0;

    _this.getKey = _this.getKey.bind(_this);
    _this.addGrowl = _this.addGrowl.bind(_this);
    _this.animateInGrowl = _this.animateInGrowl.bind(_this);
    _this.removeGrowl = _this.removeGrowl.bind(_this);
    return _this;
  }

  _createClass(GrowlComponent, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      emitter.on('add', this.addGrowl);
      emitter.on('remove', this.removeGrowl);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      emitter.off('add', this.addGrowl);
      emitter.off('remove', this.removeGrowl);
    }
  }, {
    key: 'getKey',
    value: function getKey() {
      return 'item-' + this.key++;
    }
  }, {
    key: 'addGrowl',
    value: function addGrowl(_growl) {
      var _this2 = this;

      var defaultOptions = {
        timeout: 7000,
        key: this.getKey(),
        animatedIn: false
      };

      var growl = void 0;
      if (typeof _growl === 'string') {
        growl = {
          message: _growl
        };
      } else {
        growl = _growl;
      }

      growl = Object.assign({}, defaultOptions, growl);

      growl.hideTimeout = setTimeout(function () {
        _this2.removeGrowl(growl.key);
      }, growl.timeout);

      growl.animateInTimeout = setTimeout(function () {
        _this2.animateInGrowl(growl.key);
      }, 5);

      growl.timeoutDate = new Date(+new Date() + growl.timeout);

      this.setState({
        items: [].concat(_toConsumableArray(this.state.items), [growl])
      });

      growl.hide = function () {
        return _this2.removeGrowl(growl.key);
      };

      return growl;
    }
  }, {
    key: 'animateInGrowl',
    value: function animateInGrowl(key) {
      this.setState(function (state) {
        var items = [].concat(_toConsumableArray(state.items));
        var item = items.find(function (i) {
          return i.key === key;
        });
        item.animatedIn = true;

        return {
          items: items
        };
      });
    }
  }, {
    key: 'removeGrowl',
    value: function removeGrowl(key) {
      var _this3 = this;

      var item = this.state.items.find(function (i) {
        return i.key === key;
      });
      item.animatedIn = false;
      clearTimeout(item.hideTimeout);
      clearTimeout(item.animateInTimeout);

      this.setState({
        items: [].concat(_toConsumableArray(this.state.items))
      }, function () {
        setTimeout(function () {
          _this3.setState(function (state) {
            var index = state.items.findIndex(function (i) {
              return i.key === key;
            });
            return {
              items: [].concat(_toConsumableArray(state.items.slice(0, index)), _toConsumableArray(state.items.slice(index + 1)))
            };
          });
        }, 100);
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this4 = this;

      var items = this.state.items;

      // if (!items.length) {
      //   return null;
      // }

      return _react2.default.createElement(
        _styles.Outer,
        null,
        'Testing...',
        items.map(function (item) {
          return _react2.default.createElement(
            _styles.Growl,
            {
              key: item.key,
              onClick: function onClick() {
                return _this4.removeGrowl(item.key);
              },
              animatedIn: item.animatedIn
            },
            item.message
          );
        })
      );
    }
  }]);

  return GrowlComponent;
}(_react2.default.Component);

exports.default = function (opt) {
  return emitter.emit('add', opt);
};