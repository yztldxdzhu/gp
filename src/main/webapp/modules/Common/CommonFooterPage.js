import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { Router, IndexLink } from 'react-router';
import { connect } from 'react-redux';

import action from '../../actions/action';

import NavLink from './NavLink';

import styles from '../../public/styles/user/common.css';

import logo from '../../public/images/azlx1.jpg';
import weibo from '../../public/images/wb.png';
import gzh from '../../public/images/gzh.jpg';
import qq from '../../public/images/qq.png';


class CommonFooterComponent extends Component{
    render(){
        return (
            <footer>
                <div className={styles.footer_left}>
                    <img
                        src={logo}
                        alt='Study in Australia'
                        width='70px'
                        height='46px'/>
                    <span>澳洲留学</span>
                </div>
                <div className={styles.footer_center}>
                    <img src={weibo} width='78px' height='78px' alt="新浪微博" title="扫一扫，关注我的新浪微博"/>
                    <img src={gzh} width='78px' height='78px' alt="微信公众号" title="扫一扫，关注我的微信公众号"/>
                    <img src={qq} width='78px' height='78px' alt="QQ号" title="扫一扫，加我QQ"/>
                    <span>Copyright ©2017-2027 澳洲留学 | 郭艳泓 版权所有</span>
                </div>
                <div className={styles.footer_right}>
                    <p>服务热线：</p>
                    <span>(+86)15555483693</span>
                    <p>投诉邮箱：562806487@qq.com</p>
                </div>
            </footer>
        )
    }
}

export default CommonFooterComponent;