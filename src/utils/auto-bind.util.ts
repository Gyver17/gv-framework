/* eslint-disable @typescript-eslint/ban-types */
interface IPrototype {
	[key: string]: Function;
}

const CONSTRUCTOR = 'constructor';

export function autoBind(
	instance: unknown,
	exclude?: string[],
	proto?: unknown,
): void {
	if (!proto) {
		try {
			proto = Object.getPrototypeOf(instance);
		} catch (error) {
			throw new Error(`Cannot get prototype of ${instance}`);
		}
	}
	const properties = Object.getOwnPropertyNames(proto);
	// properties.forEach((name: string) => bind(name, instance, proto));
	for (const name of properties) {
		if (exclude && exclude.find((item) => item === name)) {
			continue;
		}
		bind(name, instance, proto);
	}
}

function bind(
	name: string,
	instance: unknown,
	proto?: unknown,
): Function | undefined {
	if (!isPrototype<IPrototype>(proto)) {
		return;
	}
	if (!isPrototype<IPrototype>(instance)) {
		return;
	}
	if (name === CONSTRUCTOR) {
		return;
	}
	const descriptor = Object.getOwnPropertyDescriptor(proto, name);
	if (!descriptor) {
		return;
	}
	if (descriptor.get || descriptor.set) {
		Object.defineProperty(proto, name, {
			...descriptor,
			get: descriptor.get ? descriptor.get.bind(instance) : void 0,
			set: descriptor.set ? descriptor.set.bind(instance) : void 0,
		});
		return;
	}
	if (isFunction(descriptor.value)) {
		instance[name] = proto[name].bind(instance);
	}
}

function isFunction(item: unknown): item is Function {
	return typeof item === 'function';
}

function isPrototype<T extends object>(value: unknown): value is T {
	return typeof value === 'object';
}
