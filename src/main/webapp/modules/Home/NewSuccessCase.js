import React, {Component} from 'react';
import { IndexLink } from 'react-router';
import NavLink from '../Common/NavLink';
import styles from '../../public/styles/user/home.css';
import successCase from '../../public/images/successcase.png';

class NewSuccessCase extends Component{
    render(){
        return (
            <div className={styles.success_case}>
                <NavLink to="/successCase">
                    <small>展示更多案例</small>
                </NavLink>

                <h3 className={styles.success_case_title}>最新成功案例展示</h3>


                <div className={styles.success_case_show}>

                    <span className={styles.success_case_each}>
                        <img src={successCase} alt="成功案例展示"/>
                        <NavLink to="/successCase/case">
                            <span className={styles.success_case_mask}>
                                <span className={styles.success_case_mask_name}>郭同学</span>
                                <span className={styles.success_case_mask_school}>墨尔本大学</span>
                                <span className={styles.success_case_mask_speak}>Offer下来的非常快，合作很愉快</span>
                                <span className={styles.success_case_mask_locate}>安徽省，合肥市</span>
                            </span>
                        </NavLink>
                    </span>

                    <span className={styles.success_case_each}>
                        <img src={successCase} alt="成功案例展示"/>
                        <NavLink to="/successCase/case">
                            <span className={styles.success_case_mask}>
                                <span className={styles.success_case_mask_name}>郭同学</span>
                                <span className={styles.success_case_mask_school}>墨尔本大学</span>
                                <span className={styles.success_case_mask_speak}>Offer下来的非常快，合作很愉快</span>
                                <span className={styles.success_case_mask_locate}>安徽省，合肥市</span>
                            </span>
                        </NavLink>
                    </span>

                    <span className={styles.success_case_each}>
                        <img src={successCase} alt="成功案例展示"/>
                        <NavLink to="/successCase/case">
                            <span className={styles.success_case_mask}>
                                <span className={styles.success_case_mask_name}>郭同学</span>
                                <span className={styles.success_case_mask_school}>墨尔本大学</span>
                                <span className={styles.success_case_mask_speak}>Offer下来的非常快，合作很愉快</span>
                                <span className={styles.success_case_mask_locate}>安徽省，合肥市</span>
                            </span>
                        </NavLink>
                    </span>

                    <span className={styles.success_case_each}>
                        <img src={successCase} alt="成功案例展示"/>
                        <NavLink to="/successCase/case">
                            <span className={styles.success_case_mask}>
                                <span className={styles.success_case_mask_name}>郭同学</span>
                                <span className={styles.success_case_mask_school}>墨尔本大学</span>
                                <span className={styles.success_case_mask_speak}>Offer下来的非常快，合作很愉快</span>
                                <span className={styles.success_case_mask_locate}>安徽省，合肥市</span>
                            </span>
                        </NavLink>
                    </span>

                    <span className={styles.success_case_each}>
                        <img src={successCase} alt="成功案例展示"/>
                        <NavLink to="/successCase/case">
                            <span className={styles.success_case_mask}>
                                <span className={styles.success_case_mask_name}>郭同学</span>
                                <span className={styles.success_case_mask_school}>墨尔本大学</span>
                                <span className={styles.success_case_mask_speak}>Offer下来的非常快，合作很愉快</span>
                                <span className={styles.success_case_mask_locate}>安徽省，合肥市</span>
                            </span>
                        </NavLink>
                    </span>

                    <span className={styles.success_case_each}>
                        <img src={successCase} alt="成功案例展示"/>
                        <NavLink to="/successCase/case">
                            <span className={styles.success_case_mask}>
                                <span className={styles.success_case_mask_name}>郭同学</span>
                                <span className={styles.success_case_mask_school}>墨尔本大学</span>
                                <span className={styles.success_case_mask_speak}>Offer下来的非常快，合作很愉快</span>
                                <span className={styles.success_case_mask_locate}>安徽省，合肥市</span>
                            </span>
                        </NavLink>
                    </span>

                    <span className={styles.success_case_each}>
                        <img src={successCase} alt="成功案例展示"/>
                        <NavLink to="/successCase/case">
                            <span className={styles.success_case_mask}>
                                <span className={styles.success_case_mask_name}>郭同学</span>
                                <span className={styles.success_case_mask_school}>墨尔本大学</span>
                                <span className={styles.success_case_mask_speak}>Offer下来的非常快，合作很愉快</span>
                                <span className={styles.success_case_mask_locate}>安徽省，合肥市</span>
                            </span>
                        </NavLink>
                    </span>

                    <span className={styles.success_case_each}>
                        <img src={successCase} alt="成功案例展示"/>
                        <NavLink to="/successCase/case">
                            <span className={styles.success_case_mask}>
                                <span className={styles.success_case_mask_name}>郭同学</span>
                                <span className={styles.success_case_mask_school}>墨尔本大学</span>
                                <span className={styles.success_case_mask_speak}>Offer下来的非常快，合作很愉快</span>
                                <span className={styles.success_case_mask_locate}>安徽省，合肥市</span>
                            </span>
                        </NavLink>
                    </span>
                </div>
            </div>
        )
    }
}
export default NewSuccessCase;