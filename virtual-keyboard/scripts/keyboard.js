import create from './utils/create.js';
import Key from './key.js';
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
        return this;
    }

    generateLayout() {
        this.keysButtons = [];

        this.keys.forEach((key, index) => {
            const newKey = new Key(key);
            this.keysButtons.push(newKey);
            if (index <= 13) {
                this.row1.append(newKey.container);
            } else if (index > 13 && index <= 27) {
                this.row2.append(newKey.container);
            } else if (index > 27 && index <= 40) {
                this.row3.append(newKey.container);
            } else if (index > 40 && index <= 53) {
                this.row4.append(newKey.container);
            } else {
                this.row5.append(newKey.container);
            }
        })

        this.row5.append(create('div', 'info', 'Info'));

        document.addEventListener('keydown', (event) => {
            event.preventDefault();
            this.output.focus();
            const keyObj = this.keysButtons.find((key) => key.keyCode === event.keyCode);

            if (event.code.match(/Control|Shift|Alt/)) {
                const items = document.querySelectorAll(`[data-code="${event.keyCode}"]`);
                if (event.code.match(/Right/)) {
                    items[1].classList.add('active');
                } else {
                    items[0].classList.add('active');
                }
            } else {
                if (event.keyCode === 20) {
                    keyObj.container.classList.toggle('active');
                    this.isCaps = !this.isCaps ? true : false;
                    this.switchCase(this.isCaps ? true : false);
                } else {
                    keyObj.container.classList.add('active');
                }
            }

            if(event.keyCode === 16) {
                this.isShift = true;
                this.switchCase(true);
            }
            if(event.keyCode === 18) this.isAlt = true;
            if(event.keyCode === 16 && this.isAlt || event.keyCode === 18 && this.isShift) {
                this.switchLanguage();
            }

            
            if (!this.isCaps) {
                this.activateKey(keyObj, this.isShift ? keyObj.shift : keyObj.basicValue);
            } else if (this.isCaps) {
                if (this.isShift) {
                    this.activateKey(keyObj, keyObj.keySub.innerHTML ? keyObj.shift : keyObj.basicValue);
                } else {
                    this.activateKey(keyObj, keyObj.keySub.innerHTML ? keyObj.basicValue : keyObj.shift);
                }
            }    
        });

        document.addEventListener('keyup', (event) => {
            if (event.code.match(/Control|Shift|Alt/)) {
                const items = document.querySelectorAll(`[data-code="${event.keyCode}"]`);
                if (event.code.match(/Right/)) {
                    items[1].classList.remove('active');
                } else {
                    items[0].classList.remove('active');
                }
            }
            
            if (event.keyCode !== 20) {
                document.querySelector(`[data-code="${event.keyCode}"]`).classList.remove('active');
            }

            if(event.keyCode === 16) {
                this.isShift = false;
                this.switchCase(false);
            }
            if(event.keyCode === 18) this.isAlt = false;
        });

        this.currentPressedKey = null,

        document.addEventListener('mousedown', (event) => {
            this.output.focus();

            if (event.target.closest('.key')) {
                const key = event.target.closest('.key');
                const keyObj = this.keysButtons.find((key) => key.keyCode == event.target.closest('.key').dataset.code);
                if(key.dataset.code === '20') {
                    key.classList.toggle('active');
                    this.isCaps = !this.isCaps ? true : false;
                    this.switchCase(this.isCaps ? true : false);
                } else {
                    key.classList.add('active');
                    this.currentPressedKey = key;

                    if(key.dataset.code === '16') {
                        this.isShift = true;
                        this.switchCase(true);
                    }
                    if(key.dataset.code === '18') this.isAlt = true;

                    if(key.dataset.code === '16' && this.isAlt || key.dataset.code === '18' && this.isShift) {
                        this.switchLanguage();
                    }

                    if (!this.isCaps) {
                        this.activateKey(keyObj, this.isShift ? keyObj.shift : keyObj.basicValue);
                    } else if (this.isCaps) {
                        if (this.isShift) {
                            this.activateKey(keyObj, keyObj.keySub.innerHTML ? keyObj.shift : keyObj.basicValue);
                        } else {
                            this.activateKey(keyObj, keyObj.keySub.innerHTML ? keyObj.basicValue : keyObj.shift);
                        }
                    } 
                }
            }
        });

        document.addEventListener('mouseup', () => {
            this.output.focus();
            if (this.currentPressedKey) {
                this.currentPressedKey.classList.remove('active');
                if (this.currentPressedKey.dataset.code === '16') {
                    this.isShift = false;
                    this.switchCase(false);
                }
                if (this.currentPressedKey.dataset.code === '18') this.isAlt = false;
                this.currentPressedKey = null;
            }
        })

        return this;
    }

    switchLanguage() {
        const langAbbr = Object.keys(language);
        let langIndex = langAbbr.indexOf(this.container.dataset.language);
        this.keys = langIndex + 1 >= langAbbr.length ? language[langAbbr[langIndex -= langIndex]] : language[langAbbr[++langIndex]];
        this.container.dataset.language = langAbbr[langIndex];
        storage.storageSet('lang', langAbbr[langIndex]);
        
        this.keysButtons.forEach((button) => {
            const keyObj = this.keys.find((key) => key.keyCode === button.keyCode);
            button.basicValue = keyObj.basicValue;
            button.shift = keyObj.shift;
            button.keyMain.innerHTML = button.basicValue;
            if (keyObj.shift && keyObj.shift.match(/[^a-zA-Zа-яА-ЯёЁ]/g)) {
                button.keySub.innerHTML = button.shift;
            } else {
                button.keySub.innerHTML = '';
            }
            this.checkCaseForSwitchLanguage(button);
        });
    }

    switchCase(isUpper) {
        if (isUpper) {
            this.keysButtons.forEach(button => {
                if(button.keySub.textContent) {
                    if (this.isShift) {
                        button.keySub.classList.add('key__sub_active');
                        button.keyMain.classList.add('key_inactive');
                    }
                } 
                
                if (button.basicValue.length < 2 && this.isCaps && !this.isShift && !button.keySub.textContent) {
                    button.keyMain.textContent = button.shift;
                } else if (button.basicValue.length < 2 && this.isCaps && this.isShift) {
                    button.keyMain.textContent = button.basicValue;
                } else if (button.basicValue.length < 2 && !button.keySub.textContent) {
                    button.keyMain.textContent = button.shift;
                }
            });
        } else {
            this.keysButtons.forEach(button => {
                if(button.keySub.textContent && button.basicValue.length < 2) {
                    button.keySub.classList.remove('key__sub_active');
                    button.keyMain.classList.remove('key_inactive');

                    /* if(this.isCaps) {
                        button.keyMain.textContent = button.basicValue;
                    } else if(!this.isCaps) {
                        button.keyMain.textContent = button.shift;
                    } */
                } else if (button.basicValue.length < 2) {
                    if (this.isCaps) {
                        button.keyMain.textContent = button.shift;
                    } else {
                        button.keyMain.textContent = button.basicValue;
                    }
                }
            });
        }
    }

    checkCaseForSwitchLanguage(button) {
        if(!button.keySub.textContent) {
            if(button.keySub.classList.contains('key__sub_active')) button.keySub.classList.remove('key__sub_active');
            if(button.keyMain.classList.contains('key_inactive')) button.keyMain.classList.remove('key_inactive');
        }
    }

    activateKey(keyObj, symbol) {
        let cursorPosition = this.output.selectionStart;
        const leftFromCursor = this.output.value.slice(0, cursorPosition);
        const rightFromCursor = this.output.value.slice(cursorPosition);

        const fnButtons = {
            '9': () => { //Tab
                this.output.value = `${leftFromCursor}\t${rightFromCursor}`;
                ++cursorPosition;
            }, 
            '37': () => cursorPosition = cursorPosition - 1 >= 0 ? --cursorPosition : 0, //ArrowLeft
            '39': () => ++cursorPosition, //ArrowRight
            '38': () => { //ArrowUp
                const positionFromLeft = this.output.value.slice(0, cursorPosition).match(/(\n).*$(?!\1)/g) || [[1]];
                cursorPosition -= positionFromLeft[0].length;
            },
            '40': () => { //ArrowDown
                const positionFromLeft = this.output.value.slice(cursorPosition).match(/(\n).*$(?!\1)/) || [[1]];
                cursorPosition += positionFromLeft[0].length;
            },
            '13': () => { //Enter
                this.output.value = `${leftFromCursor}\n${rightFromCursor}`;
                ++cursorPosition;
            },
            '8': () => { //Backspace
                this.output.value = `${leftFromCursor.slice(0, -1)}${rightFromCursor}`;
                --cursorPosition;
            }
        }

        if(fnButtons[keyObj.keyCode]) {
            fnButtons[keyObj.keyCode]();
        } else if (keyObj.basicValue.length < 2) {
            ++cursorPosition;
            this.output.value = `${leftFromCursor}${symbol || ''}${rightFromCursor}`;
        }

        this.output.setSelectionRange(cursorPosition, cursorPosition);
    }
}

export default Keyboard;