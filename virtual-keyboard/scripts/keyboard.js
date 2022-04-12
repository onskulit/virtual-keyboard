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
        this.container = create('section', 'keyboard', null, document.body, ['data-language', lang]);
        this.row1 = create('div', 'row row-1', null, this.container);
        this.row2 = create('div', 'row row-2', null, this.container);
        this.row3 = create('div', 'row row-3', null, this.container);
        this.row4 = create('div', 'row row-4', null, this.container);
        this.row5 = create('div', 'row row-5', null, this.container);
        return this;
    }

    generateLayout() {
        this.keys.forEach((key, index) => {
            if (index <= 13) {
                this.row1.append(new Key(key).container);
            } else if (index > 13 && index <= 27) {
                this.row2.append(new Key(key).container);
            } else if (index > 27 && index <= 40) {
                this.row3.append(new Key(key).container);
            } else if (index > 40 && index <= 53) {
                this.row4.append(new Key(key).container);
            } else {
                this.row5.append(new Key(key).container);
            }
        })

        this.row5.append(create('div', 'info', 'Info'));
    }
}

export default Keyboard;