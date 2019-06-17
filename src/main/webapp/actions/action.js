/**
*  action是一个对象，其中type属性是必须的，同时可以传入一些数据。
*  action可以用actionCreactor进行创造。dispatch就是把action对象发送出去。
*  */

import $ from 'jquery';
import { isPhone } from '../utils/validate';
import { browserHistory } from 'react-router';
import fetch from 'isomorphic-fetch';

let actions = {
    /**
     * 验证用户的手机号是否已经被注册过了
     * 登录、注册、更新个人信息都需要用，参数是手机号
     * */
    isTelRegistered: (tel) => (dispatch) => {
        if( !tel ){
            alert('手机号不能为空！');
        }else if( !isPhone(tel) ){
            alert('手机号格式错误！请输入正确格式的手机号！');
        }else{
            let url = `/gp/user/telCheck`;
            let data = {};
            data.Tel = tel;
            $.ajax({
                url: url,
                type: 'POST',
                xhrFields: {withCredentials: true,},
                data: data,
                success: (res) => {
                    if( res.success ){
                        alert(res.msg);
                        dispatch(actions.notRegister(res.msg));
                    }else {
                        // alert(res.msg);//已经注册
                        browserHistory.push('/login');
                        dispatch(actions.successRegister(''));
                    }
                },
                error: (err) => {
                    console.error('err: ', err);
                    dispatch(actions.failRegister(err));
                }
            });
        }
    },

    /**
     * 请求注册
     * */
    requestReginster: (userType, data, thisp) => (dispatch) => {
        let url;
        if(userType == 0){
            url = `/gp/user/userRegister`;
        }else if(userType == 2){
            url = `/gp/expert/expertRegister`
        }
        $.ajax({
            url: url,
            type: 'POST',
            xhrFields: {withCredentials: true,},
            /*beforeSend : function(req) {
             req.setRequestHeader('Content-Type', 'application/json');  ///加这一行解决问题
             },*/
            data: data,
            success: (res) => {
                thisp.setState({button: '注册'});
                if(res.success){ //"注册成功!"
                    // alert(res.msg);
                    browserHistory.push('/login');
                    dispatch(actions.successRegister(userType));
                }else{
                    alert(res.msg);
                    dispatch(actions.failRegister(res.msg));
                }
            },
            error: (err) => {
                thisp.setState({button: '注册'});
                console.error('err: ', err);
                dispatch(actions.failRegister(err));
            }
        });
    },

    /**
     * 注销顾问账户，删除顾问
     * */
    logoff: (data) => (dispatch) => {
        let url = `/gp/expert/deleteExpert`;
        $.ajax({
            url: url,
            type: 'POST',
            data: data,
            xhrFields: {withCredentials: true,},
            success: (res) => {
                if(res.success){
                    alert(res.msg);
                    dispatch(actions.notRegister(res.msg));
                    browserHistory.push('/expertManage');
                }else{
                    alert(res.msg);
                }
            },
            error: (err) => {
                console.error('err:', err);
            }
        })
    },

    /**
    * 注册的状态
    * */
    successRegister: (userType) => ({
        type: 'SUCCESS_REGISTER',
        userType
    }),
    failRegister: (errMsg) => ({
        type: 'FAIL_REGISTER',
        errMsg
    }),
    notRegister: (msg) => ({
        type: 'NOT_REGISTER',
        msg
    }),





    /*===========================================================================================*/





    /**
     * 请求登录
     * */
    requestLogin: (account, userType, data, thisp) => (dispatch) => {
        let url = '/gp/user/userLogin';
        $.ajax({
            url: url,
            type: 'POST',
            xhrFields: {withCredentials: true,},
            data: data,
            success: (res) => {
                thisp.setState({button: '登陆'});
                if(res.success){
                    // alert(res.msg);
                    if(userType == 0){
                        browserHistory.push('/personalCenter/basicInfo');
                    }else if(userType == 1){
                        browserHistory.push('/userManage');
                    }else if(userType == 2){
                        browserHistory.push('/personalCenterExpert/basicInfo');
                    }
                    dispatch(actions.successLogin(account,userType));
                }else{
                    alert(res.msg);
                    dispatch(actions.failLogin(res.msg));
                }
            },
            error: (err) => {
                thisp.setState({button: '登陆'});
                console.error('err: ',err);
                dispatch(actions.failLogin(err))
            }
        });
        /*fetch(url, {
            method: 'POST',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: `userTel=${account}&userPwd=${pwd}&userType=${userType}`
        })
            .then(function(res) {
                console.log(res);
                return res.json();
            })
            .then(function(data) {
                if (data.success) {
                    dispatch(actions.successLogin(account, pwd, userType, res.loginName, data.id))
                } else {
                    dispatch(actions.failLogin(data.msg))
                }
            });*/
    },

    /**
     * 用户退出登录
     * */
    logout: () => (dispatch) => {
        let url = `/gp/user/userExit`;
        $.ajax({
            url: url,
            type: 'GET',
            xhrFields: {withCredentials: true,},
            success: (res) => {
                if(res.success){
                    // alert(res.msg);
                    browserHistory.push('/login');
                    window.localStorage.removeItem('loginInfo');
                    dispatch(actions.loginOut());
                }
            },
            error: (err) => {
                console.error('err:', err);
            }
        })
    },

    /**
     * 登陆的状态
     * */
    successLogin: (account, userType) => ({
        type: 'SUCCESS_LOGIN',
        account,
        userType
    }),
    failLogin: (errMsg) => ({
        type: 'FAIL_LOGIN',
        errMsg
    }),
    loginOut: () => ({
        type: 'LOGIN_OUT'
    }),




    /*===========================================================================================*/





    /**
     * 请求当前登录用户的信息，用户个人中心
     * */
    requestUserInfo: (thisp) => () => {
        let url = `/gp/user/userMessageGet`;
        $.ajax({
            url: url,
            type: 'GET',
            xhrFields: {withCredentials: true,},
            success: (res) => {
                console.log(res);
                let userInfo = res.user;
                let applyInfos = res.applicationList;
                thisp.setState({
                    expertId: userInfo.expertId,
                    userAge: userInfo.userAge,
                    userCampus: userInfo.userCampus,
                    userEducation: userInfo.userEducation,
                    userEmail: userInfo.userEmail,
                    userGpa: userInfo.userGpa,
                    userHeadPicture: userInfo.userHeadPicture,
                    userId: userInfo.userId,
                    userLocation: userInfo.userLocation,
                    userMajor: userInfo.userMajor,
                    userName: userInfo.userName,
                    userNickname: userInfo.userNickname,
                    userPwd: userInfo.userPwd,
                    userSex: userInfo.userSex == 0 ? '男' : '女',
                    userTel: userInfo.userTel,
                    userType: userInfo.userType,

                    applyInfos: applyInfos
                })
            },
            error: (err) => {
                console.error('err:', err);
            }
        })
    },

    /**
     * 更新修改用户的信息，用户个人中心
     * */
    updateUserInfo: (formData, thisp) => () => {
        let url = `/gp/user/userMessageUpdate`;
        $.ajax({
            url: url,
            type: 'POST',
            data: formData,
            xhrFields: {withCredentials: true,},
            processData: false,
            contentType: false,
            success: (res) => {
                thisp.setState({button: '提交'});
                if(res.success){
                    alert(res.msg);
                    browserHistory.push('/personalCenter/basicInfo');
                }else{
                    alert(res.msg);
                }
            },
            error: (err) => {
                thisp.setState({button: '提交'});
                console.error('err', err);
            }
        })
    },

    /**
     * 请求当前登录用户所绑定的顾问信息，用户个人中心
     * */
    findUserExpert: (thisp) => () => {
        let url = `/gp/user/findUserExpert`;
        $.ajax({
            url: url,
            type: 'GET',
            xhrFields: {withCredentials: true},
            success: (res) => {
                console.log(res);
                thisp.setState({expert: res.expert})
            },
            error: (err) => {
                console.log('err: ', err);
            }
        })
    },

    /**
     * 请求当前登录用户所提的问题，用户个人中心
     * */
    getUserQues: (thisp) => () => {
        let url = `/gp/question/userQuestionGet`;
        $.ajax({
            url: url,
            type: 'GET',
            xhrFields: {withCredentials: true},
            success: (res) => {
                console.log(res);
                thisp.setState({userQuestionList: res.userQuestionList});
            },
            error: (err) => {
                console.log('err: ', err);
            }
        })
    },

    /**
     * 请求当前登录用户所有的订单，用户个人中心
     * */
    getUserOrder: (thisp) => () => {
        let url = `/gp/order/findAllUserOrder`;
        $.ajax({
            url: url,
            type: 'GET',
            xhrFields: {withCredentials: true},
            success: (res) => {
                // console.log(res);
                thisp.setState({orderList: res.orderList});
            },
            error: (err) => {
                console.log('err: ', err);
            }
        })
    },

    findUserOrderByStatus: (data, thisp) => () => {
        let url = `/gp/order/findUserOrderByStatus`;
        $.ajax({
            url: url,
            type: 'POST',
            data: data,
            xhrFields: {withCredentials: true},
            success: (res) => {
                console.log(res);
                thisp.setState({orderList: res.orderList});
            },
            error: (err) => {
                console.log('err: ', err);
            }
        })
    },

    /**
     * 取消订单项
     * */
    cancelOrderItem: (data, thisp) => (dispatch) => {
        let url = `/gp/order/cancelOrderitemByOrderitemId`;
        $.ajax({
            url: url,
            type: 'POST',
            data: data,
            xhrFields: {withCredentials: true},
            success: (res) => {
                if(res.isOk == true){
                    alert(res.msg);
                    dispatch(actions.getUserOrder(thisp));
                }else{
                    alert(res.msg);
                }
            },
            error: (err) => {
                console.log('err: ', err);
            }
        })
    },

    confirmOrderItem: (data, thisp) => (dispatch) => {
        let url = `/gp/order/confirmOrderitem`;
        $.ajax({
            url: url,
            type: 'POST',
            data: data,
            xhrFields: {withCredentials: true},
            success: (res) => {
                if(res.isOk == true){
                    alert(res.msg);
                    dispatch(actions.getUserOrder(thisp));
                }else{
                    alert(res.msg);
                }
            },
            error: (err) => {
                console.log('err: ', err);
            }
        })
    },

    /**
     * 请求当前登录用户的购物车信息，用户个人中心
     * */
    getUserCar: (thisp) => () => {
        let url = `/gp/shoppingCart/findAllUserShoppingCart`;
        $.ajax({
            url: url,
            type: 'GET',
            xhrFields: {withCredentials: true},
            success: (res) => {
                // console.log(res);
                thisp.setState({shoppingCartList: res.shoppingCartList});
            },
            error: (err) => {
                console.log('err: ', err);
            }
        })
    },

    deleteShoppingByCartId: (data, thisp) => (dispatch) => {
        let url = `/gp/shoppingCart/deleteShoppingCartByShoppingCartId`;
        $.ajax({
            url: url,
            type: 'POST',
            data: data,
            xhrFields: {withCredentials: true},
            success: (res) => {
                if(res.success){
                    alert(res.msg);
                    dispatch(actions.getUserCar(thisp));
                }else{
                    alert(res.msg);
                }
            },
            error: (err) => {
                console.log('err: ', err);
            }
        })
    },

    ModifyShoppingCartGoodsCount: (data, thisp) => (dispatch) => {
        let url = `/gp/shoppingCart/ModifyShoppingCartGoodsCount`;
        $.ajax({
            url: url,
            type: 'POST',
            data: data,
            xhrFields: {withCredentials: true},
            success: (res) => {
                if(res.success){
                    // alert(res.msg);
                    dispatch(actions.getUserCar(thisp));
                }else{
                    alert(res.msg);
                }
            },
            error: (err) => {
                console.log('err: ', err);
            }
        })
    },

    /**
    * 请求当前登录用户的申请信息，用户个人中心
    * */
    requestUserApplication: (thisp) => () => {
        let url = `/gp/application/findUserApplication`;
        $.ajax({
            url: url,
            type: 'GET',
            xhrFields: {withCredentials: true},
            success: (res) => {
                console.log(res);
                thisp.setState({userApplicationList: res.userApplicationList})
            },
            error: (err) => {
                console.log('err: ', err);
            }
        })
    },

    /**
     * 用户删除某个申请，用户个人中心
     * */
    deleteUserApplication: (data, thisp) => (dispatch) => {
        let url = `/gp/application/deleteApplication`;
        $.ajax({
            url: url,
            type: 'POST',
            data: data,
            xhrFields: {withCredentials: true},
            success: (res) => {
                if(res.success){
                    alert(res.msg);
                    dispatch(actions.requestUserApplication(thisp));
                }else{
                    alert(res.msg);
                }
            },
            error: (err) => {
                console.log('err: ', err);
            }
        })
    },

    /**
     * 申请流程阶段，上传学校材料
     * */
    uploadMaterialFile: (formData, thisp) => (dispatch) => {
        let url = `/gp/file/addFile`;
        $.ajax({
            url: url,
            type: 'POST',
            data: formData,
            xhrFields: {withCredentials: true},
            processData: false,
            contentType: false,
            success: (res) => {
                console.log(res);
                thisp.setState({materialButton: '上传'});
                if(res.success){
                    alert(res.msg);
                    thisp.setState({materialUploadStatus: 'uploaded'});
                    dispatch(actions.getUserFiles(thisp));
                }else{
                    alert(res.msg);
                }
            },
            error: (err) => {
                thisp.setState({materialButton: '上传'});
                console.log(err);
            }
        })
    },

    /**
     * 申请流程阶段，上传语言材料
     * */
    uploadLanguageFile: (formData, thisp) => (dispatch) => {
        let url = `/gp/file/addFile`;
        $.ajax({
            url: url,
            type: 'POST',
            data: formData,
            xhrFields: {withCredentials: true},
            processData: false,
            contentType: false,
            success: (res) => {
                console.log(res);
                thisp.setState({languageButton: '上传'});
                if(res.success){
                    alert(res.msg);
                    thisp.setState({languageUploadStatus: 'uploaded'});
                    dispatch(actions.getUserFiles(thisp));
                }else{
                    alert(res.msg);
                }
            },
            error: (err) => {
                thisp.setState({languageButton: '上传'});
                console.log(err);
            }
        })
    },

    /**
     * 申请流程阶段，上传毕业证书材料
     * */
    uploadDiplomaFile: (formData, thisp) => (dispatch) => {
        let url = `/gp/file/addFile`;
        $.ajax({
            url: url,
            type: 'POST',
            data: formData,
            xhrFields: {withCredentials: true},
            processData: false,
            contentType: false,
            success: (res) => {
                console.log(res);
                thisp.setState({diplomaButton: '上传'});
                if(res.success){
                    alert(res.msg);
                    thisp.setState({diplomaUploadStatus: 'uploaded'});
                    dispatch(actions.getUserFiles(thisp));
                }else{
                    alert(res.msg);
                }
            },
            error: (err) => {
                thisp.setState({diplomaButton: '上传'});
                console.log(err);
            }
        })
    },

    /**
     * 申请流程阶段，上传VISA
     * */
    uploadVisaFile: (formData, thisp) => () => {
        let url = `/gp/file/addFile`;
        $.ajax({
            url: url,
            type: 'POST',
            data: formData,
            xhrFields: {withCredentials: true},
            processData: false,
            contentType: false,
            success: (res) => {
                console.log(res);
                thisp.setState({visaButton: '上传'});
                if(res.success){
                    alert(res.msg);
                    thisp.setState({visaUploadStatus: 'uploaded'})
                }else{
                    alert(res.msg);
                }
            },
            error: (err) => {
                thisp.setState({visaButton: '上传'});
                console.log(err);
            }
        })
    },


    /*===========================================================================================*/





    /**
     * 请求当前登录顾问的信息，顾问个人中心
     * */
    requestExpertInfo: (thisp) => () => {
        let url = `/gp/expert/expertMessageGet`;
        $.ajax({
            url: url,
            type: 'GET',
            xhrFields: {withCredentials: true,},
            success: (res) => {
                if(res.success){
                    let expertInfo = res.msg;
                    thisp.setState({
                        expertId: expertInfo.expertId,
                        expertName: expertInfo.expertName,
                        expertNickname: expertInfo.expertNickname,
                        expertSex: expertInfo.expertSex == 1 ? '女' : '男',
                        expertAge: expertInfo.expertAge,
                        expertTel: expertInfo.expertTel,
                        expertPwd: expertInfo.expertPwd,
                        expertAvator: expertInfo.expertAvator,
                        expertHeadPicture: expertInfo.expertHeadPicture,
                        expertPictureContent: expertInfo.expertPictureContent,
                        expertLocation: expertInfo.expertLocation,
                        expertEducation: expertInfo.expertEducation,
                        expertCampus: expertInfo.expertCampus,
                        expertCollege: expertInfo.expertCollege,
                        expertEmail: expertInfo.expertEmail,
                        expertMajor: expertInfo.expertMajor,
                        expertAbroadexp: expertInfo.expertAbroadexp,
                        expertAbroadyear: expertInfo.expertAbroadyear,
                        expertStatus: expertInfo.expertStatus,
                        tagList: expertInfo.tagList
                    })
                }
            },
            error: (err) => {
                console.error('err:', err);
            }
        })
    },

    /**
     * 更新顾问的信息，顾问个人中心
     * */
    updateExpertInfo: (formData, thisp) => () => {
        let url = `/gp/expert/expertMessageUpdate`;
        $.ajax({
            url: url,
            type: 'POST',
            data: formData,
            xhrFields: {withCredentials: true,},
            processData: false,
            contentType: false,
            success: (res) => {
                thisp.setState({button: '提交'});
                if(res.success){
                    alert(res.msg);
                    browserHistory.push('/personalCenterExpert/basicInfo');
                }else{
                    thisp.setState({button: '提交'});
                    alert(res.msg);
                }
            },
            error: (err) => {
                thisp.setState({button: '提交'});
                console.error('err', err);
            }
        })
    },

    /**
     * 请求绑定该顾问的所有用户，顾问个人中心
     * */
    requestUsersOfExpert: (thisp) => () => {
        let url = `/gp/expert//findAllUserOfExpert`;
        $.ajax({
            url: url,
            type: 'GET',
            xhrFields: {withCredentials: true,},
            success: (res) => {
               console.log(res);
               thisp.setState({userList: res.userList});
            },
            error: (err) => {
                console.error('err:', err);
            }
        })
    },

    /**
     * 添加回复，顾问个人中心
     * */
    addReply: (data, thisp) => () => {
        let url = `/gp/reply/addReply`;
        $.ajax({
            url: url,
            type: 'POST',
            data: data,
            xhrFields: {withCredentials: true,},
            success: (res) => {
                thisp.setState({button: '提交'});
                console.log(res);
                if(res.success){
                    alert(res.msg);
                }else{
                    alert(res.msg);
                }
            },
            error: (err) => {
                thisp.setState({button: '提交'});
                console.error('err', err);
            }
        })
    },



    /*===========================================================================================*/





    /**
     * 请求所有的顾问的信息，所有通过审核的顾问，找寻顾问
     * */
    getAllExperts: (thisp) => () => {
        let url = `/gp/expert/findAllPassedExpert`;
        $.ajax({
            url: url,
            type: 'GET',
            xhrFields: {withCredentials: true},
            success: (res) => {
                console.log(res);
                thisp.setState({experts: res.expertList});
            },
            error: (err) => {
                console.log(err);
            }
        })
    },

    /**
     * 通过标签获得所有顾问信息，找寻顾问
     * */
    getAllExpertsByTag: (data, thisp) => () => {
        let url = `/gp/expert/findAllPassedExpertByTag`;
        $.ajax({
            url: url,
            type: 'POST',
            data: data,
            xhrFields: {withCredentials: true,},
            success: (res) => {
                if(res.success){
                    thisp.setState({experts: res.msg});
                }else{
                    alert(res.msg);
                }
            },
            error: (err) => {
                console.log('err: ', err);
            }
        })
    },

    /**
     * 根据顾问id请求顾问信息，找寻顾问
     * */
    getExpertInfoById: (data, thisp) => () => {
        let url = `/gp/expert/findExpertMessageByExpertId`;
        $.ajax({
            url: url,
            type: 'POST',
            data: data,
            xhrFields: {withCredentials: true,},
            success: (res) => {
                if(res.isOk){
                    thisp.setState({expert: res.expert});
                }else{
                    alert(res.msg);
                }
            },
            error: (err) => {
                console.log('err: ', err);
            }
        })
    },

    /**
     * 为用户绑定顾问，找寻顾问
     * */
    bindExpert: (data, thisp) => () => {
        let url = `/gp/user/userBindExpert`;
        $.ajax({
            url: url,
            type: 'POST',
            data: data,
            xhrFields: {withCredentials: true,},
            success: (res) => {
                if(res.isOk){
                    alert(res.msg);
                }else{
                    alert(res.msg + '请勿重复绑定！您可以去个人中心页面查看您的顾问！');
                }
            },
            error: (err) => {
                console.log('err: ', err);
            }
        })
    },





    /*===========================================================================================*/


    /**
     * 获取所有通过审核的提问
     * */
    getAllPassedQues: (thisp) => () => {
        let url = `/gp/question/findAllPassedQuestion`;
        $.ajax({
            url: url,
            type: 'GET',
            success: (res) => {
                console.log(res);
                thisp.setState({
                    passedQuestionList: res.passedQuestionList,
                });
            },
            error: (err) => {
                console.error('err: ', err);
            }
        })
    },




    /**
     * 根据标签请求所有的提问，咨询社区
     * */
    getAllQuestionsByTag: (data, thisp) => () => {
        let url = `/gp/question/findAllQuestionByTag`;
        $.ajax({
            url: url,
            type: 'POST',
            data: data,
            xhrFields: {withCredentials: true,},
            success: (res) => {
                console.log(res);
                if(res.success){
                    thisp.setState({passedQuestionList: res.msg});
                }else{
                    alert(res.msg);
                }
            },
            error: (err) => {
                console.log('err: ', err);
            }
        })
    },

    /**
     * 提交问题，咨询社区
     * */
    submitQuestion: (data, thisp) => () => {
        let url = `/gp/question/setQuestion`;
        $.ajax({
            url: url,
            type: 'GET',
            data: data,
            xhrFields: {withCredentials: true,},
            success: (res) => {
                thisp.setState({button: '提交'});
                if(res.success){
                    // alert(res.msg);
                    thisp.setState({isSubmitSuccess: true})
                }else{
                    alert(res.msg);
                }
            },
            error: (err) => {
                thisp.setState({button: '提交'});
                console.log('err: ', err);
            }
        })
    },




    /*===========================================================================================*/





    /**
     * 提交免费评估表，免费评估
     * */
    submitEvaluating: (data, thisp) => () => {
        let url = `/gp/evaluate/userEvaluate`;
        $.ajax({
            url: url,
            type: 'POST',
            data: data,
            xhrFields: {withCredentials: true,},
            success: (res) => {
                thisp.setState({button: '提交评估'});
                if(res.success){
                    alert(res.msg);
                    thisp.setState({isEvaluateSuccess: true})
                }else{
                    alert(res.msg);
                }
            },
            error: (err) => {
                thisp.setState({button: '提交评估'});
                console.error('err:', err);
            }
        });
    },




    /*===========================================================================================*/





    /**
     * 根据评估表得到适合的学校，我要申请
     * */
    findUniversityEvaluate: (thisp) => (dispatch) => {
        let url = `/gp/evaluate/findUniversityEvaluate`;
        $.ajax({
            url: url,
            type: 'GET',
            xhrFields: {withCredentials: true,},
            success: (res) => {
                console.log(res);
                if(res.success){
                    thisp.setState({universityList: res.universityList, recommend: '您适合这些院校'})
                }else{
                    // alert(res.msg);//"无推荐学校！"=======再次请求所有学校接口
                    dispatch(actions.requestAllUniversities(thisp));
                    thisp.setState({recommend: res.msg + '展示最新院校'});
                }
            },
            error: (err) => {
                console.log('err: ', err);
            }
        })
    },

    findGoodsEvaluate: (thisp) => (dispatch) => {
        let url = `/gp/evaluate/findUniversityEvaluate`;
        $.ajax({
            url: url,
            type: 'GET',
            xhrFields: {withCredentials: true,},
            success: (res) => {
                console.log(res);
                /*if(res.success){
                    thisp.setState({universityList: res.universityList, recommend: '您适合这些院校'})
                }else{
                    // alert(res.msg);//"无推荐学校！"=======再次请求所有学校接口
                    dispatch(actions.requestAllUniversities(thisp));
                    thisp.setState({recommend: res.msg + '展示最新院校'});
                }*/
            },
            error: (err) => {
                console.log('err: ', err);
            }
        })
    },

    /**
     * 提交申请表，我要申请
     * */
    submitApply: (data, thisp) => () => {
        let url = `/gp/application/addApplication`;
        $.ajax({
            url: url,
            type: 'POST',
            data: data,
            xhrFields: {withCredentials: true,},
            success: (res) => {
                thisp.setState({button: '提交申请'});
                if(res.success){
                    alert(res.msg);
                    thisp.ajaxSuccess(true);
                }else{
                    alert(res.msg);
                }
            },
            error: (err) => {
                thisp.setState({button: '提交申请'});
                console.error('err:', err);
            }
        });
    },




    /*===========================================================================================*/





    /**
     * 请求所有的学校，澳洲院校库
     * */
    requestAllUniversities: (thisp) => () => {
        let url = `/gp/university/findAllUniversity`;
        $.ajax({
            url: url,
            type: 'GET',
            xhrFields: {withCredentials: true,},
            success: (res) => {
                console.log(res);
                thisp.setState({
                    universityList: res.universityList,
                    loading: '加载完成！暂无数据！'
                });
            },
            error: (err)=> {
                thisp.setState({loading: '加载失败！'});
                console.error('err: ', err);
            }
        })
    },

    /**
    * 根据大学id请求大学信息，澳洲院校库
    * */
    requestUniById: (data, thisp) => () => {
        let url = `/gp/university/findUniversityById`;
        $.ajax({
            url: url,
            type: 'POST',
            data: data,
            xhrFields: {withCredentials: true,},
            success: (res) => {
                console.log(res);
                if(res.success){
                    thisp.setState({university: res.university});
                }else{
                    alert(res.msg);
                }
            },
            error: (err)=> {
                console.error('err: ', err);
            }
        })
    },

    /**
     * 根据地区搜索学校，澳洲院校库
     * */
    requestUniByState: (data, thisp) => () => {
        let url = `/gp/university/findAllUniversityByState`;
        $.ajax({
            url: url,
            type: 'POST',
            data: data,
            xhrFields: {withCredentials: true,},
            success: (res) => {
                thisp.setState({
                    universityList: res.universityList,
                    loading: '加载完成！暂无数据！'
                });
            },
            error: (err)=> {
                thisp.setState({loading: '加载失败！'});
                console.error('err: ', err);
            }
        })
    },

    /**
     * 根据学校ID搜索学院，我要申请
     * */
    requestCollegeByUniId: (data, thisp) => () => {
        let url = `/gp/university/findCollegeByUniversityId`;
        $.ajax({
            url: url,
            type: 'POST',
            data: data,
            xhrFields: {withCredentials: true,},
            success: (res) => {
                console.log(res);
                thisp.setState({collegeList: res.collegeList});
            },
            error: (err) => {
                console.error('err:', err);
            }
        });
    },

    /**
     * 根据学校ID和学院ID搜索专业，我要申请
     * */
    requestMajorByUniAndCollege: (data, thisp) => () => {
        let url = `/gp/university/findMajorByUniversityIdAndCollegeId`;
        $.ajax({
            url: url,
            type: 'POST',
            data: data,
            xhrFields: {withCredentials: true,},
            success: (res) => {
                console.log(res);
                thisp.setState({majorList: res.majorList});
            },
            error: (err) => {
                console.error('err:', err);
            }
        });
    },





    /*===========================================================================================*/

    /**
     * 搜索的状态
     * */
    successSearch: (dataList) => ({
        type: 'SUCCESS_SEARCH',
        dataList
    }),
    failSearch: (errMsg) => ({
        type: 'FAIL_SEARCH',
        errMsg
    }),
    notSearch: () => ({
        type: 'NOT_SEARCH'
    }),

    /**
     * 搜索院校，公共的头部
     * */
    searchUniversitiesByKeyword: (data, thisp) => (dispatch) => {
        let url = `/gp/university/searchUniversity`;
        $.ajax({
            url: url,
            type: 'POST',
            data: data,
            xhrFields: {withCredentials: true,},
            success: (res) => {
                console.log(res);
                if(res.success){
                    alert(res.msg);
                    dispatch(actions.successSearch(res.universityList));
                    browserHistory.push({pathname: '/collegeLibrary'});
                }else{
                    alert(res.msg);
                    dispatch(actions.failSearch(res.msg));
                    browserHistory.push({pathname: '/collegeLibrary'});
                }
            },
            error: (err)=> {
                console.error('err: ', err);
            }
        })
    },

    /**
     * 搜索商城产品，公共的头部
     * */
    searchGoodsByKeyword: (data, thisp) => (dispatch) => {
        let url = `/gp/goods/searchGoods`;
        $.ajax({
            url: url,
            type: 'POST',
            data: data,
            xhrFields: {withCredentials: true,},
            success: (res) => {
                console.log(res);
                if(res.success){
                    alert(res.msg);
                    dispatch(actions.successSearch(res.goodsList));
                    browserHistory.push({pathname: '/studyMall'});
                }else{
                    alert(res.msg);
                    dispatch(actions.failSearch(res.msg));
                    browserHistory.push({pathname: '/studyMall'});
                }
            },
            error: (err)=> {
                console.error('err: ', err);
            }
        })
    },



    /*===========================================================================================*/





    /**
     * 系统管理|用户管理，请求所有用户信息
     * */
    getAllUsers: (thisp) => () => {
        let url = `/gp/user/findAllUser`;
        $.ajax({
            url: url,
            type: 'GET',
            xhrFields: {withCredentials: true},
            success: (res) => {
                let users = res.userList;
                thisp.setState({users: users})
            },
            error: (err) => {
                console.log('err: ', err);
            }
        })
    },

    /**
     * 系统管理|顾问管理，请求所有顾问信息，所有注册的顾问
     * */
    getAllExpertsSys: (thisp) => () => {
        let url = `/gp/expert/findAllExpert`;
        $.ajax({
            url: url,
            type: 'GET',
            xhrFields: {withCredentials: true},
            success: (res) => {
                console.log(res);
                thisp.setState({
                    passExpertList: res.passExpertList,
                    noPassExpertList: res.noPassExpertList
                })
            },
            error: (err) => {
                console.log('err: ', err);
            }
        })
    },

    /**
     * 系统管理|顾问管理，审核顾问的信息，是否有资格成为顾问
     * */
    verifyExpert: (data, thisp) => () => {
        let url = `/gp/expert/verifyExpert`;
        $.ajax({
            url: url,
            type: 'POST',
            data: data,
            xhrFields: {withCredentials: true,},
            success: (res) => {
                console.log(res);
                if(res.success){
                    alert(res.msg);
                    thisp.setState({expert: {
                        expertStatus: 1
                    }});
                    browserHistory.push('/expertManage');
                }else{
                    alert(res.msg);
                }
            },
            error: (err) => {
                // thisp.setState({button: '提交申请'});
                console.error('err:', err);
            }
        });
    },


    /**
     * 请求所有的标签
     * */
    getAllTags: (thisp) => () => {
        let url = `/gp/tag/findAllTag`;
        $.ajax({
            url: url,
            type: 'GET',
            success: (res) => {
                thisp.setState( {tagNames: res.tagList} );
            },
            error: (err)=> {
                console.error('err: ', err);
            }
        })
    },

    /**
     * 系统管理|标签管理，新增标签
     * */
    addTag: (data, thisp) => (dispatch) => {
        let url = `/gp/tag/addTag`;
        $.ajax({
            url: url,
            type: 'POST',
            data: data,
            xhrFields: {withCredentials: true,},
            success: (res) => {
                thisp.setState({button: '提交'});
                if(res.success){
                    alert(res.msg);
                    dispatch(actions.getAllTags(thisp));
                    thisp.setState({display: 'none'});
                }else{
                    alert(res.msg);
                }
            },
            error: (err) => {
                thisp.setState({button: '提交'});
                console.log('err: ', err);
            }
        })
    },

    /**
     * 系统管理|标签管理，删除标签
     * */
    deleteTag: (data, thisp) => (dispatch) => {
        let url = `/gp/tag/deleteTag`;
        $.ajax({
            url: url,
            type: 'POST',
            data: data,
            xhrFields: {withCredentials: true,},
            success: (res) => {
                if(res.success){
                    alert(res.msg);
                    dispatch(actions.getAllTags(thisp));
                }else{
                    alert(res.msg);
                }
            },
            error: (err) => {
                console.log('err: ', err);
            }
        })
    },

    /**
     * 系统管理|申请管理，获取所有申请
     * */
    getAllApplication: (thisp) => () => {
        let url = `/gp/application/findAllApplication`;
        $.ajax({
            url: url,
            type: 'GET',
            xhrFields: {withCredentials: true},
            success: (res) => {
                console.log(res);
                thisp.setState({
                    noVerifyApplicationList: res.noVerifyApplicationList,
                    passApplicationList: res.passApplicationList,
                    noPassApplicationList: res.noPassApplicationList
                });
            },
            error: (err) => {
                console.log(err);
            }
        })
    },

    /**
     * 系统管理|申请管理，审核申请
     * */
    verifyApplication: (data, thisp) => (dispatch) => {
        let url = `/gp/application/verifyApplication`;
        $.ajax({
            url: url,
            type: 'POST',
            data: data,
            xhrFields: {withCredentials: true},
            success: (res) => {
                if(res.success){
                    alert(res.msg);
                    dispatch(actions.getAllApplication(thisp));
                }else{
                    alert(res.msg);
                }
            },
            error: (err) => {
                console.log(err);
            }
        })
    },

    /**
     * 系统管理|院校管理，上传院校图片
     * */
    uploadUniPics: (formData, thisp) => () => {
        let url = `/gp/file/uploadUniversityPicture`;
        $.ajax({
            url: url,
            type: 'POST',
            data: formData,
            xhrFields: {withCredentials: true},
            processData: false,
            contentType: false,
            success: (res) => {
                console.log(res);
                thisp.setState({picButton: '点击上传'});
                if(res.success){
                    alert(res.msg);
                }else{
                    alert(res.msg);
                }
            },
            error: (err) => {
                thisp.setState({picButton: '点击上传'});
                console.log(err);
            }
        })
    },

    /**
     * 系统管理|院校管理，上传院校视频
     * */
    uploadUniVideo: (formData, thisp) => () => {
        let url = `/gp/file/uploadUniversityVideo`;
        $.ajax({
            url: url,
            type: 'POST',
            data: formData,
            xhrFields: {withCredentials: true},
            processData: false,
            contentType: false,
            success: (res) => {
                console.log(res);
                thisp.setState({videoButton: '点击上传'});
                if(res.success){
                    alert(res.msg);
                }else{
                    alert(res.msg);
                }
            },
            error: (err) => {
                thisp.setState({videoButton: '点击上传'});
                console.log(err);
            }
        })
    },

    /**
     * 系统管理|提问管理，获取所有的问题
     * */
    getAllQuestions: (thisp) => () => {
        let url = `/gp/question/findAllQuestion`;
        $.ajax({
            url: url,
            type: 'GET',
            success: (res) => {
                if(res.success){
                    thisp.setState({
                        noVerifyQuestionList: res.noVerifyQuestionList,
                        passedQuestionList: res.passedQuestionList,
                        noPassedQuestionList: res.noPassedQuestionList
                    });
                }
            },
            error: (err) => {
                console.error('err: ', err);
            }
        })
    },

    /**
     * 系统管理|提问管理，审核问题
     * */
    verifyQues: (data, thisp) => (dispatch) => {
        let url = `/gp/question/verifyQuestion`;
        $.ajax({
            url: url,
            type: 'POST',
            data: data,
            xhrFields: {withCredentials: true,},
            success: (res) => {
                if(res.success){
                    alert(res.msg);
                    dispatch(actions.getAllQuestions(thisp));
                }else{
                    alert(res.msg);
                }
            },
            error: (err) => {
                console.log('err: ', err);
            }
        })
    },

    /**
     * 系统管理|文件管理，获取所有的文件
     * */
    getAllFile: (thisp) => () => {
        let url = `/gp/file/findAllFile`;
        $.ajax({
            url: url,
            type: 'GET',
            success: (res) => {
                console.log(res);
                thisp.setState({
                    noVerifyFileList1: res.noVerifyFileList1,
                    noVerifyFileList2: res.noVerifyFileList2,
                    noVerifyFileList3: res.noVerifyFileList3,
                    passFileList1: res.passFileList1,
                    passFileList2: res.passFileList2,
                    passFileList3: res.passFileList3,
                    noPassFileList1: res.noPassFileList1,
                    noPassFileList2: res.noPassFileList2,
                    noPassFileList3: res.noPassFileList3,
                });
            },
            error: (err) => {
                console.error('err: ', err);
            }
        })
    },

    getUserFiles: (thisp) => () => {
        let url = `/gp/file/findUserFile`;
        $.ajax({
            url: url,
            type: 'GET',
            success: (res) => {
                console.log(res);
                thisp.setState({
                    type1FileList: res.type1FileList,
                    type2FileList: res.type2FileList,
                    type3FileList: res.type3FileList
                });
            },
            error: (err) => {
                console.error('err: ', err);
            }
        })
    },

    verifyFile: (data, thisp) => (dispatch) => {
        let url = `/gp/file/verifyFile`;
        $.ajax({
            url: url,
            type: 'POST',
            data: data,
            success: (res) => {
                console.log(res);
                if(res.success){
                    alert(res.msg);
                    dispatch(actions.getAllFile(thisp));
                }else{
                    alert(res.msg);
                }
            },
            error: (err) => {
                console.error('err: ', err);
            }
        })
    },




    /**
     * 系统管理|商品管理，获取所有商品
     * */
    getAllGoods: (thisp) => () => {
        let url = `/gp/goods/findAllGoods`;
        $.ajax({
            url: url,
            type: 'GET',
            xhrFields: {withCredentials: true,},
            success: (res) => {
                thisp.setState({
                    goodsList: res.goodsList,
                    loading: '加载完成！暂无数据！'
                })
            },
            error: (err) => {
                console.log(err);
            }
        })
    },

    searchByGoodsType: (data, thisp) => () => {
        let url = `/gp/goods/findAllGoodsByGoodsType`;
        $.ajax({
            url: url,
            type: 'POST',
            data: data,
            xhrFields: {withCredentials: true,},
            success: (res) => {
                thisp.setState({
                    goodsList: res.goodsList,
                    loading: '加载完成！暂无数据！'
                })
            },
            error: (err) => {
                console.log(err);
            }
        })
    },

    getGoodsById: (data, thisp) => () => {
        let url = `/gp/goods/findGoodsByGoodsId`;
        $.ajax({
            url: url,
            type: 'POST',
            data: data,
            xhrFields: {withCredentials: true},
            success: (res) => {
                console.log(res);
                thisp.setState({goods: res.goods});
            },
            error: (err) => {
                console.log(err);
            }
        })
    },


    addToCart: (data, thisp) => () => {
        let url = `/gp/shoppingCart/addShoppingCart`;
        $.ajax({
            url: url,
            type: 'POST',
            data: data,
            xhrFields: {withCredentials: true},
            success: (res) => {
                if(res.success){
                    alert(res.msg);
                }else{
                    alert(res.msg);
                }
            },
            error: (err) => {
                console.log(err);
            }
        })
    },

    getAllAddress: (thisp) => () => {
        let url = `/gp/address/selectAllAddress`;
        $.ajax({
            url: url,
            type: 'GET',
            xhrFields: {withCredentials: true},
            success: (res) => {
                console.log(res);
                thisp.setState({addressList: res.addressList});
                let addressList = thisp.state.addressList;
                let addressId;
                for(let i = 0, len = addressList.length; i < len; i++){
                    if(addressList[i].addressIsdefault == 1){
                        addressId = addressList[i].addressId;
                        break;
                    }
                }
                thisp.setState({addressId: addressId});
            },
            error: (err) => {
                console.log(err);
            }
        })
    },

    addAddress: (data, thisp) => (dispatch) => {
        let url = `/gp/address/addAddress`;
        $.ajax({
            url: url,
            type: 'POST',
            data: data,
            xhrFields: {withCredentials: true},
            success: (res) => {
                console.log(res);
                if(res.success){
                    alert(res.msg);
                    thisp.setState({addAddress: 'none',button: '提交地址'});
                    dispatch(actions.getAllAddress(thisp));
                }else{
                    thisp.setState({button: '提交地址'});
                    alert(res.msg);
                }
            },
            error: (err) => {
                thisp.setState({button: '提交地址'});
                console.log(err);
            }
        })
    },

    BuyGoods: (data, thisp) => () => {
        let url = `/gp/order/createOrderFromGoods`;
        $.ajax({
            url: url,
            type: 'POST',
            data: data,
            xhrFields: {withCredentials: true},
            success: (res) => {
                console.log(res);
                if(res.success){
                    alert(res.msg);
                }else{
                    alert(res.msg);
                }
            },
            error: (err) => {
                console.log(err);
            }
        })
    },

    /**
     * 系统管理|商品管理，添加商品
     * */
    addGoods: (formData, thisp) => (dispatch) => {
        let url = `/gp/goods/addGoods`;
        $.ajax({
            url: url,
            type: 'POST',
            data: formData,
            xhrFields: {withCredentials: true,},
            processData: false,
            contentType: false,
            success: (res) => {
                console.log(res);
                thisp.setState({button: '提交'});
                if(res.success){
                    alert(res.msg);
                    dispatch(actions.getAllGoods(thisp));
                    thisp.setState({status: 'all_goods'});
                }else{
                    alert(res.msg);
                }
            },
            error: (err) => {
                thisp.setState({button: '提交'});
                console.log(err);
            }
        })
    },

    /**
     * 系统管理|商品管理，根据ID删除商品
     * */
    deleteGoodsById: (data, thisp) => (dispatch) => {
        let url = `/gp/goods/deleteGoodsByGoodsId`;
        $.ajax({
            url: url,
            type: 'POST',
            data: data,
            xhrFields: {withCredentials: true},
            success: (res) => {
                console.log(res);
                if(res.success){
                    alert(res.msg);
                    dispatch(actions.getAllGoods(thisp));
                }else{
                    alert(res.msg);
                }
            },
            error: (err) => {
                console.log(err);
            }
        })
    },

    /**
     * 系统管理|商品管理，根据ID批量删除商品
     * */
    deleteGoodsBatch: (data, thisp) => (dispatch) => {
        let url = `/gp/goods/deleteBatchGoods`;
        $.ajax({
            url: url,
            type: 'POST',
            data: data,
            xhrFields: {withCredentials: true},
            success: (res) => {
                console.log(res);
                if(res.success){
                    alert(res.msg);
                    dispatch(actions.getAllGoods(thisp));
                }
            },
            error: (err) => {
                console.log(err);
            }
        })
    },



};
export default actions;




/*
export default (_ID) => {
    var action = {};
    var arr = [
        'sign_in_success',//登陆成功
        'sign_out',//退出登陆
        'set_state',//设置状态
    ];

    for(let i = 0; i < arr.length; i++){
        action[arr[i]] = (target) => {
            return {
                _ID: _ID,
                target: target,
                type: arr[i]
            }
        }
    }

    return action;
}*/
