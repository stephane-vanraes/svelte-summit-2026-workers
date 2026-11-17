import { createSubscriber } from 'svelte/reactivity';

export class ReactiveTypedArray {
	#version;
	#subscribe;
	#update;
	#raw;
	#view;

	constructor(buffer: SharedArrayBuffer, version_buffer: SharedArrayBuffer) {
		this.#raw = new Int32Array(buffer);
		this.#version = new Int32Array(version_buffer);
		this.#subscribe = createSubscriber((update) => {
			this.#update = update;
			this.#listen();
		});

		this.#view = new Proxy(this.#raw, {
			get: (target, prop) => {
				const value = Reflect.get(target, prop);
				return typeof value === 'function' ? value.bind(target) : value;
			},
			set: (target, prop, value) => {
				const index = Number(prop);
				target[index] = value;
				Atomics.add(this.#version, 0, 1);
				Atomics.notify(this.#version, 0);
				return true;
			}
		});
	}

	async #listen() {
		while (true) {
			const seen = Atomics.load(this.#version, 0);
			const r = Atomics.waitAsync(this.#version, 0, seen);
			if (r.async) await r.value;
			this.#update();
		}
	}

	get current() {
		this.#subscribe();
		return this.#view;
	}
}
