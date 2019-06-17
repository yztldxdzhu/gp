import React, {Component} from 'react';
import { IndexLink } from 'react-router';
import { connect } from 'react-redux';
import styles from '../../public/styles/user/case.css';
import successCase from '../../public/images/successcase.png';

class CaseDetail extends Component{
    render(){
        return (
            <div className={styles.case_detail} style={{marginTop: '145px'}}>

                <div className={styles.case_offer_img}>
                    <img src={successCase} alt="商品详情"/>
                </div>

                <div className={styles.case_right}>

                    <p>
                        <span>姓名：</span>
                        <span>郭艳泓</span>
                    </p>
                    <p>
                        <span>目标学历：</span>
                        <span>研究生</span>
                    </p>
                    <p>
                        <span>申请学校：</span>
                        <span>墨尔本大学</span>
                    </p>
                    <p>
                        <span>申请专业：</span>
                        <span>CS</span>
                    </p>

                    <p>
                        <span>当前学历：</span>
                        <span>本科</span>
                    </p>
                    <p>
                        <span>毕业院校：</span>
                        <span>合肥工业大学</span>
                    </p>
                    <p>
                        <span>当前专业：</span>
                        <span>数学</span>
                    </p>
                    <p>
                        <span>GPA：</span>
                        <span>0.0</span>
                    </p>
                    <p>
                        <span>所在地：</span>
                        <span>安徽省，合肥市</span>
                    </p>
                    <p>
                        <span>申请启动日期：</span>
                        <span>2016-11-08</span>
                    </p>
                    <p>
                        <span>展获Offer日期：</span>
                        <span>2017-01-09</span>
                    </p>
                    <p>
                        <span>评价：</span>
                        <span>Offer下来的非常快，合作很愉快！</span>
                    </p>

                    <p className={styles.ask_them}>向他咨询</p>
                </div>
            </div>
        )
    }
}
let mapStateToProps = (state) => {
    return { state: state }
};
export default connect(mapStateToProps)(CaseDetail);