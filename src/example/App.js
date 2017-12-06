import React, { Component } from 'react';
import objectAssign from 'object-assign';
import RegionSelect from '../RegionSelect';

require('./style.css');

class App extends Component {
	constructor (props) {
		super(props);
		this.regionRenderer = this.regionRenderer.bind(this);
		this.onChange = this.onChange.bind(this);
		this.state = {
			regions: []
		};
	}
	onChange (regions) {
		this.setState({
			regions: regions
		});
	}
	changeRegionData (index, event) {
		const region = this.state.regions[index];
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
						<option value='1'>Contact ID</option>
						<option value='2'>Contract number</option>
						<option value='3'>Name</option>
					</select>
				</div>
			);
		}
	}
	render() {
		return (
			<div>
				<RegionSelect maxRegions={1} regions={this.state.regions} onChange={this.onChange} regionRenderer={this.regionRenderer}>
					<img src='/static/example-doc.jpg' width='700px'/>
				</RegionSelect>
			</div>
		);
	}
}

module.exports = App;
