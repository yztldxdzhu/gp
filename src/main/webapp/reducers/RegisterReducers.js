const RegisterReducers = (state = { success: false }, action) => {
    let newState;
    switch (action.type){
        case 'SUCCESS_REGISTER':
            console.log('注册成功！');
            state = {};
            state.success = true;
            state.userType = action.userType;
            newState = Object.assign({}, state);
            return newState;
        case 'FAIL_REGISTER':
            console.log('注册失败！');
            state = {};
            state.success = false;
            state.errMsg = action.errMsg;
            newState = Object.assign({}, state);
            return newState;
        case 'NOT_REGISTER':
            console.log('未注册！');
            state = {};
            state.success = false;
            state.msg = action.msg;
            newState = Object.assign({}, state);
            return newState;
        default:
            return state;
    }
};
export default RegisterReducers;