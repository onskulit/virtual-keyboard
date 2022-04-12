let allKeys = [];

document.addEventListener('keydown', (event) => {
    
    const obj = {
        basicValue: event.key,
        shift: '',
        keyCode: event.keyCode,  
    }

    allKeys.push(obj);
    console.log(allKeys);
});