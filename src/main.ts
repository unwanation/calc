import Reactive from './reactive'
import './style.css'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <div id="input" class="input"></div>

		<div id="calc" class="calc">
			<div id="clear" class="el">C</div>
			<div data-content="**" class="el">^</div>
			<div data-content="/100" class="el">%</div>
			<div id="delete" class="el"><-</div>
			<div data-content="7" class="el">7</div>
			<div data-content="8" class="el">8</div>
			<div data-content="9" class="el">9</div>
			<div data-content="/" class="el">/</div>
			<div data-content="4" class="el">4</div>
			<div data-content="5" class="el">5</div>
			<div data-content="6" class="el">6</div>
			<div data-content="*" class="el">*</div>
			<div data-content="1" class="el">1</div>
			<div data-content="2" class="el">2</div>
			<div data-content="3" class="el">3</div>
			<div data-content="-" class="el">-</div>
			<div data-content="." class="el">.</div>
			<div data-content="0" class="el">0</div>
			<div id="equal" class="el">=</div>
			<div data-content="+" class="el">+</div>
		</div>
  </div>
`

interface Expression {
	op: string[]
	value: Reactive

	add(v: string | Number | null | undefined): void
	pop(): void
	clear(): void
	calc(): Number
	update(): void
}

const expression: Expression = {
	op: [],

	value: new Reactive('', document.querySelector('#input')!),

	add(v) {
		if (v === null || v === undefined) return
		this.op.push(v.toString())
		this.update()
	},
	pop() {
		this.op.pop()
		this.update()
	},
	clear() {
		this.op = []
		this.update()
	},
	calc() {
		return eval(this.value.value)
	},
	update() {
		// this.op = this.op.filter((e) => {
		// 	;[
		// 		'0',
		// 		'1',
		// 		'2',
		// 		'3',
		// 		'4',
		// 		'5',
		// 		'6',
		// 		'7',
		// 		'8',
		// 		'9',
		// 		'.',
		// 		'+',
		// 		'-',
		// 		'*',
		// 		'/',
		// 		'**',
		// 		'/100',
		// 	].includes(e)
		// })
		this.value.value = this.op.join('')
	},
}

const calc = document.querySelector('#calc')

calc?.addEventListener('click', (e) => {
	if (!(e.target instanceof HTMLElement)) return
	if (e.target.id === 'clear') {
		expression.clear()
	} else if (e.target.id === 'delete') {
		expression.pop()
	} else if (e.target.id === 'equal') {
		const result = expression.calc()
		if (!result) return
		expression.clear()
		expression.add(result)
	} else expression.add(e.target.dataset.content)
})
