import create from './utils/create.js';
import Key from './Key.js';
import * as storage from './utils/storage.js';
import language from './languages/main.js';

class Keyboard {
    constructor() {
        this.keysPressed = {};
        this.isCaps = false;
    }

    init(lang) {
        this.keys = language[lang];
        this.output = create('textarea', null, null, document.body, ['name', 'Input'], ['cols', '30'], ['rows', '10'], ['placeholder', 'Type here'], ['autofocus']);
        this.container = create('section', 'keyboard', null, document.body, ['data-language', lang], ['onselectstart', 'return false']);
        this.row1 = create('div', 'row row-1', null, this.container);
        this.row2 = create('div', 'row row-2', null, this.container);
        this.row3 = create('div', 'row row-3', null, this.container);
        this.row4 = create('div', 'row row-4', null, this.container);
        this.row5 = create('div', 'row row-5', null, this.container);
        this.rows = [this.row1, this.row2, this.row3, this.row4, this.row5];
        return this;
    }

    generateLayout() {
        this.keysArr = [];

        this.keys.forEach((key, index) => {
            const newKey = new Key(key).container;
            this.keysArr.push(newKey);
            if (index <= 13) {
                this.row1.append(newKey);
            } else if (index > 13 && index <= 27) {
                this.row2.append(newKey);
            } else if (index > 27 && index <= 40) {
                this.row3.append(newKey);
            } else if (index > 40 && index <= 53) {
                this.row4.append(newKey);
            } else {
                this.row5.append(newKey);
            }
        })

        this.row5.append(create('div', 'info', 'Info'));

        document.addEventListener('keydown', (event) => {
            event.preventDefault();
            this.output.focus();
            document.querySelectorAll(`[data-code="${event.keyCode}"]`).forEach(item => {
                if(event.keyCode === 20) {
                    item.classList.toggle('active');
                } else {
                    item.classList.add('active');
                }
            })

            if(event.keyCode === 16) this.isShift = true;
            if(event.keyCode === 18) this.isAlt = true;
        

            if(this.isShift && this.isAlt) {
                this.switchLanguage();
            }
        });

        document.addEventListener('keyup', (event) => {
            document.querySelectorAll(`[data-code="${event.keyCode}"]`).forEach(item => {
                if(event.keyCode !== 20) {
                    item.classList.remove('active');
                }
            })

            if(event.keyCode === 16) this.isShift = false;
            if(event.keyCode === 18) this.isAlt = false;
        });

        this.currentPressedKey = null,

        document.addEventListener('mousedown', (event) => {
            this.output.focus();

            if (event.target.closest('.key')) {
                const key = event.target.closest('.key');
                if(key.dataset.code === '20') {
                    console.log(key.dataset.code);
                    key.classList.toggle('active');
                } else {
                    key.classList.add('active');
                    this.currentPressedKey = key;
                }
            }
        });

        document.addEventListener('mouseup', () => {
            if (this.currentPressedKey) {
                this.currentPressedKey.classList.remove('active');
                this.currentPressedKey = null;
            }
        })

        return this;
    }

    switchLanguage() {
        this.rows.forEach(row => {
            row.innerHTML = '';
        })
        const langAbbr = Object.keys(language);
        let langIndex = langAbbr.indexOf(this.container.dataset.language);
        this.keys = langIndex + 1 >= langAbbr.length ? language[langAbbr[langIndex -= langIndex]] : language[langAbbr[++langIndex]];
        console.log(langIndex);
        this.container.dataset.language = langAbbr[langIndex];
        this.generateLayout();
    }
}

export default Keyboard;