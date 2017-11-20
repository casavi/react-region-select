import React, { Component } from 'react';
import objectAssign from 'object-assign';
import RegionSelect from '../RegionSelect';

require('../style.scss');

class App extends Component {
	constructor (props) {
		super(props);
		this.regionRenderer = this.regionRenderer.bind(this);
		this.onChange = this.onChange.bind(this);
		this.onChangeZoom = this.onChangeZoom.bind(this);
		this.state = {
			regions: [],
			zoom: 1
		};
	}
	onChange (regions) {
		this.setState({
			regions: regions
		});
	}
	changeRegionData (index, event) {
		const region = this.state.regions[index];
		let color;
		switch (event.target.value) {
		case '1':
			color = 'rgba(0, 255, 0, 0.5)';
			break;
		case '2':
			color = 'rgba(0, 0, 255, 0.5)';
			break;
		case '3':
			color = 'rgba(255, 0, 0, 0.5)';
			break;
		default:
			color = 'rgba(0, 0, 0, 0.5)';
		}

		region.data.regionStyle = {
			background: color
		};
		this.onChange([
			...this.state.regions.slice(0, index),
			objectAssign({}, region, {
				data: objectAssign({}, region.data, { dataType: event.target.value })
			}),
			...this.state.regions.slice(index + 1)
		]);
	}
	regionRenderer (regionProps) {
		if (!regionProps.isChanging) {
			return (
				<div style={{ position: 'absolute', right: 0, bottom: '-1.5em' }}>
					<select onChange={(event) => this.changeRegionData(regionProps.index, event)} value={regionProps.data.dataType}>
						<option value='1'>Green</option>
						<option value='2'>Blue</option>
						<option value='3'>Red</option>
					</select>
				</div>
			);
		}
	}
	onChangeZoom({ target: { value }}) {
		this.setState({
			zoom: parseInt(value)
		});
	}
	render() {
		const regionStyle = {
			background: 'rgba(255, 0, 0, 0.5)'
		};

		const defaultRegionData = {
			regionStyle,
			dataType: '3'
		};
		let { zoom } = this.state;

		return (
			<div>
				<input type="range" min="1" max="5" value={zoom} onChange={this.onChangeZoom} />
				<RegionSelect maxRegions={3} zoom={zoom} regionData={defaultRegionData} regions={this.state.regions} onChange={this.onChange} regionRenderer={this.regionRenderer}>
					<img src='/static/example-doc.jpg' width='700px'/>
				</RegionSelect>
			</div>
		);
	}
}

module.exports = App;
