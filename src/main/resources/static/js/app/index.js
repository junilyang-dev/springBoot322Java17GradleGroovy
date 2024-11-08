let index = {
    init() {
        console.log('index.js');

        if(localStorage.getItem("myPageOut")==="Y") {
            showToast("로그아웃되었습니다.");
            localStorage.removeItem("myPageOut");
        }
    },

};

document.addEventListener('DOMContentLoaded', () => index.init());

