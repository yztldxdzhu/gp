const LoginReducers = (state = { success: false }, action) => {
    let newState;
    switch (action.type){
        case 'SUCCESS_LOGIN':
            console.log('登陆成功！');
            state = {};
            state.success = true;
            state.account = action.account;
            state.userType = action.userType;
            newState = Object.assign({}, state);
            return newState;
        case 'FAIL_LOGIN':
            console.log('登陆失败！');
            state = {};
            state.success = false;
            state.failMsg = action.errMsg;
            newState = Object.assign({}, state);
            return newState;
        case 'LOGIN_OUT':
            console.log('退出登录！');
            state = {};
            state.success = false;
            newState = Object.assign({}, state);
            return newState;
        default:
            return state;
    }
};
export default LoginReducers;