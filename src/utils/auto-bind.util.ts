/* eslint-disable @typescript-eslint/ban-types */

/**
 * Interface representing the prototype of an object.
 */
interface IPrototype {
	[key: string]: Function;
}

/**
 * Name of the constructor property.
 */
const CONSTRUCTOR = 'constructor';

/**
 * Automatically binds the methods of an object to the instance of the object.
 *
 * @param instance The instance of the object to bind.
 * @param exclude An array of method names to exclude from binding.
 * @param proto The prototype of the object to bind.
 */
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

/**
 * Binds a method to the instance of the object.
 *
 * @param name The name of the method to bind.
 * @param instance The instance of the object to bind.
 * @param proto The prototype of the object to bind.
 * @returns The bound function or undefined if no function was bound.
 */
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

/**
 * Checks if an object is a function.
 *
 * @param item The object to check.
 * @returns true if the object is a function, false otherwise.
 */
function isFunction(item: unknown): item is Function {
	return typeof item === 'function';
}

/**
 * Checks if an object is a prototype.
 *
 * @param value The object to check.
 * @returns true if the object is a prototype, false otherwise.
 */
function isPrototype<T extends object>(value: unknown): value is T {
	return typeof value === 'object';
}
