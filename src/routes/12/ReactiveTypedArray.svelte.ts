import { createSubscriber } from 'svelte/reactivity';

export class ReactiveTypedArray {
	#subscribe;
	#view;
	#update = () => {};
	#raw;
	#version;

	constructor(buffer: SharedArrayBuffer, version: { value: number }) {
		this.#version = version;
		this.#raw = new Int32Array(buffer);

		this.#subscribe = createSubscriber((update) => (this.#update = update));
		this.#view = new Proxy(this.#raw, {
			get: (target, prop) => {
				const value = Reflect.get(target, prop);
				return typeof value === 'function' ? value.bind(target) : value;
			},
			set: (target, prop, value) => {
				const index = typeof prop === 'string' ? Number(prop) : NaN;
				if (Number.isInteger(index)) {
					target[index] = value;
					this.#version.value += 1;
				}
				return true;
			}
		});

		$effect(() => {
			// eslint-disable-next-line @typescript-eslint/no-unused-expressions
			version.value;
			this.#update?.();
		});
	}

	get current() {
		this.#subscribe();
		return this.#view;
	}
}
