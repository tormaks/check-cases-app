import './App.css';

import {Component} from 'react';

import CheckCase from '../checkCase/CheckCase';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            word: '',
            russianCase: '',
            result: ''
        }
    }

    getFormData = (word, russianCase) => {
        word = word.substr(0, 1).toUpperCase() + word.substr(1).toLowerCase();
        this.setState(({
            word,
            russianCase,
        }))
        this.selectRussianCase(word, russianCase);
    }

    selectRussianCase = (word, russianCase) => {
        const wordLastLetter = word[word.length - 1];
        const wordWithoutLastLetter = word.substr(0, word.length - 1);

        switch (russianCase) {
            case 'Именительный':
                this.resultGeneration(this.transformToNominative(word));
                break;
            case 'Родительный':
                this.resultGeneration(this.transformToGenitive(word, wordLastLetter, wordWithoutLastLetter));
                break;
            case 'Дательный':
                this.resultGeneration(this.transformToDative(word, wordLastLetter, wordWithoutLastLetter));
                break;
            case 'Винительный':
                this.resultGeneration(this.transformToAccusative(word, wordLastLetter, wordWithoutLastLetter));
                break;
            case 'Творительный':
                this.resultGeneration(this.transformToInstrumental(word, wordLastLetter, wordWithoutLastLetter));
                break;
            case 'Предложный':
                this.resultGeneration(this.transformToPrepositional(word.toLowerCase(), wordLastLetter, wordWithoutLastLetter.toLowerCase()));
                break;
        }
    }

    transformToNominative = (word) => word;

    transformToGenitive = (word, wordLastLetter, wordWithoutLastLetter) => {
        let result;

        if (wordLastLetter === 'а') {
            result = wordWithoutLastLetter + 'ы';
        } else if (wordLastLetter === 'я' || wordLastLetter === 'ь') {
            result = wordWithoutLastLetter + 'и';
        } else if (wordLastLetter === 'й' || wordLastLetter === 'е') {
            result = wordWithoutLastLetter + 'я';
        } else if (wordLastLetter === 'о') {
            result = wordWithoutLastLetter + 'а';
        } else if (wordLastLetter === 'у') {
            result = word;
        } else {
            result = word + 'а';
        }

        return result;
    }

    transformToDative = (word, wordLastLetter, wordWithoutLastLetter) => {
        let result;

        if ((wordLastLetter === 'а' || wordLastLetter === 'я') && word[word.length - 2] !== 'и') {
            result = wordWithoutLastLetter + 'е';
        } else if ((wordLastLetter === 'я' && word[word.length - 2] === 'и') || wordLastLetter === 'ь') {
            result = wordWithoutLastLetter + 'и';
        } else if (wordLastLetter === 'й' || wordLastLetter === 'е') {
            result = wordWithoutLastLetter + 'ю';
        } else if (wordLastLetter === 'о') {
            result = wordWithoutLastLetter + 'у';
        } else if (wordLastLetter === 'у') {
            result = word;
        } else {
            result = word + 'у';
        }

        return result;
    }

    transformToAccusative = (word, wordLastLetter, wordWithoutLastLetter) => {
        let result;

        if (wordLastLetter === 'а') {
            result = wordWithoutLastLetter + 'у';
        } else if (wordLastLetter === 'я') {
            result = wordWithoutLastLetter + 'ю';
        } else if (wordLastLetter === 'й') {
            result = wordWithoutLastLetter + 'я';
        } else {
            result = word;
        }

        return result;
    }

    transformToInstrumental = (word, wordLastLetter, wordWithoutLastLetter) => {
        let result;

        if (wordLastLetter === 'а') {
            result = wordWithoutLastLetter + 'ой';
        } else if (wordLastLetter === 'я') {
            result = wordWithoutLastLetter + 'ей';
        } else if (wordLastLetter === 'й' || wordLastLetter === 'е') {
            result = wordWithoutLastLetter + 'ем';
        } else if (wordLastLetter === 'ь') {
            result = word + 'ю';
        } else if (wordLastLetter === 'о') {
            result = word + 'м';
        } else {
            result = word + 'ом';
        }

        return result;
    }

    transformToPrepositional = (word, wordLastLetter, wordWithoutLastLetter) => {
        let result = 'О ';

        if ((wordLastLetter === 'я') && word[word.length - 2] === 'и') {
            result += wordWithoutLastLetter + 'и';
        } else if ((wordLastLetter === 'я') && word[word.length - 2] !== 'и') {
            result += wordWithoutLastLetter + 'е';
        } else if (wordLastLetter === 'а' || wordLastLetter === 'й' || wordLastLetter === 'е' || wordLastLetter === 'о') {
            result += wordWithoutLastLetter + 'е';
        } else if (wordLastLetter === 'ь') {
            result += wordWithoutLastLetter + 'и';
        } else if (wordLastLetter === 'у') {
            result += word;
        } else {
            result += word + 'е';
        }

        return result;
    }

    resultGeneration = (word) => {
        this.setState(({
            result: word,
        }))
    }

    render() {
        const {result} = this.state
        return (
            <div className='App'>
                <h1 className='app__title'>Узнайте падеж слова</h1>
                <CheckCase
                    result={result}
                    getFormData={this.getFormData}/>
            </div>
        )
    }
}

export default App;
