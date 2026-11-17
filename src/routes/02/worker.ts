/// <reference lib="webworker" />

import { burn } from '#lib/utils/burn_cpu';

self.onmessage = async () => {
	await burn(5000);
	self.postMessage('DONE');
};
