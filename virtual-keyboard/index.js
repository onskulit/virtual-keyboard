import { storageGet } from './scripts/utils/storage.js';
import Keyboard from './scripts/Keyboard.js';
import create from './scripts/utils/create.js';

// 

const  lang = 'ru'; //storageGet('lang', 'en');

document.body.innerHTML = '';

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