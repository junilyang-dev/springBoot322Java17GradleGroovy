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

function idCheckForm() {
    $('#userIdError').text('');
    $('#userId').removeClass('is-invalid');

    if (!regCheck($('#userId'), 'Engnum')) {
        return; // 길이 검증에 실패하면 함수를 중지
    }
    fetch(`/api/v1/user/idcheck?id=${encodeURIComponent($('#userId').val())}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                showToast(data.message);
                $("#btnJoin").attr("disabled",false);
            } else {
                $("#btnJoin").attr("disabled",true);
                if(data.data === "userId") {
                    $('#userIdError').text(data.message);//is-invalid
                    $('#userId').addClass('is-invalid');
                }
                // 회원가입 실패 시 메시지 출력
                showToast(data.message, 'text-danger');
            }
        })
        .catch(error => console.error('Error:', error));
}

document.addEventListener('DOMContentLoaded', () => init());
function init() {
    $('#userId').on('input', function() {
        // 값을 변경할 때마다 버튼을 비활성화
        $('#btnJoin').prop('disabled', true);
    });
}
