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