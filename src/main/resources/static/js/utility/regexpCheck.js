function vaildation(getId, korId, length, type) {
    const getObject = document.getElementById(getId);
    const getVal = getObject.value;
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
    const regExp = /\s/;
    if(regExp.test(getVal)){
        showToast(korId + "에 공백을 넣을 수 없습니다.");
        $(getObject).val("").focus();
        return false; // 검증 실패 시 false 반환
    }
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