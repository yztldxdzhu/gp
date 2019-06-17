import React from 'react';
import { Router, Route, IndexRoute, browserHistory, hashHistory } from 'react-router';

import App from '../modules/App';
import Home from '../modules/Home/HomePage';

import Register from '../modules/LoginAndRegisterPages/RegisterPage';
import UserReg from '../modules/LoginAndRegisterPages/RegisterUser';
import ExpertReg from '../modules/LoginAndRegisterPages/RegisterExpert';
import Login from '../modules/LoginAndRegisterPages/LoginPage';
import FindPassword from '../modules/LoginAndRegisterPages/FindPasswordPage';

import IWillApply from '../modules/Appy/ApplyPage';

import FreeEvaluating from '../modules/Appy/FreeEvaluatingPage';

import StudyMallPage from '../modules/StudyMall/StudyMallPage';
import GoodsDetailPage from '../modules/StudyMall/GoodsDetailPage';
import BuyPage from '../modules/StudyMall/BuyPage';

import CollegeLibrary from '../modules/University/CollegeLibraryPage';
import College from '../modules/University/CollegePage';

import SuccessCasesPage from '../modules/SuccessCase/SuccessCasesPage';
import CasePage from '../modules/SuccessCase/CasePage';

import Advisory from '../modules/Advisory/AdvisoryPage';
import Ask from '../modules/Advisory/AskPage';

import Experts from '../modules/FindExpert/ExpertsPage';
import Expert from '../modules/FindExpert/ExpertPage';

import PersonalCenterUser from '../modules/PersonalCenterUser/PersonalCenterPage';
import UserInfo from '../modules/PersonalCenterUser/InfoRight';
import ApplyProgress from '../modules/Progress/ApplyProgressPage';

import PersonalCenterExpert from '../modules/PersonalCenterExpert/PersonalCenterPage';
import ExpertInfo from '../modules/PersonalCenterExpert/ExpertInfo';


// import Gallary from '../modules/Gallary';


import UserManage from '../modules/System/UserManage';
import ExpertManage from '../modules/System/ExpertManage';
import ExpertCheckManage from '../modules/System/ExpertCheckManage';
import QuesManage from '../modules/System/QuesManage';
import TagManage from '../modules/System/TagManage';
import ApplyManage from '../modules/System/ApplyManage';
import FileManage from '../modules/System/FileManage';
import SchoolManage from '../modules/System/SchoolManage';
import SchoolDetailsManage from '../modules/System/SchoolDetailsManage';
import GoodsManage from '../modules/System/GoodsManage';


const routes = (
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={Home}/>

            <Route path="/register" component={Register}/>
            <Route path="/userReg" component={UserReg}/>
            <Route path="/expertReg" components={ExpertReg}/>
            <Route path="/login" component={Login}/>
            <Route path="/findpwd" component={FindPassword}/>

            <Route path="/apply" component={IWillApply}/>

            <Route path="/freeEvaluating" component={FreeEvaluating}/>

            <Route path="/studyMall" component={StudyMallPage}/>
            <Route path="/studyMall/goods" component={GoodsDetailPage}/>
            <Route path="/studyMall/buy" component={BuyPage}/>

            <Route path="/collegeLibrary" component={CollegeLibrary}/>
            <Route path="/collegeLibrary/college" component={College}/>

            <Route path="/successCase" component={SuccessCasesPage}/>
            <Route path="/successCase/case" component={CasePage}/>

            <Route path="/advisories" component={Advisory}/>
            <Route path="/advisories/ask" component={Ask}/>

            <Route path="/experts" component={Experts}/>
            <Route path="/experts/expert" components={Expert}/>

            <Route path="/personalCenter" component={PersonalCenterUser}>
                <Route path="/personalCenter/:personalCenter" component={UserInfo}/>
            </Route>
            <Route path="/myProgress" component={ApplyProgress}/>

            <Route path="/personalCenterExpert" component={PersonalCenterExpert}>
                <Route path="/personalCenterExpert/:personalCenterExpert" component={ExpertInfo}/>
            </Route>

            {/*<Route path="/gallary" components={Gallary}/>*/}

            <Route path="/userManage" component={UserManage}/>
            <Route path="/expertManage" component={ExpertManage}/>
            <Route path="/expertManage/expertCheck" component={ExpertCheckManage}/>
            <Route path="/quesManage" component={QuesManage}/>
            <Route path="/tagManage" components={TagManage}/>
            <Route path="/applyManage" components={ApplyManage}/>
            <Route path="/fileManage" components={FileManage}/>
            <Route path="/schoolManage" component={SchoolManage}/>
            <Route path="/schoolManage/schoolDetail" component={SchoolDetailsManage}/>
            <Route path="/goodsManage" component={GoodsManage}/>

        </Route>
    </Router>
);
export default routes;