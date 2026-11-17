/// <reference lib="webworker" />

import { CELLS, COLS, ROWS } from './props';
import { ReactiveTypedArray } from './ReactiveTypedArray';

const GAP = 1; // px between squares; set 0 for seamless

let data: ReactiveTypedArray;

function start(canvas: OffscreenCanvas, dpr: number, h: number, w: number) {
	const ctx = canvas.getContext('2d')!;

	if (canvas.width !== w * dpr || canvas.height !== h * dpr) {
		canvas.width = w * dpr;
		canvas.height = h * dpr;
	}

	const cw = w / COLS;
	const ch = h / ROWS;
	const n = Math.min(data.current.length, CELLS);

	const draw = () => {
		if (!canvas) return;
		ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
		ctx.clearRect(0, 0, w, h);

		for (let i = 0; i < n; i++) {
			const col = i % COLS;
			const row = (i / COLS) | 0;

			// floor edges so cells tile without sub-pixel seams
			const x0 = Math.floor(col * cw);
			const x1 = Math.floor((col + 1) * cw);
			const y0 = Math.floor(row * ch);
			const y1 = Math.floor((row + 1) * ch);

			const t = Math.max(0, Math.min(1, data.current[i] / 100)); // 0..1
			const l = 8 + t * 52; // lightness 8%..60%: dim floor, bright peak
			ctx.fillStyle = `hsl(325 70% ${l}%)`;
			ctx.fillRect(x0 + GAP, y0 + GAP, x1 - x0 - GAP, y1 - y0 - GAP);
		}

		requestAnimationFrame(draw);
	};
	requestAnimationFrame(draw);
}

self.onmessage = (
	ev: MessageEvent<{
		buffer: SharedArrayBuffer;
		version_buffer: SharedArrayBuffer;
		canvas_data: {
			canvas: OffscreenCanvas;
			dpr: number;
			h: number;
			w: number;
		};
	}>
) => {
	data = new ReactiveTypedArray(ev.data.buffer, ev.data.version_buffer);
	start(
		ev.data.canvas_data.canvas,
		ev.data.canvas_data.dpr,
		ev.data.canvas_data.h,
		ev.data.canvas_data.w
	);
};
