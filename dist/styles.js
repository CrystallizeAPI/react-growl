"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Growl = exports.Outer = undefined;

var _styledComponents = require("styled-components");

var _styledComponents2 = _interopRequireDefault(_styledComponents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Outer = exports.Outer = _styledComponents2.default.div.withConfig({
  displayName: "styles__Outer",
  componentId: "s1i9qfvi-0"
})(["position:fixed;z-index:999;top:15px;right:15px;min-width:100px;max-width:40vw;display:flex;flex-direction:column;align-items:center;"]);

var Growl = exports.Growl = _styledComponents2.default.div.withConfig({
  displayName: "styles__Growl",
  componentId: "s1i9qfvi-1"
})(["padding:10px 20px;background:#fff;box-shadow:0 0 5px #000;cursor:pointer;color:#333;border-radius:20px;transition:transform 100ms,opacity 100ms;transform:", ";opacity:", ";&:not(:first-child){margin-top:5px;}"], function (p) {
  return p.animatedIn ? "none" : "scale(.75)";
}, function (p) {
  return p.animatedIn ? "1" : "0";
});