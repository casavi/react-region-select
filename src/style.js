const handleSize = 8;
const style = {
	ContainerStyle: {
		position: 'relative',
		overflow: 'auto'
	},
	Region: {
		position: 'absolute',
		border: '1px dashed rgba(0,0,0,0.5)',
		outline: '1px dashed rgba(255,255,255,0.5)',
		cursor: 'move',
		zIndex: '2'
	},
	RegionHandleSE: {
		position: 'absolute',
		bottom: -1 * handleSize/2,
		right: -1 * handleSize/2,
		width: handleSize,
		height: handleSize,
		outline: '1px solid rgba(0,0,0,0.5)',
		border: '1px solid rgba(255,255,255,0.5)',
		cursor: 'se-resize'
	},
	RegionHandleSW: {
		position: 'absolute',
		bottom: -1 * handleSize/2,
		left: -1 * handleSize/2,
		width: handleSize,
		height: handleSize,
		outline: '1px solid rgba(0,0,0,0.5)',
		border: '1px solid rgba(255,255,255,0.5)',
		cursor: 'sw-resize'
	},
	RegionHandleNW: {
		position: 'absolute',
		top: -1 * handleSize/2,
		left: -1 * handleSize/2,
		width: handleSize,
		height: handleSize,
		outline: '1px solid rgba(0,0,0,0.5)',
		border: '1px solid rgba(255,255,255,0.5)',
		cursor: 'nw-resize'
	},
	RegionHandleNE: {
		position: 'absolute',
		top: -1 * handleSize/2,
		right: -1 * handleSize/2,
		width: handleSize,
		height: handleSize,
		outline: '1px solid rgba(0,0,0,0.5)',
		border: '1px solid rgba(255,255,255,0.5)',
		cursor: 'ne-resize'
	},
	RegionSelect: {
		display: 'inline-block',
		overflow: 'hidden'
	}
};

module.exports = style;
