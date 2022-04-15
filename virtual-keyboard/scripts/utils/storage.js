 const storageSet = (name, value) => {
    window.localStorage.setItem(name, value);
 }

 const storageGet = (name, alternative) => {
    return window.localStorage.getItem(name) || alternative;
 }

 export { storageSet, storageGet }