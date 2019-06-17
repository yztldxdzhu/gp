export const isPhone = (val) => {
    let pattern = /^1[3|4|5|7|8][0-9]{9}$/;
    if(pattern.test(val)){
        return true;
    }else{
        return false;
    }
};

export const isCorrectPwd = (val) => {
    let pattern = /^(\w){6,20}$/;
    if(pattern.test(val)){
        return true;
    }else{
        return false;
    }
};

export const isCorrectValiCode = (val) => {
    let pattern = /^(\w){6}$/;
    if(pattern.test(val)){
        return true;
    }else{
        return false;
    }
};
export const isCorrectAge = (val) => {
    if(parseInt(val) > 0 && parseInt(val) < 101){
        return true;
    }else{
        return false;
    }
};
export const isCorrectGpa = (val) => {
    if(parseInt(val) >= 0 && parseInt(val) <= 5){
        return true;
    }else{
        return false;
    }
};
export const isCorrectGrade = (val) => {
    if(parseInt(val) > 0 && parseInt(val) < 101){
        return true;
    }else{
        return false;
    }
};