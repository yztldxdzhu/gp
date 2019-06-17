import React, {Component} from 'react';
import { IndexLink } from 'react-router';
import { connect } from 'react-redux';
import NavLink from '../Common/NavLink';
import styles from '../../public/styles/user/successCases.css';
import successCase from '../../public/images/successcase.png';

class SuccessCases extends Component{
    render(){
        return (
            <div className={styles.category} style={{marginTop: '145px'}}>
                <div className={styles.category_each}>
                    <span>目标</span>
                    <ul>
                        <li>全部</li>
                        <li>研究生</li>
                        <li>本科</li>
                        <li>高中</li>
                    </ul>
                </div>

                <div className={styles.category_each}>
                    <span>地区</span>
                    <ul>
                        <li>全部</li>
                        <li>新南威尔斯州</li>
                        <li>昆士兰州</li>
                        <li>南澳洲</li>
                        <li>塔斯马尼亚州</li>
                        <li>维多利亚州</li>
                        <li>西澳洲</li>
                        <li>澳洲首都区</li>
                        <li>北领地</li>
                    </ul>
                </div>

                <div className={styles.category_each_last}>
                    <ul>
                        <li>最新案例</li>
                        <li>最热案例</li>
                        <li>经典案例</li>
                        <li>
                            <input type="text" className={styles.search_text}/>
                            <input type="button" className={styles.search_btn}/>
                        </li>
                    </ul>
                </div>

                <div className={styles.success_case_each}>
                    <NavLink to="/successCase/case">
                        <img src={successCase} alt="成功案例展示"/>
                    </NavLink>
                    <div className={styles.success_case_each_desc}>
                        <p className={styles.success_case_name}>郭同学</p>
                        <p className={styles.success_case_school}>墨尔本大学</p>
                        <p className={styles.success_case_speak}>Offer下来的非常快，合作很愉快</p>
                        <p className={styles.success_case_locate}>安徽省，合肥市</p>
                    </div>
                </div>

                <div className={styles.success_case_each}>
                    <NavLink to="/successCase/case">
                        <img src={successCase} alt="成功案例展示"/>
                    </NavLink>
                    <div className={styles.success_case_each_desc}>
                        <p className={styles.success_case_name}>郭同学</p>
                        <p className={styles.success_case_school}>墨尔本大学</p>
                        <p className={styles.success_case_speak}>Offer下来的非常快，合作很愉快</p>
                        <p className={styles.success_case_locate}>安徽省，合肥市</p>
                    </div>
                </div>

                <div className={styles.success_case_each}>
                    <NavLink to="/successCase/case">
                        <img src={successCase} alt="成功案例展示"/>
                    </NavLink>
                    <div className={styles.success_case_each_desc}>
                        <p className={styles.success_case_name}>郭同学</p>
                        <p className={styles.success_case_school}>墨尔本大学</p>
                        <p className={styles.success_case_speak}>Offer下来的非常快，合作很愉快</p>
                        <p className={styles.success_case_locate}>安徽省，合肥市</p>
                    </div>
                </div>

                <div className={styles.success_case_each}>
                    <NavLink to="/successCase/case">
                        <img src={successCase} alt="成功案例展示"/>
                    </NavLink>
                    <div className={styles.success_case_each_desc}>
                        <p className={styles.success_case_name}>郭同学</p>
                        <p className={styles.success_case_school}>墨尔本大学</p>
                        <p className={styles.success_case_speak}>Offer下来的非常快，合作很愉快</p>
                        <p className={styles.success_case_locate}>安徽省，合肥市</p>
                    </div>
                </div>

                <div className={styles.success_case_each}>
                    <NavLink to="/successCase/case">
                        <img src={successCase} alt="成功案例展示"/>
                    </NavLink>
                    <div className={styles.success_case_each_desc}>
                        <p className={styles.success_case_name}>郭同学</p>
                        <p className={styles.success_case_school}>墨尔本大学</p>
                        <p className={styles.success_case_speak}>Offer下来的非常快，合作很愉快</p>
                        <p className={styles.success_case_locate}>安徽省，合肥市</p>
                    </div>
                </div>

                <div className={styles.success_case_each}>
                    <NavLink to="/successCase/case">
                        <img src={successCase} alt="成功案例展示"/>
                    </NavLink>
                    <div className={styles.success_case_each_desc}>
                        <p className={styles.success_case_name}>郭同学</p>
                        <p className={styles.success_case_school}>墨尔本大学</p>
                        <p className={styles.success_case_speak}>Offer下来的非常快，合作很愉快</p>
                        <p className={styles.success_case_locate}>安徽省，合肥市</p>
                    </div>
                </div>

                <div className={styles.success_case_each}>
                    <NavLink to="/successCase/case">
                        <img src={successCase} alt="成功案例展示"/>
                    </NavLink>
                    <div className={styles.success_case_each_desc}>
                        <p className={styles.success_case_name}>郭同学</p>
                        <p className={styles.success_case_school}>墨尔本大学</p>
                        <p className={styles.success_case_speak}>Offer下来的非常快，合作很愉快</p>
                        <p className={styles.success_case_locate}>安徽省，合肥市</p>
                    </div>
                </div>

                <div className={styles.success_case_each}>
                    <NavLink to="/successCase/case">
                        <img src={successCase} alt="成功案例展示"/>
                    </NavLink>
                    <div className={styles.success_case_each_desc}>
                        <p className={styles.success_case_name}>郭同学</p>
                        <p className={styles.success_case_school}>墨尔本大学</p>
                        <p className={styles.success_case_speak}>Offer下来的非常快，合作很愉快</p>
                        <p className={styles.success_case_locate}>安徽省，合肥市</p>
                    </div>
                </div>
            </div>
        );
    }
}
let mapStateToProps = (state) => {
    return { state: state }
};
export default connect(mapStateToProps)(SuccessCases);