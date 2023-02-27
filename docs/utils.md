# Utils

---

```tsx
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
```

El bloque de código es una función TypeScript llamada `autoBind` que se utiliza para vincular automáticamente los métodos de un objeto a la instancia del objeto. Acepta tres parámetros: `instance`, que es la instancia del objeto que se va a vincular, `exclude`, que es una matriz de nombres de métodos que se deben excluir de la vinculación, y `proto`, que es el prototipo del objeto que se va a vincular.

La función `autoBind` itera a través de los nombres de propiedad del objeto `proto`, llamando a la función `bind` para vincular cada método a la instancia del objeto. La función `bind` comprueba si el nombre de la propiedad es el constructor, si está excluido o si es un descriptor de propiedad que no es un método. Si el descriptor de propiedad es un getter o un setter, se define de nuevo en el prototipo del objeto vinculando la función a la instancia del objeto. Si el descriptor de propiedad es un método, se asigna al objeto de instancia vinculando la función al objeto de instancia.

La función `autoBind` ya es bastante sólida en términos de funcionalidad, pero se podría mejorar su legibilidad y mantenibilidad con algunas modificaciones. Por ejemplo, una forma de mejorar la legibilidad sería utilizar la sintaxis de funciones flecha que evita la necesidad de usar `bind`. En lugar de eso, se debería usar el contexto léxico de la función para vincular `this`. Además, una forma de mejorar la mantenibilidad sería agregar más comentarios explicando el propósito de cada parte de la función, lo que facilitaría la comprensión del código a futuros desarrolladores.

```tsx
/* eslint-disable @typescript-eslint/ban-types */

/**
 * Interfaz que representa el prototipo de un objeto.
 */
interface IPrototype {
	[key: string]: Function;
}

/**
 * Nombre de la propiedad constructor.
 */
const CONSTRUCTOR = 'constructor';

/**
 * Vincula automáticamente los métodos de un objeto a la instancia del objeto.
 *
 * @param instance La instancia del objeto que se va a vincular.
 * @param exclude Una matriz de nombres de métodos que se deben excluir de la vinculación.
 * @param proto El prototipo del objeto que se va a vincular.
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
	for (const name of properties) {
		if (exclude && exclude.find((item) => item === name)) {
			continue;
		}
		bind(name, instance, proto);
	}
}

/**
 * Vincula un método a la instancia del objeto.
 *
 * @param name El nombre del método que se va a vincular.
 * @param instance La instancia del objeto que se va a vincular.
 * @param proto El prototipo del objeto que se va a vincular.
 * @returns La función vinculada o undefined si no se vinculó ninguna función.
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
 * Comprueba si un objeto es una función.
 *
 * @param item El objeto que se va a comprobar.
 * @returns true si el objeto es una función, false en caso contrario.
 */
function isFunction(item: unknown): item is Function {
	return typeof item === 'function';
}

/**
 * Comprueba si un objeto es un prototipo.
 *
 * @param value El objeto que se va a comprobar.
 * @returns true si el objeto es un prototipo, false en caso contrario.
 */
function isPrototype<T extends object>(value: unknown): value is T {
	return typeof value === 'object';
}

```

```tsx
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

```