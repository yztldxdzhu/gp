import React, {Component} from 'react';
import $ from 'jquery';
import NavLink  from '../Common/NavLink';
import FileUpload from '../Common/CommonComponent';
import styles from '../../public/styles/user/myInfo.css';


class ConditionalOffer extends Component{
    render(){
        return(
            <div>
                <p className={styles.the_header}>您的材料正在审核，请耐心等候...</p>
                <img src="" alt="ConditionalOffer"/>
            </div>
        )
    }
}

class COE extends Component{
    render(){
        return(
            <div>
                <p className={styles.the_header}>您的材料正在审核，请耐心等候...</p>
                <img src="" alt="COE"/>
            </div>
        )
    }
}

class Visa extends Component{
    render(){
        return (
            <div>
                <p className={styles.the_header}>您的材料正在审核中...</p>
                <img src="" alt="Visa"/>
            </div>
        )
    }
}
class Offer extends Component{
    render(){
        return (
            <div>
                <p className={styles.the_header}>您的材料正在审核中...</p>
                <img src="" alt="Offer"/>
            </div>
        )
    }
}
class Guidance extends Component{
    render(){
        return (
            <div>
                <p className={styles.the_header}>展示行前的指导信息。</p>
            </div>
        )
    }
}
class In extends Component{
    render(){
        return (
            <div>
                <p className={styles.the_header}>请上传反馈！</p>
                <form className={styles.the_form_right}>
                    <FileUpload content="请选择入境图片一张上传"/>
                    <textarea className={styles.the_desc} name="description" defaultValue="请输入您的评价" />
                    <input className={styles.the_btn} type="button" value="提交"/>
                </form>
            </div>
        )
    }
}