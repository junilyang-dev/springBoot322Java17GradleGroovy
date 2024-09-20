function submitForm() {
    const password = $('#password');
    const rePassword = $('#rePassword');

    $('#userIdError').text('');
    $('#userId').removeClass('is-invalid');
    $('#passwordError').text('');
    $('#password').removeClass('is-invalid');
    $('#emailError').text('');
    $('#email').removeClass('is-invalid');
/*
    // 사용자 ID와 비밀번호, 비밀번호 확인, email 유효성 검사
    if (!regCheck($('#userId'), 'Engnum')) {
        return; // 길이 검증에 실패하면 함수를 중지
    }

    if (!regCheck($('#password'), 'none')) {
        return; // 길이 검증에 실패하면 함수를 중지
    }

    if (!regCheck($('#rePassword'), 'none')) {
        return; // 길이 검증에 실패하면 함수를 중지
    }

    if (!regCheck($('#email'), 'email')) {
        return; // 길이 검증에 실패하면 함수를 중지
    }

    if(password.val() !== rePassword.val()) {
        showToast("비밀번호와 비밀번호 확인이 일치하지 않습니다.");
        password.val('');
        rePassword.val('');
        password.focus();
        return;
    }*/
    fetch('/api/v1/user/join', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId: $('#userId').val(), password: $('#password').val(), email: $('#email').val() })
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                showToast(data.message);

                // index 페이지로 이동
                window.location.href = '/index';
            } else {
                if(data.data === "userId") {
                    $('#userIdError').text(data.message);//is-invalid
                    $('#userId').addClass('is-invalid');
                }
                if(data.data === "password") {
                    $('#passwordError').text(data.message);
                    $('#password').addClass('is-invalid');
                }
                if(data.data === "email") {
                    $('#emailError').text(data.message);
                    $('#email').addClass('is-invalid');
                }
                // 회원가입 실패 시 메시지 출력
                showToast(data.message, 'text-danger');
            }
        })
        .catch(error => console.error('Error:', error));
}