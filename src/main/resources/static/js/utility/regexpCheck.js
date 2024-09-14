function regCheck(obj, type) {
    let _obj = obj[0];
    let _korNm = _obj.alt;
    let _length = _obj.maxLength;
    const blankRegExp = /\s/;

    if(!obj.val()) {
        showToast(_korNm + "을(를) 입력해주세요.");
        obj.focus();
        return false;
    }
    if(obj.val().length > _length) {
        showToast(_korNm + "은(는) " + _length + "자 이내로 입력해주세요.");
        obj.focus();
        return false; // 검증 실패 시 false 반환
    }
    if(blankRegExp.test(obj.val())){
        showToast(_korNm + "에 공백을 넣을 수 없습니다.");
        obj.focus();
        return false; // 검증 실패 시 false 반환
    }

    let nonCheck = false;
    let regExp = "";
    let msg = "";

    if(type === "num") {
        regExp = /^[0-9]*$/; // 숫자만 체크
        msg = _korNm + "은(는) 숫자만 입력해주세요.";
    }else if(type === "Eng") {
        regExp = /^[a-zA-Z]*$/; // 대소문자만 체크
        msg = _korNm + "은(는) 영문대소문자만 입력해주세요.";
    }else if(type === "eng") {
        regExp = /^[a-z]*$/; // 소문자만 체크
        msg = _korNm + "은(는) 영문소문자만 입력해주세요.";
    }else if(type === "ENG") {
        regExp = /^[A-Z]*$/; // 대문자만 체크
        msg = _korNm + "은(는) 영문대문자만 입력해주세요.";
    }else if(type === "Engnum") {
        regExp = /^[a-zA-Z0-9]*$/; // 대소문자숫자만 체크
        msg = _korNm + "은(는) 영문대소문자, 숫자만 입력해주세요.";
    }else if(type === "email") {
        regExp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i; // 이메일 체크
        msg = _korNm + "은(는) 이메일 형식에 일치하지 않습니다.";
    }else if(type === "pwd") {
        regExp = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{1,10}$/; // 패스워드 체크(대소문자숫자특문 다 포함)
        msg = _korNm + "은(는) 영문 대문자, 소문자, 숫자, 특수문자가 각각 1개씩 포함되어야합니다.";
    }else if(type === "none") {
        nonCheck = true;
    }

    if(!nonCheck) {
        if(!regExp.test(obj.val())) {
            obj.val("")
            obj.focus();
            showToast(msg);
            return false;
        }
    }
    return true; // 검증 통과 시 true 반환
}