function submitForm() {
    const userId = document.getElementById("userId").value.trim();
    const password = document.getElementById("password").value.trim();
    const rePassword = document.getElementById("rePassword").value.trim();
    const email = document.getElementById("email").value.trim();

    // 사용자 ID와 비밀번호, 비밀번호 확인, email 유효성 검사
    if (!userId) {
        showToast("사용자ID를 입력해주세요.");
        document.getElementById("userId").focus();
        return; // 함수 종료
    }

    if (!password) {
        showToast("비밀번호를 입력해주세요.");
        document.getElementById("password").focus();
        return; // 함수 종료
    }

    if (!rePassword) {
        showToast("비밀번호 확인을 입력해주세요.");
        document.getElementById("rePassword").focus();
        return; // 함수 종료
    }

    if (!email) {
        showToast("이메일을 입력해주세요.");
        document.getElementById("email").focus();
        return; // 함수 종료
    }

    if(password !== rePassword) {
        showToast("비밀번호와 비밀번호 확인이 일치하지 않습니다.");
        document.getElementById("password").value = null;
        document.getElementById("rePassword").value = null;
        document.getElementById("password").focus();
        return;
    }
    const email_regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
    if(!email_regex.test(email)){
        showToast("유효하지 않은 이메일 형식입니다.");
        document.getElementById("email").value = null;
        document.getElementById("email").focus();
        return;
    }
}