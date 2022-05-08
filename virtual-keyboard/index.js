import { storageGet } from './scripts/utils/storage.js';
import Keyboard from './scripts/keyboard.js';

const  lang = storageGet('lang', 'en');

new Keyboard().init(lang).generateLayout();

const infoButton = document.querySelector('.info');
infoButton.addEventListener('click', () => {
    alert('Shift + Alt to switch languages\nTask was implemented on Windows 10');
})

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