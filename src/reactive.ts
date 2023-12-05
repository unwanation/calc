class Reactive {
	private _value: any
	private _element: HTMLElement

	constructor(value: any, element: HTMLElement) {
		this._value = value
		this._element = element
	}

	get value(): any {
		return this._value
	}

	set value(v: any) {
		this._value = v
		this._element.textContent = v
	}
}

export default Reactive
