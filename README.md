# React Region Select

[![React Region Select on NPM](https://img.shields.io/npm/v/react-region-select.svg)](https://www.npmjs.com/package/react-region-select)

![React Region Select Demo gif](https://github.com/casavi/react-region-select/blob/master/demo.gif?raw=true)

## Usage

```jsx
var ReactRegionSelect = require('react-region-select');
// or es6:
import ReactRegionSelect from 'react-region-select';
```

```jsx
<RegionSelect
	maxRegions={5}
	regions={this.state.regions}
	onChange={this.onChange}
	regionRenderer={this.regionRenderer}>
		<img src='/static/example-doc.jpg' width='700px'/>
</RegionSelect>
```

This is "dumb component", meaning it will not track it's internal state (the regions). The outer component needs to do
that. This means implementing `onChange` and managing the `regions` (see example).

Place an image or anything else as children to draw rectangular regions above it. It supports rendering custom componentes
per region (see `regionRenderer`).

Homepage: [casavi.de](http://casavi.de/)  
Author: [David Langer](https://github.com/davidlanger)  
Contact us: <hello@casavi.de>  

## API

### Props

#### regions (array)

Array of regions. Regions are objects with the following signature:

```jsx
{
	x: Number,      // x, y, width, height are percentages, off the upper left corner
	y: Number,      // (0, 0, 50, 50) is a rectangle in the north western corner of the image
	width: Number,
	height: Number,
	data: Object    // any additional data you may need
}
```

#### maxRegions (number)

Maximum number of allowed regions. If exceeded the last one will be replaced when dragging the canvas.

#### onChange (func)

Callback used when the regions change (moving, resizing, dragging to create new one)

#### regionRenderer (func)

Optional method to allow rendering additional things into the regions. This can be useful if you need the user to select
the type of what he just cropped.

Signature: `regionRender({ data, isChanging })`

You can use isChanging to hide complex UI while the user is changing the region.

#### debug (bool)

Display a table with information about each region. Useful for debugging.

#### constraint (bool)

Constrain selection to underlying children. Default: false.

#### className (string)

Use for styling the outer layer

#### style (object)

Use for styling the outer layer

#### children (object)

Place objects inside the component and the regions will appear above them.

## Example

See [src/example/App.js](./src/example/App.js)

## Development

Start via `npm start`. Specify port via environment variable `PORT`: `env PORT=4000 npm start`. Hot loading etc works nicely.

## Based on

- For development:  [React Hot Boilerplate / Playground](https://github.com/timuric/react-prototype-playground)
- Inspiration for region selection: [React Image Crop](https://github.com/DominicTobias/react-image-crop)
