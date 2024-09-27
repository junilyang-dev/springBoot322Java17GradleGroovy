let indexUserCheck = {
    timerInterval: null,
    accessToken: null,
    refreshToken: null,

    init() {
        this.loginCheck();
    },

    // 로그인 여부에 따라 버튼을 동적으로 추가
    setNavbarButtons(isLoggedIn, userName) {
        let navButtons = document.getElementById('nav-buttons');
        if (isLoggedIn) {
            // 로그인이 된 상태일 때 (로그아웃, 타이머, 연장 버튼)
            navButtons.innerHTML = `
                <span>환영합니다, ${userName}님!</span>
                <span id="timer">30:00</span>
                <button type="button" class="btn btn-warning" onclick="indexUserCheck.logout()">Logout</button>
                <button type="button" class="btn btn-success" onclick="indexUserCheck.updateAccessToken()">연장</button>
            `;
        } else {
            // 로그인이 안 된 상태일 때 (로그인, 조인 버튼)
            navButtons.innerHTML = `
                <button type="button" class="btn btn-primary" onclick="indexUserCheck.redirectToLogin()">Login</button>
                <button type="button" class="btn btn-secondary" onclick="indexUserCheck.redirectToJoin()">Join</button>
            `;
        }
    },

    loginCheck() {
        this.accessToken = localStorage.getItem('accessToken');
        if (!this.accessToken) {
            // accessToken이 없을 때 로그인 페이지로 이동하는 버튼 제공
            this.setNavbarButtons(false);  // 로그인이 안된 상태로 네비바 설정
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
                    }
                })
                .then(data => {
                    this.setNavbarButtons(true, data);  // 로그인이 된 상태로 네비바 설정
                    this.initializeTimer();
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        }
    },

    redirectToLogin() {
        window.location.href = '/lgn';
    },

    redirectToJoin() {
        localStorage.setItem('btn', 'join');
        window.location.href = '/lgn';
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
                    this.setNavbarButtons(false);  // 로그아웃 후 네비바 설정
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
                    showToast("토큰이 갱신되었습니다.",'SUCCESS');
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
                this.setNavbarButtons(false);  // 타이머 만료 후 네비바 설정
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
