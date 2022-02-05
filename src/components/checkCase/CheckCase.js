import './checkCase.css';

import {Component} from 'react';

class CheckCase extends Component {
	constructor(props) {
		super(props);
		this.state = {
			word: '',
			russianCase: 'Именительный',
			buttonDisabled: true,
		}
	}

	onChangeRussianCase = (event) => {
		const russianCase = event.target[event.target.selectedIndex].value;
		this.setState(({
			russianCase,
		}))
	}

	onChangeWord = (event) => {
		const word = event.target.value;
		this.onValidationWord(word);
		this.setState(({
			word,
		}))
	}

	onValidationWord = (word) => {
		const onlyСyrillic = /^[?!,.а-яА-ЯёЁ\s]+$/;
		const repetitionAtTheStart = /(?=(.))\1{2,}/g;
		if (!word.search(onlyСyrillic) && word.search(repetitionAtTheStart) && word.length >= 3) {
			this.setState(({
				buttonDisabled: false,
			}))
		} else {
			this.setState(({
				buttonDisabled: true,
			}))
		}
	}

	onSubmitFormData = (event) => {
		event.preventDefault();
		let {word, russianCase} = this.state;
		this.props.getFormData(word, russianCase);
	}

	render() {
		const {word, buttonDisabled} = this.state;
		return (
			<div className='check-case'>
				<form 	action="#"
					  	className='check-case__form'
						onSubmit={this.onSubmitFormData}
						>
					<h2 className='check-case__title'>Введите существительное в единственном числе</h2>
					<input
						className='check-case__input'
						type="text" placeholder='Существительное'
						required
						value={word}
						minLength='3'
						onChange={this.onChangeWord}
						/>
					<p className='check-case__case-title'>Выберите падеж: </p>
					<select
						className='check-case__select'
						name="russian-cases"
						onChange={this.onChangeRussianCase}>
						<option value="Именительный">Именительный</option>
						<option value="Родительный">Родительный</option>
						<option value="Дательный">Дательный</option>
						<option value="Винительный">Винительный</option>
						<option value="Творительный">Творительный</option>
						<option value="Предложный">Предложный</option>
					</select>
					<button className='check-case__button'
							type='submit'
							disabled={buttonDisabled}>Узнать</button>
				</form>
				<p className='check-case__result'>{`Результат: ${this.props.result}`}</p>
			</div>
		)
	}
}

export default CheckCase;