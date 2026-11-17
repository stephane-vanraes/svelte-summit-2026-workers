/// <reference lib="webworker" />

let buffer: ArrayBuffer;

self.onmessage = async (ev: MessageEvent<ArrayBuffer | 'RECALL'>) => {
	if (typeof ev.data == 'string') {
		self.postMessage(buffer);
	} else {
		buffer = ev.data;
		const view = new Int32Array(buffer);
		for (const i in view) {
			view[i] *= 10;
		}
	}
};
