import create from './utils/create.js';

class Key {
    constructor({ basicValue, shift, keyCode }) {
        this.basicValue = basicValue;
        this.shift = shift;
        this.keyCode = keyCode;
        this.isFnKey = basicValue.length > 1 ? true : false;

        if (this.shift && this.shift.match(/[^a-zA-Zа-яА-ЯёЁ]/)) {
            this.keySub = create('div', 'key__sub', this.shift);
        } else {
            this.keySub = create('div', 'key__sub', '');
        }

        this.keyMain = create('div', 'key__main', this.basicValue);
        this.container = create('div', 'key', [this.keySub, this.keyMain], null, ['data-code', this.keyCode]);
    }
}

export default Key;