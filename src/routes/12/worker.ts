/// <reference lib="webworker" />

import { burn } from '#lib/utils/burn_cpu.ts';

self.onmessage = async (ev: MessageEvent<ArrayBuffer>) => {
	const view = new Int32Array(ev.data);

	for (let i = 0; i < 100; i++) {
		const idx = Math.floor(Math.random() * 4);
		view[idx] += 1;

		self.postMessage('UPDATE');

		await burn(1000);
	}
};
