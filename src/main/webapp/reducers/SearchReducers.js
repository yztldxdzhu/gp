const SearchReducers = (state = { success: false }, action) => {
    let newState;
    switch (action.type){
        case 'SUCCESS_SEARCH':
            console.log('搜索成功！');
            state = {};
            state.success = true;
            state.dataList = action.dataList;
            newState = Object.assign({}, state);
            return newState;
        case 'FAIL_SEARCH':
            console.log('搜索失败！');
            state = {};
            state.success = false;
            state.errMsg = action.errMsg;
            newState = Object.assign({}, state);
            return newState;
        case 'NOT_SEARCH':
            console.log('清空搜索！');
            state = {};
            state.success = false;
            newState = Object.assign({}, state);
            return newState;
        default:
            return state;
    }
};
export default SearchReducers;