'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _objectAssign = require('object-assign');

var _objectAssign2 = _interopRequireDefault(_objectAssign);

var _Region = require('./Region');

var _Region2 = _interopRequireDefault(_Region);

var _style = require('./style');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RegionSelect = function (_Component) {
	_inherits(RegionSelect, _Component);

	function RegionSelect(props) {
		_classCallCheck(this, RegionSelect);

		var _this = _possibleConstructorReturn(this, (RegionSelect.__proto__ || Object.getPrototypeOf(RegionSelect)).call(this, props));

		_this.onComponentMouseTouchDown = _this.onComponentMouseTouchDown.bind(_this);
		_this.onDocMouseTouchMove = _this.onDocMouseTouchMove.bind(_this);
		_this.onDocMouseTouchEnd = _this.onDocMouseTouchEnd.bind(_this);
		_this.onRegionMoveStart = _this.onRegionMoveStart.bind(_this);
		_this.onImageLoad = _this.onImageLoad.bind(_this);
		_this.regionCounter = 0;
		_this.state = {};
		return _this;
	}

	_createClass(RegionSelect, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			document.addEventListener('mousemove', this.onDocMouseTouchMove);
			document.addEventListener('touchmove', this.onDocMouseTouchMove);

			document.addEventListener('mouseup', this.onDocMouseTouchEnd);
			document.addEventListener('touchend', this.onDocMouseTouchEnd);
			document.addEventListener('touchcancel', this.onDocMouseTouchEnd);
		}
	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {
			document.removeEventListener('mousemove', this.onDocMouseTouchMove);
			document.removeEventListener('touchmove', this.onDocMouseTouchMove);

			document.removeEventListener('mouseup', this.onDocMouseTouchEnd);
			document.removeEventListener('touchend', this.onDocMouseTouchEnd);
			document.removeEventListener('touchcancel', this.onDocMouseTouchEnd);
		}
	}, {
		key: 'getClientPos',
		value: function getClientPos(e) {
			var clientX = void 0,
			    clientY = void 0;

			if (e.touches) {
				clientX = e.touches[0].clientX;
				clientY = e.touches[0].clientY;
			} else {
				clientX = e.clientX;
				clientY = e.clientY;
			}

			var _document$getElements = document.getElementsByClassName('image-container'),
			    _document$getElements2 = _slicedToArray(_document$getElements, 1),
			    el = _document$getElements2[0];

			var scrollLeft = el.scrollLeft,
			    scrollTop = el.scrollTop;

			var _el$getBoundingClient = el.getBoundingClientRect(),
			    left = _el$getBoundingClient.left,
			    top = _el$getBoundingClient.top;

			return {
				x: (clientX - left + scrollLeft) / this.props.zoom,
				y: (clientY - top + scrollTop) / this.props.zoom
			};
		}
	}, {
		key: 'onDocMouseTouchMove',
		value: function onDocMouseTouchMove(event) {
			if (!this.isChanging) {
				return;
			}
			var index = this.regionChangeIndex;
			var updatingRegion = this.props.regions[index];
			var clientPos = this.getClientPos(event);
			var regionChangeData = this.regionChangeData;
			var x = void 0,
			    y = void 0,
			    width = void 0,
			    height = void 0;

			if (!regionChangeData.isMove) {
				var x1Pc = void 0,
				    y1Pc = void 0,
				    x2Pc = void 0,
				    y2Pc = void 0;
				x1Pc = regionChangeData.clientPosXStart;
				y1Pc = regionChangeData.clientPosYStart;
				x2Pc = clientPos.x;
				y2Pc = clientPos.y;
				x = Math.min(x1Pc, x2Pc);
				y = Math.min(y1Pc, y2Pc);
				width = Math.abs(x1Pc - x2Pc);
				height = Math.abs(y1Pc - y2Pc);

				if (this.props.constraint) {
					var _document$getElements3 = document.getElementsByClassName('image-container'),
					    _document$getElements4 = _slicedToArray(_document$getElements3, 1),
					    container = _document$getElements4[0];

					var _container$getBoundin = container.getBoundingClientRect(),
					    maxWidth = _container$getBoundin.width,
					    maxHeight = _container$getBoundin.height;

					x = x < 0 ? 0 : x;
					y = y < 0 ? 0 : y;

					width = x2Pc >= maxWidth ? Math.abs(x1Pc - maxWidth) : width;
					height = y2Pc >= maxHeight ? Math.abs(y1Pc - maxHeight) : height;
				}
			} else {
				var diffx = updatingRegion.width / 2;
				var diffy = updatingRegion.height / 2;
				x = clientPos.x - diffx;
				y = clientPos.y - diffy;

				width = updatingRegion.width;
				height = updatingRegion.height;
				if (this.props.constraint) {
					var _document$getElements5 = document.getElementsByClassName('image-container'),
					    _document$getElements6 = _slicedToArray(_document$getElements5, 1),
					    _container = _document$getElements6[0];

					var _container$getBoundin2 = _container.getBoundingClientRect(),
					    _maxWidth = _container$getBoundin2.width,
					    _maxHeight = _container$getBoundin2.height;

					x = x < 0 ? 0 : x;
					y = y < 0 ? 0 : y;
					if (x + width >= _maxWidth) {
						x = updatingRegion.x;
						width = _maxWidth - x;
					}
					// taking in account the select box height and zoom
					if ((y + height) * this.props.zoom >= _maxHeight - this.props.bottomMargin) {
						y = updatingRegion.y;
						height = updatingRegion.height;
					}
				}
			}

			var rect = {
				x: x,
				y: y,
				width: width,
				height: height,
				isChanging: true
			};

			this.props.onChange([].concat(_toConsumableArray(this.props.regions.slice(0, index)), [_extends({}, updatingRegion, rect)], _toConsumableArray(this.props.regions.slice(index + 1))));
		}
	}, {
		key: 'onDocMouseTouchEnd',
		value: function onDocMouseTouchEnd() {
			if (this.isChanging) {
				this.isChanging = false;
				var index = this.regionChangeIndex;
				var updatingRegion = this.props.regions[index];
				var changes = {
					new: false,
					isChanging: false
				};
				this.regionChangeIndex = null;
				this.regionChangeData = null;
				this.props.onChange([].concat(_toConsumableArray(this.props.regions.slice(0, index)), [(0, _objectAssign2.default)({}, updatingRegion, changes)], _toConsumableArray(this.props.regions.slice(index + 1))));
			}
		}
	}, {
		key: 'onComponentMouseTouchDown',
		value: function onComponentMouseTouchDown(event) {
			if (event.target.dataset.wrapper || event.target.dataset.dir || isSubElement(event.target, function (el) {
				return el.dataset && el.dataset.wrapper;
			})) {
				return;
			}
			event.preventDefault();
			var clientPos = this.getClientPos(event);

			var _document$getElements7 = document.getElementsByClassName('image-container'),
			    _document$getElements8 = _slicedToArray(_document$getElements7, 1),
			    container = _document$getElements8[0];

			var offsetLeft = container.offsetLeft,
			    offsetTop = container.offsetTop;


			this.isChanging = true;

			var rect = {
				x: clientPos.x,
				y: clientPos.y,
				width: 0,
				height: 0,
				new: true,
				data: _extends({}, this.props.regionData, { index: this.regionCounter }),
				isChanging: true
			};
			this.regionCounter += 1;
			this.regionChangeData = {
				imageOffsetLeft: offsetLeft,
				imageOffsetTop: offsetTop,
				clientPosXStart: clientPos.x,
				clientPosYStart: clientPos.y,
				imageWidth: container.offsetWidth,
				imageHeight: container.offsetHeight,
				isMove: false
			};
			if (this.props.regions.length < this.props.maxRegions) {
				this.props.onChange(this.props.regions.concat(rect));
				this.regionChangeIndex = this.props.regions.length;
			} else {
				this.props.onChange([].concat(_toConsumableArray(this.props.regions.slice(0, this.props.maxRegions - 1)), [rect]));
				this.regionChangeIndex = this.props.maxRegions - 1;
			}
		}
	}, {
		key: 'getElementOffset',
		value: function getElementOffset(el) {
			var rect = el.getBoundingClientRect();
			var docEl = document.documentElement;

			var _document$getElements9 = document.getElementsByClassName('image-container'),
			    _document$getElements10 = _slicedToArray(_document$getElements9, 1),
			    container = _document$getElements10[0];

			var rectTop = rect.top + window.pageYOffset + container.offsetTop - docEl.clientTop;
			var rectLeft = rect.left + window.pageXOffset + container.offsetLeft - docEl.clientLeft;
			return {
				top: rectTop / this.props.zoom,
				left: rectLeft / this.props.zoom
			};
		}
	}, {
		key: 'onRegionMoveStart',
		value: function onRegionMoveStart(event, index) {
			if (!event.target.dataset.wrapper && !event.target.dataset.dir) {
				return;
			}
			event.preventDefault();

			var clientPos = this.getClientPos(event);
			var imageOffset = this.getElementOffset(this.refs.image);

			var clientPosXStart = void 0,
			    clientPosYStart = void 0;
			var currentRegion = this.props.regions[index];
			var regionLeft = currentRegion.x;
			var regionTop = currentRegion.y;
			var regionWidth = currentRegion.width;
			var regionHeight = currentRegion.height;
			var clientPosDiffX = regionLeft - clientPos.x;
			var clientPosDiffY = regionTop - clientPos.y;

			var resizeDir = event.target.dataset.dir;

			if (resizeDir) {
				if (resizeDir === 'se') {
					clientPosXStart = regionLeft;
					clientPosYStart = regionTop;
				} else if (resizeDir === 'sw') {
					clientPosXStart = regionLeft + regionWidth;
					clientPosYStart = regionTop;
				} else if (resizeDir === 'nw') {
					clientPosXStart = regionLeft + regionWidth;
					clientPosYStart = regionTop + regionHeight;
				} else if (resizeDir === 'ne') {
					clientPosXStart = regionLeft;
					clientPosYStart = regionTop + regionHeight;
				}
			} else {
				clientPosXStart = clientPos.x;
				clientPosYStart = clientPos.y;
			}

			this.isChanging = true;
			this.regionChangeData = {
				imageOffsetLeft: imageOffset.left,
				imageOffsetTop: imageOffset.top,
				clientPosXStart: clientPosXStart,
				clientPosYStart: clientPosYStart,
				clientPosXOffset: clientPosDiffX,
				clientPosYOffset: clientPosDiffY,
				imageWidth: this.refs.image.offsetWidth,
				imageHeight: this.refs.image.offsetHeight,
				isMove: resizeDir ? false : true,
				resizeDir: resizeDir
			};

			this.regionChangeIndex = index;
		}
	}, {
		key: 'renderRect',
		value: function renderRect(rect, index) {
			var _this2 = this;

			return _react2.default.createElement(_Region2.default, {
				x: rect.x,
				y: rect.y,
				width: rect.width,
				height: rect.height,
				handles: !rect.new,
				data: rect.data,
				key: index,
				index: index,
				zoom: this.props.zoom,
				dataRenderer: this.props.regionRenderer,
				onCropStart: function onCropStart(event) {
					return _this2.onRegionMoveStart(event, index);
				},
				changing: index === this.regionChangeIndex
			});
		}
	}, {
		key: 'renderDebug',
		value: function renderDebug() {
			if (this.props.debug) {
				return _react2.default.createElement(
					'table',
					{ style: { position: 'absolute', right: 0, top: 0 } },
					_react2.default.createElement(
						'tbody',
						null,
						this.props.regions.map(function (rect, index) {
							return _react2.default.createElement(
								'tr',
								{ key: index },
								_react2.default.createElement(
									'td',
									null,
									'x: ',
									Math.round(rect.x, 1)
								),
								_react2.default.createElement(
									'td',
									null,
									'y: ',
									Math.round(rect.y, 1)
								),
								_react2.default.createElement(
									'td',
									null,
									'width: ',
									Math.round(rect.width, 1)
								),
								_react2.default.createElement(
									'td',
									null,
									'height: ',
									Math.round(rect.height, 1)
								)
							);
						})
					)
				);
			}

			return null;
		}
	}, {
		key: 'onImageLoad',
		value: function onImageLoad(_ref, key) {
			var img = _ref.target;
			var imageDimensions = this.state.imageDimensions;

			this.setState({
				imageDimensions: _extends({}, imageDimensions, _defineProperty({}, key, {
					height: img.offsetHeight / this.props.zoom,
					width: img.offsetWidth / this.props.zoom
				}))
			});
		}
	}, {
		key: 'renderChildren',
		value: function renderChildren() {
			var _this3 = this;

			var getImageStyle = function getImageStyle(key) {
				var imageStyle = {};
				if (_this3.state && _this3.state.imageDimensions && _this3.state.imageDimensions[key]) {
					imageStyle = {
						width: _this3.state.imageDimensions[key].width * _this3.props.zoom,
						height: _this3.state.imageDimensions[key].height * _this3.props.zoom
					};
				}

				return imageStyle;
			};

			return _react2.default.Children.map(this.props.children, function (_ref2, key) {
				var src = _ref2.props.src;
				return _react2.default.createElement('img', { key: key, src: src, style: getImageStyle.bind(_this3, key)(), onLoad: function onLoad(e) {
						return _this3.onImageLoad(e, key);
					} });
			});
		}
	}, {
		key: 'render',
		value: function render() {
			var regions = this.props.regions;

			return _react2.default.createElement(
				'div',
				{
					ref: 'image',
					style: (0, _objectAssign2.default)({}, this.props.style),
					className: _style.regionSelect + ' region-select ' + (this.props.className || '') },
				_react2.default.createElement(
					'div',
					{ className: _style.container + ' container-style image-container',
						onTouchStart: this.onComponentMouseTouchDown,
						onMouseDown: this.onComponentMouseTouchDown },
					this.renderDebug(),
					regions.map(this.renderRect.bind(this)),
					this.renderChildren()
				)
			);
		}
	}]);

	return RegionSelect;
}(_react.Component);

RegionSelect.propTypes = {
	constraint: _propTypes.PropTypes.bool,
	regions: _propTypes.PropTypes.array,
	children: _propTypes.PropTypes.any,
	onChange: _propTypes.PropTypes.func.isRequired,
	regionRenderer: _propTypes.PropTypes.func,
	maxRegions: _propTypes.PropTypes.number,
	debug: _propTypes.PropTypes.bool,
	className: _propTypes.PropTypes.string,
	style: _propTypes.PropTypes.object,
	zoom: _propTypes.PropTypes.number,
	regionData: _propTypes.PropTypes.object,
	bottomMargin: _propTypes.PropTypes.number
};
RegionSelect.defaultProps = {
	maxRegions: Infinity,
	debug: false,
	regions: [],
	constraint: false,
	bottomMargin: 20
};

function isSubElement(el, check) {
	if (el === null) {
		return false;
	} else if (check(el)) {
		return true;
	} else {
		return isSubElement(el.parentNode, check);
	}
}

// support both es6 modules and common js
module.exports = RegionSelect;
module.exports.default = RegionSelect;