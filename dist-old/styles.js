"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Growl = Growl;
exports.Outer = void 0;

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _iconInfo = _interopRequireDefault(require("./icon-info"));

var _iconWarning = _interopRequireDefault(require("./icon-warning"));

var _iconError = _interopRequireDefault(require("./icon-error"));

var _iconX = _interopRequireDefault(require("./icon-x"));

function _templateObject5() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  appearance: none;\n  border: none;\n  background: transparent;\n  padding: 10px;\n  cursor: pointer;\n  position: absolute;\n  top: 0;\n  right: 0;\n"]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  display: block;\n  font-size: 16px;\n"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  margin-top: 5px;\n  font-size: 14px;\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  cursor: default;\n  border-radius: 8px;\n  padding: 20px 30px 20px 20px;\n  position: relative;\n  display: inline-flex;\n  align-items: flex-start;\n  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);\n  margin: 5px;\n  max-width: 50vw;\n\n  /* Defaults to info */\n  background: #c2e5e1;\n  color: #6c7d7b;\n\n  &.crystallize-growl__item-error {\n    background: #facbcf;\n    color: #967376;\n  }\n\n  &.crystallize-growl__item-warning {\n    background: #fdf5bf;\n    color: #9a946e;\n  }\n\n  ::selection {\n    background: transparent;\n  }\n\n  > svg {\n    display: inline-block;\n    margin-right: 20px;\n    width: 40px;\n    flex: 0 0 40px;\n  }\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  position: fixed;\n  bottom: 0;\n  right: 0;\n  top: 0;\n  left: 0;\n  display: flex;\n  flex-direction: column;\n  justify-content: flex-end;\n  align-items: flex-end;\n  list-style: none;\n  padding: 5px;\n  margin: 0;\n  pointer-events: none;\n\n  > li {\n    display: block;\n    margin: 5px;\n    padding: 0;\n    pointer-events: initial;\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

var Outer = _styledComponents["default"].ul.attrs(function () {
  return {
    className: 'crystallize-growl',
    role: 'alert',
    'aria-live': 'assertive'
  };
})(_templateObject());

exports.Outer = Outer;

var GrowlComponent = _styledComponents["default"].div.attrs(function (_ref) {
  var type = _ref.type;
  return {
    className: "crystallize-growl__item crystallize-growl__item-".concat(type || 'info')
  };
})(_templateObject2());

var Text = _styledComponents["default"].div.attrs(function () {
  return {
    className: 'crystallize-growl__item-text'
  };
})(_templateObject3());

var Title = _styledComponents["default"].strong.attrs(function () {
  return {
    className: 'crystallize-growl__item-title'
  };
})(_templateObject4());

var RemoveButton = _styledComponents["default"].button.attrs(function () {
  return {
    className: 'crystallize-growl__item-remove'
  };
})(_templateObject5());

var icons = {
  info: _iconInfo["default"],
  warning: _iconWarning["default"],
  error: _iconError["default"]
};

function Growl(_ref2) {
  var title = _ref2.title,
      message = _ref2.message,
      remove = _ref2.remove,
      type = _ref2.type,
      sticky = _ref2.sticky;
  var Icon = icons[type] || icons.info;
  return /*#__PURE__*/_react["default"].createElement(GrowlComponent, {
    type: type
  }, /*#__PURE__*/_react["default"].createElement(Icon, null), /*#__PURE__*/_react["default"].createElement(Text, null, title && /*#__PURE__*/_react["default"].createElement(Title, null, title), message), !sticky && /*#__PURE__*/_react["default"].createElement(RemoveButton, {
    type: "button",
    "aria-label": "Close",
    onClick: remove
  }, /*#__PURE__*/_react["default"].createElement(_iconX["default"], null)));
}