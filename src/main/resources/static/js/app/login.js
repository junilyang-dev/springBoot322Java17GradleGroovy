const inputUserId = document.getElementById("userId");
inputUserId.addEventListener('keydown', function(event) {
    keydownEnter(event);
});
inputUserId.addEventListener('input', function(event) {
    removeInvalidInput(event);
});
const inputPassword = document.getElementById("password");
inputPassword.addEventListener('keydown', function(event) {
    keydownEnter(event);
});
inputPassword.addEventListener('input', function(event) {
    removeInvalidInput(event);
});
// 한글 또는 공백이 입력될 때 제거하는 함수
function removeInvalidInput(e) {
    // 한글과 공백을 제거하는 정규 표현식
    e.target.value = e.target.value.replace(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣\s]/g, '');
}
function keydownEnter(e) {
    if (e.keyCode === 32) { // 스페이스바를 감지
        e.preventDefault(); // 기본 동작(띄어쓰기)을 막음
        showToast("공백은 입력할 수 없다!");
    }
    if (e.keyCode === 229) { // 한글 입력 중간 상태를 감지
        e.preventDefault(); // 기본 동작을 막음
        showToast("한글은 입력할 수 없다!");
    }
    if(e.keyCode == 13) { // enter는 13이다!
        submitForm();
    }
}

function submitForm() {
    const userId = document.getElementById("userId").value.trim();
    const password = document.getElementById("password").value.trim();

    // 사용자 ID와 비밀번호 유효성 검사
    if (!vaildation("userId", "사용자ID", 30, "Engnum")) {
        return; // 길이 검증에 실패하면 함수를 중지
    }
    if (!vaildation("password", "비밀번호", 30, "none")) {
        return; // 길이 검증에 실패하면 함수를 중지
    }

    fetch('/api/v1/user/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId: userId, password: password })
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // JWT 토큰을 로컬 스토리지에 저장
                localStorage.setItem('accessToken', data.data.accessToken);
                localStorage.setItem('refreshToken', data.data.refreshToken);

                // index 페이지로 이동
                window.location.href = '/index';
            } else {
                // 로그인 실패 시 메시지 출력
                showToast(data.message);
            }
        })
        .catch(error => console.error('Error:', error));
}

function vaildation(getId, korId, length, type) {
    const getObject = document.getElementById(getId);
    const getVal = getObject.value.trim();
    // 비었는지 확인
    if(!getVal){
        showToast(korId + "을(를) 입력해주세요.");
        $(getObject).val("").focus();
        return false; // 검증 실패 시 false 반환
    }
    // 지정한 길이 안인지 확인
    if (getVal.length > length) {
        showToast(korId + "은(는) " + length + "자 이내로 입력해주세요.");
        $(getObject).val("").focus();
        return false; // 검증 실패 시 false 반환
    }
    // const regExp = /\s/;
    // if(regExp.test(getVal)){
    //     showToast(korId + "에 공백을 넣을 수 없습니다.");
    //     $(getObject).val("").focus();
    //     return false; // 검증 실패 시 false 반환
    // }
    let check = true;
    if(type === "num") {
        const regex = /^[0-9]*$/; // 숫자만 체크
        if(!regex.test(getVal)) {
            check = false;
            showToast(korId + "은(는) 숫자만 입력해주세요.");
        }
    }else if(type === "Eng") {
        const regex = /^[a-zA-Z]*$/; // 대소문자만 체크
        if(!regex.test(getVal)) {
            check = false;
            showToast(korId + "은(는) 영문대소문자만 입력해주세요.");
        }
    }else if(type === "eng") {
        const regex = /^[a-z]*$/; // 소문자만 체크
        if(!regex.test(getVal)) {
            check = false;
            showToast(korId + "은(는) 영문소문자만 입력해주세요.");
        }
    }else if(type === "ENG") {
        const regex = /^[A-Z]*$/; // 대문자만 체크
        if(!regex.test(getVal)) {
            check = false;
            showToast(korId + "은(는) 영문대문자만 입력해주세요.");
        }
    }else if(type === "Engnum") {
        const regex = /^[a-zA-Z0-9]*$/; // 대소문자숫자만 체크
        if(!regex.test(getVal)) {
            check = false;
            showToast(korId + "은(는) 영문대소문자, 숫자만 입력해주세요.");
        }
    }else if(type === "email") {
        const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i; // 이메일 체크
        if(!regex.test(getVal)) {
            check = false;
            showToast(korId + "은(는) 이메일 형식에 일치하지 않습니다.");
        }
    }else if(type === "pwd") {
        const regex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{1,10}$/; // 패스워드 체크(대소문자숫자특문 다 포함)
        if(!regex.test(getVal)) {
            check = false;
            showToast(korId + "은(는) 영문 대문자, 소문자, 숫자, 특수문자가 각각 1개씩 포함되어야합니다.");
        }
    }else if(type === "none") {

    }
    if(!check) {
        $(getObject).val("").focus();
        return false; // 검증 실패 시 false 반환
    }
    return true; // 검증 통과 시 true 반환
}