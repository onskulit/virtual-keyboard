import { storageGet } from './scripts/utils/storage.js';
import Keyboard from './scripts/keyboard.js';
import create from './scripts/utils/create.js';

const  lang = storageGet('lang', 'en');

new Keyboard().init(lang).generateLayout();

// get array of keys
/* let allKeys = [];

document.addEventListener('keydown', (event) => {
    
    const obj = {
        basicValue: event.key,
        shift: '',
        keyCode: event.keyCode,  
    }

    allKeys.push(obj);
    console.log(allKeys);
}); */