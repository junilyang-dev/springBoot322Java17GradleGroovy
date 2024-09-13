let indexUserCheck = {
    timerInterval: null,
    accessToken: null,
    refreshToken: null,

    init() {
        this.loginCheck();
    },
    //최초 로그인 버튼 html
    contentLogin:`
                    <p>로그인이 필요합니다.</p>
                    <button type="button" class="btn btn-primary w-100" onclick="indexUserCheck.redirectToLogin()">Login</button>
                    <button type="button" class="btn btn-secondary mt-2 w-100" onclick="indexUserCheck.redirectToJoin()">Join</button>
                `,
    loginCheck() {
        this.accessToken = localStorage.getItem('accessToken');
        if (!this.accessToken) {
            // accessToken이 없을 때 로그인 페이지로 이동하는 버튼 제공
            $('#content').html(this.contentLogin);
        } else {
            // accessToken이 있을 때 사용자 정보를 가져옴
            fetch('/api/v1/user/test', {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + this.accessToken,
                    'Content-Type': 'application/json'
                }
            })
                .then(response => {
                    if (response.ok) {
                        return response.text();
                        //     } else if (response.status === 401) {
                        //         $('#content').html(this.contentLogin);
                        //         return response.text().then((errorMessage) => {
                        //             localStorage.clear();
                        //             showToast(errorMessage);
                        //             throw new Error(errorMessage);
                        //         });
                        //     } else {
                        //         throw new Error('로그인이 필요합니다.');
                    }
                })
                .then(data => {
                    $('#content').html(`<p>환영합니다, ${data}님!</p>
                        <p id="timer">30:00</p>
                        <button type="button" class="btn btn-warning w-100" onclick="indexUserCheck.logout()">Logout</button>
                        <button type="button" class="btn btn-success mt-2 w-100" onclick="indexUserCheck.updateAccessToken()">연장</button>
                    `);
                    this.initializeTimer();
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        }
    },

    redirectToLogin() {
        window.location.href = '/login';
    },

    redirectToJoin() {
        window.location.href = '/join';
    },

    logout() {
        fetch('/api/v1/user/logout', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + this.accessToken,
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                if (response.ok) {
                    return response.text();
                } else {
                    throw new Error('로그아웃 실패');
                }
            })
            .then(data => {
                if (data) {
                    showToast("로그아웃되었습니다.");
                    localStorage.clear();
                    clearInterval(indexUserCheck.timerInterval);
                    indexUserCheck.timerInterval = null;
                    this.loginCheck();
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    },

    updateAccessToken() {
        this.refreshToken = localStorage.getItem('refreshToken');
        fetch('/api/v1/user/refreshtoken', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + this.accessToken,
                'Refresh-Token': this.refreshToken,
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('토큰 갱신 실패');
                }
            })
            .then(data => {
                if (data) {
                    localStorage.setItem('accessToken', data.accessToken);
                    this.accessToken = data.accessToken;
                    showToast("토큰이 갱신되었습니다.");
                    this.initializeTimer();
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    },

    initializeTimer() {
        clearInterval(this.timerInterval); // 이전 타이머 중지
        indexUserCheck.timerInterval = null;

        const token = this.accessToken;
        if (!token) return;

        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = JSON.parse(atob(base64));

        const expirationTime = jsonPayload.exp * 1000;

        const updateTimer = () => {
            const currentTime = new Date().getTime();
            const timeLeft = expirationTime - currentTime;

            if (timeLeft <= 0) {
                clearInterval(this.timerInterval);
                localStorage.clear();
                indexUserCheck.timerInterval = null;
                //$('#content').html(this.contentLogin);
                this.loginCheck();
                showToast("토큰이 만료되었습니다.");
                return;
            }

            const minutes = Math.floor(timeLeft / (1000 * 60));
            const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
            $('#timer').text(`${minutes}:${seconds < 10 ? '0' + seconds : seconds}`);
        };

        this.timerInterval = setInterval(updateTimer, 1000);
        updateTimer();
    },

};

document.addEventListener('DOMContentLoaded', () => indexUserCheck.init());