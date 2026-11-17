/// <reference lib="webworker" />

import { burn } from '#lib/utils/burn_cpu.ts';

self.onmessage = async (ev) => {
	await burn(2000);
	self.postMessage({ value: ev.data.value.toUpperCase() });
};
