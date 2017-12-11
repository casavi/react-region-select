import React, { Component } from 'react';
import { PropTypes } from 'prop-types'; 
import objectAssign from 'object-assign';
import Region from './Region';
import {
	regionSelect as regionSelectStyle,
	container as containerStyle
} from './style';

class RegionSelect extends Component {
	constructor (props) {
		super(props);
		this.onComponentMouseTouchDown = this.onComponentMouseTouchDown.bind(this);
		this.onDocMouseTouchMove = this.onDocMouseTouchMove.bind(this);
		this.onDocMouseTouchEnd = this.onDocMouseTouchEnd.bind(this);
		this.onRegionMoveStart = this.onRegionMoveStart.bind(this);
		this.onImageLoad = this.onImageLoad.bind(this);
		this.regionCounter = 0;
		this.state = {};
	}
	componentDidMount() {
		document.addEventListener('mousemove', this.onDocMouseTouchMove);
		document.addEventListener('touchmove', this.onDocMouseTouchMove);

		document.addEventListener('mouseup', this.onDocMouseTouchEnd);
		document.addEventListener('touchend', this.onDocMouseTouchEnd);
		document.addEventListener('touchcancel', this.onDocMouseTouchEnd);
	}
	componentWillUnmount() {
		document.removeEventListener('mousemove', this.onDocMouseTouchMove);
		document.removeEventListener('touchmove', this.onDocMouseTouchMove);

		document.removeEventListener('mouseup', this.onDocMouseTouchEnd);
		document.removeEventListener('touchend', this.onDocMouseTouchEnd);
		document.removeEventListener('touchcancel', this.onDocMouseTouchEnd);
	}
	getClientPos(e) {
		let clientX, clientY;

		if (e.touches) {
			clientX = e.touches[0].clientX;
			clientY = e.touches[0].clientY;
		} else {
			clientX = e.clientX;
			clientY = e.clientY;
		}
		const [el] = document.getElementsByClassName('image-container');
		const { scrollLeft, scrollTop } = el;
		const { left, top } = el.getBoundingClientRect();

		return {
			x: (clientX - left + scrollLeft) / this.props.zoom,
			y: (clientY - top + scrollTop) / this.props.zoom
		};
	}
	onDocMouseTouchMove (event) {
		if (!this.isChanging) {
			return;
		}
		const index = this.regionChangeIndex;
		const updatingRegion = this.props.regions[index];
		const clientPos = this.getClientPos(event);
		const regionChangeData = this.regionChangeData;
		let x, y, width, height;

		if (!regionChangeData.isMove) {
			let x1Pc, y1Pc, x2Pc, y2Pc;
			x1Pc = regionChangeData.clientPosXStart;
			y1Pc = regionChangeData.clientPosYStart;
			x2Pc = clientPos.x;
			y2Pc = clientPos.y;
			x = Math.min(x1Pc, x2Pc);
			y = Math.min(y1Pc, y2Pc);
			width = Math.abs(x1Pc - x2Pc);
			height = Math.abs(y1Pc - y2Pc);

			if (this.props.constraint) {
				const [container] = document.getElementsByClassName('image-container');
				const { width: maxWidth, height: maxHeight } = container.getBoundingClientRect();
				x = x < 0 ? 0 : x;
				y = y < 0 ? 0 : y;

				width = x2Pc >= maxWidth ?  Math.abs(x1Pc - maxWidth) : width;
				height = y2Pc >= maxHeight ?  Math.abs(y1Pc - maxHeight) : height;
			}
		} else {
			let diffx = updatingRegion.width / 2;
			let diffy = updatingRegion.height / 2;
			x = clientPos.x - diffx;
			y = clientPos.y - diffy;

			width = updatingRegion.width;
			height = updatingRegion.height;
			if (this.props.constraint){
				const [container] = document.getElementsByClassName('image-container');
				const { width: maxWidth, height: maxHeight } = container.getBoundingClientRect();
				x = x < 0 ? 0 : x;
				y = y < 0 ? 0 : y;
				if (x + width >= maxWidth) {
					x = updatingRegion.x;
					width = maxWidth - x;
				}
				// taking in account the select box height and zoom
				if ((y + height) * this.props.zoom >= maxHeight - this.props.bottomMargin) {
					y = updatingRegion.y;
					height = updatingRegion.height;
				}
			}
		}

		const rect = {
			x: x,
			y: y,
			width: width,
			height: height,
			isChanging: true
		};

		this.props.onChange([
			...this.props.regions.slice(0, index),
			{
				...updatingRegion,
				...rect
			},
			...this.props.regions.slice(index + 1)
		]);
	}
	onDocMouseTouchEnd () {
		if (this.isChanging) {
			this.isChanging = false;
			const index = this.regionChangeIndex;
			const updatingRegion = this.props.regions[index];
			const changes = {
				new: false,
				isChanging: false
			};
			this.regionChangeIndex = null;
			this.regionChangeData = null;
			this.props.onChange([
				...this.props.regions.slice(0, index),
				objectAssign({}, updatingRegion, changes),
				...this.props.regions.slice(index + 1)
			]);
		}
	}
	onComponentMouseTouchDown (event) {
		if (event.target.dataset.wrapper || event.target.dataset.dir || isSubElement(event.target, (el) => el.dataset && el.dataset.wrapper)) {
			return;
		}
		event.preventDefault();
		const clientPos = this.getClientPos(event);
		const [container] = document.getElementsByClassName('image-container');
		const { offsetLeft, offsetTop } = container;

		this.isChanging = true;

		const rect = {
			x: clientPos.x,
			y: clientPos.y,
			width: 0,
			height: 0,
			new: true,
			data: { ...this.props.regionData, index: this.regionCounter },
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
			this.props.onChange([
				...this.props.regions.slice(0, this.props.maxRegions - 1),
				rect
			]);
			this.regionChangeIndex = this.props.maxRegions - 1;
		}
	}
	getElementOffset (el) {
		const rect = el.getBoundingClientRect();
		const docEl = document.documentElement;
		const [container] = document.getElementsByClassName('image-container');

		const rectTop = rect.top + window.pageYOffset + container.offsetTop - docEl.clientTop;
		const rectLeft = rect.left + window.pageXOffset + container.offsetLeft - docEl.clientLeft;
		return {
			top: rectTop / this.props.zoom,
			left: rectLeft / this.props.zoom
		};
	}
	onRegionMoveStart (event, index) {
		if (!event.target.dataset.wrapper && !event.target.dataset.dir) {
			return;
		}
		event.preventDefault();

		const clientPos = this.getClientPos(event);
		const imageOffset = this.getElementOffset(this.refs.image);

		let clientPosXStart, clientPosYStart;
		const currentRegion = this.props.regions[index];
		const regionLeft = currentRegion.x;
		const regionTop = currentRegion.y;
		const regionWidth = currentRegion.width;
		const regionHeight = currentRegion.height;
		const clientPosDiffX = regionLeft - clientPos.x;
		const clientPosDiffY = regionTop - clientPos.y;

		const resizeDir = event.target.dataset.dir;

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
	renderRect (rect, index) {
		return <Region
			x={rect.x}
			y={rect.y}
			width={rect.width}
			height={rect.height}
			handles={!rect.new}
			data={rect.data}
			key={index}
			index={index}
			zoom={this.props.zoom}
			dataRenderer={this.props.regionRenderer}
			onCropStart={(event) => this.onRegionMoveStart(event, index)}
			changing={index === this.regionChangeIndex}
		/>;
	}
	renderDebug () {
		if (this.props.debug) {
			return (
				<table style={{position:'absolute', right: 0, top: 0}}>
					<tbody>
						{this.props.regions.map((rect, index) => {
							return (
								<tr key={index}>
									<td>x: {Math.round(rect.x, 1)}</td>
									<td>y: {Math.round(rect.y, 1)}</td>
									<td>width: {Math.round(rect.width, 1)}</td>
									<td>height: {Math.round(rect.height, 1)}</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			);
		}
	
		return null;
	}
	onImageLoad({ target:img }, key) {
		const { imageDimensions } = this.state;
		this.setState({
			imageDimensions: {
				...imageDimensions,
				[key]: {
					height: img.offsetHeight / this.props.zoom,
					width: img.offsetWidth / this.props.zoom
				}
			}
		});
	}

	renderChildren () {
		const getImageStyle = (key) => {
			let imageStyle = {};
			if (this.state && this.state.imageDimensions && this.state.imageDimensions[key]) {
				imageStyle = {
					width: this.state.imageDimensions[key].width * this.props.zoom,
					height: this.state.imageDimensions[key].height * this.props.zoom
				};
			}

			return imageStyle;
		};

		return React.Children.map(this.props.children, (({ props: { src } }, key) => 
			<img key={key} src={src} style={(getImageStyle.bind(this, key)())} onLoad={(e) => this.onImageLoad(e, key)} />
		));
	}

	render () {
		const regions = this.props.regions;

		return (
			<div
				ref='image'
				style={objectAssign({}, this.props.style)}
				className={`${regionSelectStyle} region-select ${this.props.className || ''}`}>
				<div className={`${containerStyle} container-style image-container`}
					onTouchStart={this.onComponentMouseTouchDown}
					onMouseDown={this.onComponentMouseTouchDown}>
					{this.renderDebug()}
					{regions.map(this.renderRect.bind(this))}
					{this.renderChildren()}
				</div>
			</div>
		);
	}
}
RegionSelect.propTypes = {
	constraint: PropTypes.bool,
	regions: PropTypes.array,
	children: PropTypes.any,
	onChange: PropTypes.func.isRequired,
	regionRenderer: PropTypes.func,
	maxRegions: PropTypes.number,
	debug: PropTypes.bool,
	className: PropTypes.string,
	style: PropTypes.object,
	zoom: PropTypes.number,
	regionData: PropTypes.object,
	bottomMargin: PropTypes.number
};
RegionSelect.defaultProps = {
	maxRegions: Infinity,
	debug: false,
	regions: [],
	constraint: false,
	bottomMargin: 20
};

function isSubElement (el, check) {
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
