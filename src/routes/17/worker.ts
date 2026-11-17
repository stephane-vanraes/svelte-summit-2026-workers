/// <reference lib="webworker" />

import { burn } from '#lib/utils/burn_cpu.ts';
import { ReactiveTypedArray } from './ReactiveTypedArray';

let data: ReactiveTypedArray;

async function start() {
	const cells = data.current;
	const n = cells.length;

	const vel = new Int8Array(n);
	for (let i = 0; i < n; i++) vel[i] = 1 + ((Math.random() * 3) | 0);

	const BATCH = Math.max(1, n >> 3);

	while (true) {
		for (let k = 0; k < BATCH; k++) {
			const i = (Math.random() * n) | 0;
			let v = cells[i] + vel[i];
			if (v >= 100) {
				v = 100;
				vel[i] = -vel[i];
			} else if (v <= 0) {
				v = 0;
				vel[i] = -vel[i];
			}
			cells[i] = v;
		}
		await burn(33);
	}
}

self.onmessage = (
	ev: MessageEvent<{ buffer: SharedArrayBuffer; version_buffer: SharedArrayBuffer }>
) => {
	data = new ReactiveTypedArray(ev.data.buffer, ev.data.version_buffer);

	start();
};
