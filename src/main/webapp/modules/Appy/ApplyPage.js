import React, {Component} from 'react';
import { IndexLink } from 'react-router';
import actions from '../../actions/action';
import NavLink from '../Common/NavLink';
import CommonHeaderComponent from '../Common/CommonHeaderPage';
import CommonFooterComponent from '../Common/CommonFooterPage';
import EvaluateUnisSuit from './EvaluateUnisSuit';
import EvaluatingGoodsSuit from './EvaluatingGoodsSuit';
import ApplyForm from './ApplyForm';
import styles from '../../public/styles/user/apply.css';

class ApplyComponent extends Component{
    render(){
        return (
            <div style={{minWidth:'860px', paddingTop: '30px'}}>
                <CommonHeaderComponent />
                <ApplyBody />
                <CommonFooterComponent />
            </div>
        );
    }
}

class ApplyBody extends Component{
    constructor(props){
        super(props);
        this.state = {
            isApplySuccess: false
        };
        this.changeApplyState = this.changeApplyState.bind(this);
    }
    changeApplyState(value){
        this.setState({isApplySuccess: value})
    }
    render(){
        return (
            <div style={{position: 'relative', marginTop: '145px'}} >
                <ApplyShow isApplySuccess={this.state.isApplySuccess}/>
                <ApplyForm actions={actions} changeApplyState={this.changeApplyState}/>
            </div>
        );
    }
}

class ApplyShow extends Component{
    render(){
        let infoTip = this.props.isApplySuccess ? (
                <p className={styles.apply_show_title}>
                    尊敬的客户您好！您的申请已经提交，正在进行审核，您可以在
                    <NavLink to="/personalCenter/myApply">
                        个人中心页面
                    </NavLink>
                    查看进度！
                </p>
            ) : (
                <p className={styles.apply_show_title}>
                    尊敬的客户您好！请您填写右方申请表进行留学申请！
                </p>
            );
        return (
            <div className={styles.apply_show}>

                {infoTip}

                <EvaluateUnisSuit actions={actions}/>

                <EvaluatingGoodsSuit actions={actions}/>

            </div>
        );
    }
}

export default ApplyComponent;