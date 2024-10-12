let myPage = {
    init() {
        console.log('mypage.js');
    },

};

let userInfo = {
    loadUserInfo() {
        // 회원 정보를 가져오는 API 호출
        fetch('/api/v1/user/userinfo', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),  // 적절한 토큰 설정 필요
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    const userInfo = data.data;
                    // content 영역에 사용자 정보를 표시
                    document.getElementById('content').innerHTML = `
                <form id="userInfoForm">
                    <div class="form-group">
                        <label for="userId">ID</label>
                        <input type="text" id="userId" value="${userInfo.userId}" class="form-control" disabled />
                    </div>
                    <div class="form-group">
                        <label for="password">Password</label>
                        <button type="button" class="btn btn-warning" onclick="userInfo.changePassword()">비밀번호 변경</button>
                    </div>
                    <div class="form-group">
                        <label for="email">Email</label>
                        <input type="email" id="email" value="${userInfo.email}" class="form-control" />
                    </div>
                    <div class="form-group">
                        <label for="tel">Tel</label>
                        <input type="tel" id="tel" value="${userInfo.tel}" class="form-control" />
                    </div>
                    <button type="button" class="btn btn-primary" onclick="userInfo.updateUserInfo()">정보 수정</button>
                </form>
            `;
                } else {
                    alert('회원 정보를 불러오지 못했습니다.');
                }
            })
            .catch(error => console.error('Error:', error));
    },

    updateUserInfo() {
        const email = document.getElementById('email').value;
        const tel = document.getElementById('tel').value;

        // 업데이트 API 호출
        fetch('/api/v1/user/updateinfo', {
            method: 'PUT',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),  // 적절한 토큰 설정 필요
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, tel })
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    showToast(data.message);
                } else {
                    showToast(data.message);
                }
            })
            .catch(error => console.error('Error:', error));
    },

    changePassword() {
        document.getElementById('passwordPopup').style.display = 'block';
    },

    closePopup() {
        document.getElementById('passwordPopup').style.display = 'none';
    }
};
document.addEventListener('DOMContentLoaded', () => myPage.init());
