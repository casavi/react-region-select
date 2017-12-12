import React, { Component } from 'react';
import { PropTypes } from 'prop-types'; 
import objectAssign from 'object-assign';
import {
	region as regionStyle,
	regionHandleSE as handleSEstyle,
	regionHandleSW as handleSWstyle,
	regionHandleNW as handleNWstyle,
	regionHandleNE as handleNEstyle
} from './style';

class Region extends Component {
	renderHandles () {
		return (
			<div>
				<div data-dir='se' className={`${handleSEstyle} region-handle-se`} />
				<div data-dir='sw' className={`${handleSWstyle} region-handle-sw`} />
				<div data-dir='nw' className={`${handleNWstyle} region-handle-nw`} />
				<div data-dir='ne' className={`${handleNEstyle} region-handle-ne`} />
			</div>
		);
	}
	render () {
		const localStyle = {
			width: `${this.props.width * this.props.zoom}px`,
			height: `${this.props.height * this.props.zoom}px`,
			left: `${this.props.x * this.props.zoom}px`,
			top: `${this.props.y * this.props.zoom}px`
		};
		const dataRenderArgs = {
			data: this.props.data,
			isChanging: this.props.changing,
			index: this.props.index
		};

		return (
			<div
				style={objectAssign({}, localStyle, this.props.customStyle, this.props.data.regionStyle)}
				className={`${regionStyle} region`}
				onMouseDown={this.props.onCropStart}
				onTouchStart={this.props.onCropStart}
				data-wrapper="wrapper"
			>
				{this.props.handles ? this.renderHandles() : null}
				{this.props.dataRenderer ? this.props.dataRenderer(dataRenderArgs) : null}
			</div>
		);
	}
}
Region.propTypes = {
	x: PropTypes.number.isRequired,
	y: PropTypes.number.isRequired,
	width: PropTypes.number.isRequired,
	height: PropTypes.number.isRequired,
	index: PropTypes.number.isRequired,
	onCropStart: PropTypes.func.isRequired,
	handles: PropTypes.bool,
	changing: PropTypes.bool,
	dataRenderer: PropTypes.func,
	data: PropTypes.object,
	customStyle: PropTypes.object,
	zoom: PropTypes.number
};

Region.defaultProps = {
	zoom: 1
};

module.exports = Region;
