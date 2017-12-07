import { css } from 'react-emotion';

const handleSize = 8;
const handlePosition = -1 * handleSize / 2;

export const region = css({
	position: 'absolute',
	border: '1px dashed rgba(0,0,0,0.5)',
	outline: '1px dashed rgba(255,255,255,0.5)',
	cursor: 'move'
});

export const regionHandleSE = css({
	position: 'absolute',
	bottom: handlePosition,
	right: handlePosition,
	width: handleSize,
	height: handleSize,
	outline: '1px solid rgba(0,0,0,0.5)',
	border: '1px solid rgba(255,255,255,0.5)',
	cursor: 'se-resize'
});

export const regionHandleSW = css({
	position: 'absolute',
	bottom: handlePosition,
	left: handlePosition,
	width: handleSize,
	height: handleSize,
	outline: '1px solid rgba(0,0,0,0.5)',
	border: '1px solid rgba(255,255,255,0.5)',
	cursor: 'sw-resize'
});

export const regionHandleNW = css({
	position: 'absolute',
	top: handlePosition,
	left: handlePosition,
	width: handleSize,
	height: handleSize,
	outline: '1px solid rgba(0,0,0,0.5)',
	border: '1px solid rgba(255,255,255,0.5)',
	cursor: 'nw-resize'
});

export const regionHandleNE = css({
	position: 'absolute',
	top: handlePosition,
	right: handlePosition,
	width: handleSize,
	height: handleSize,
	outline: '1px solid rgba(0,0,0,0.5)',
	border: '1px solid rgba(255,255,255,0.5)',
	cursor: 'ne-resize'
});

export const regionSelect = css({
	position: 'relative',
	display: 'inline-block'
});

export const container = css({
	position: 'relative',
	overflow: 'auto'
});
