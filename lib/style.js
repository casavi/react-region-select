'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.container = exports.regionSelect = exports.regionHandleNE = exports.regionHandleNW = exports.regionHandleSW = exports.regionHandleSE = exports.region = undefined;

var _reactEmotion = require('react-emotion');

var handleSize = 8;
var handlePosition = -1 * handleSize / 2;

var region = /*#__PURE__*/exports.region = (0, _reactEmotion.css)({
	position: 'absolute',
	border: '1px dashed rgba(0,0,0,0.5)',
	outline: '1px dashed rgba(255,255,255,0.5)',
	cursor: 'move'
});

var regionHandleSE = /*#__PURE__*/exports.regionHandleSE = (0, _reactEmotion.css)({
	position: 'absolute',
	bottom: handlePosition,
	right: handlePosition,
	width: handleSize,
	height: handleSize,
	outline: '1px solid rgba(0,0,0,0.5)',
	border: '1px solid rgba(255,255,255,0.5)',
	cursor: 'se-resize'
});

var regionHandleSW = /*#__PURE__*/exports.regionHandleSW = (0, _reactEmotion.css)({
	position: 'absolute',
	bottom: handlePosition,
	left: handlePosition,
	width: handleSize,
	height: handleSize,
	outline: '1px solid rgba(0,0,0,0.5)',
	border: '1px solid rgba(255,255,255,0.5)',
	cursor: 'sw-resize'
});

var regionHandleNW = /*#__PURE__*/exports.regionHandleNW = (0, _reactEmotion.css)({
	position: 'absolute',
	top: handlePosition,
	left: handlePosition,
	width: handleSize,
	height: handleSize,
	outline: '1px solid rgba(0,0,0,0.5)',
	border: '1px solid rgba(255,255,255,0.5)',
	cursor: 'nw-resize'
});

var regionHandleNE = /*#__PURE__*/exports.regionHandleNE = (0, _reactEmotion.css)({
	position: 'absolute',
	top: handlePosition,
	right: handlePosition,
	width: handleSize,
	height: handleSize,
	outline: '1px solid rgba(0,0,0,0.5)',
	border: '1px solid rgba(255,255,255,0.5)',
	cursor: 'ne-resize'
});

var regionSelect = /*#__PURE__*/exports.regionSelect = (0, _reactEmotion.css)({
	position: 'relative',
	display: 'inline-block'
});

var container = /*#__PURE__*/exports.container = (0, _reactEmotion.css)({
	position: 'relative',
	overflow: 'auto'
});