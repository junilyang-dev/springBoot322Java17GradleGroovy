
let thema = {
    init() {
        let localStorageVal = localStorage.getItem('thema');
        if (localStorageVal == null) {
            localStorage.setItem('thema', 'dark');
            document.documentElement.setAttribute('data-theme', 'dark');
        } else {
            document.documentElement.setAttribute('data-theme', localStorageVal);
        }
    },
    toggle() {
        const themeVal = document.documentElement.getAttribute('data-theme');
        if(themeVal === 'dark') {
            localStorage.setItem('thema', 'white');
            document.documentElement.setAttribute('data-theme', 'white');
        } else if(themeVal === 'white'){
            localStorage.setItem('thema', 'dark');
            document.documentElement.setAttribute('data-theme', 'dark');
        }

    },
};
document.addEventListener('DOMContentLoaded', () => {
    thema.init();
});
