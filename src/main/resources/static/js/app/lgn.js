let loginForm = {
    init(){
        $('#loginForm').on('keydown', 'input', function(event) {
            loginForm.keydownEnter(event);
            loginForm.removeInvalidInput(event);
        });
    },
    removeInvalidInput(e) {
        // 한글과 공백을 제거하는 정규 표현식
        e.target.value = e.target.value.replace(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣\s]/g, '');
    },
    keydownEnter(e) {// 한글 또는 공백이 입력될 때 제거하는 함수
        if (e.keyCode === 32) { // 스페이스바를 감지
            e.preventDefault(); // 기본 동작(띄어쓰기)을 막음
            showToast("공백은 입력할 수 없다!");
        }
        if (e.keyCode === 229) { // 한글 입력 중간 상태를 감지
            e.preventDefault(); // 기본 동작을 막음
            showToast("한글은 입력할 수 없다!");
        }
        if(e.keyCode == 13) { // enter는 13이다!
            loginForm.submitForm();
        }
    },
    submitForm() {
        const userId = $("#lgnUserId").val().trim();
        const password = $("#lgnPassword").val().trim();

        // 사용자 ID와 비밀번호 유효성 검사
        if (!regCheck($('#lgnUserId'), 'Engnum')) {
            return; // 길이 검증에 실패하면 함수를 중지
        }
        if (!regCheck($('#lgnPassword'), 'none')) {
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
                    showToast(data.message, 'text-danger');
                }
            })
            .catch(error => console.error('Error:', error));
    },
};

let joinForm = {
    init() {
        $('#userId').on('input', function() {
            // 값을 변경할 때마다 버튼을 비활성화
            $('#btnJoin').prop('disabled', true);
        });
    },
    submitForm() {
        const password = $('#password');
        const rePassword = $('#rePassword');

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
                    // 회원가입 실패 시 메시지 출력
                    showToast(data.message, 'text-danger');
                }
            })
            .catch(error => console.error('Error:', error));
    },
    idCheckForm() {
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
    },
};

$(document).ready(function(){
    loginForm.init();
    joinForm.init();
    $("#signup").on('click',function(){
        var text = $(this).text();
        $(".signin").toggleClass('moveup');
        $(".signup").toggleClass('moveup');
        $(this).text(
            text == "sign up"?"sign in":"sign up"
        ).toggleClass("active");
    });
    if(localStorage.getItem('btn') === "join") {
        localStorage.removeItem('btn');
        $("#signup").trigger('click');
    }
});
