import React, {Component} from 'react';
import { connect } from 'react-redux';
import styles from '../../public/styles/system/manage.css';

class ExpertCheckInfo extends Component{
    constructor(props){
        super(props);
        this.state = {
            expert: {
                tagList: []
            }
        };
        this.checkOk = this.checkOk.bind(this);
        this.checkNotOk = this.checkNotOk.bind(this);
    }
    componentDidMount(){
        let { dispatch, actions, expertId } = this.props;
        let data = {};
        data.expertId = expertId;
        dispatch(actions.getExpertInfoById(data, this));
    }
    checkOk(){
        let { dispatch, actions, expertId } = this.props;
        let data = {};
        data.expertId = expertId;
        data.expertStatus = 1;
        dispatch(actions.verifyExpert(data, this));
    }
    checkNotOk(){
        alert('请注意，未通过审核的顾问将被注销账户！');
        let { dispatch, actions, expertId } = this.props;
        let data = {};
        data.expertId = expertId;
        dispatch(actions.logoff(data));
    }
    render(){
        let expertSex = this.state.expert.expertSex;
        if(expertSex == 0){
            expertSex = '男';
        }else if(expertSex == 1){
            expertSex = '女';
        }else{
            expertSex = '无';
        }
        let expertStatus = this.state.expert.expertStatus;
        if(expertStatus == 0){
            expertStatus = '未审核';
        }else{
            expertStatus = '通过审核';
        }
        return (
            <div className={styles.the_right}>
                <ul className={styles.the_right_ul}>
                    <li><span>顾问姓名：</span>{this.state.expert.expertName}</li>
                    <li><span>顾问电话：</span>{this.state.expert.expertTel}</li>
                    <li><span>顾问昵称：</span>{this.state.expert.expertNickname}</li>
                    <li><span>顾问性别：</span>{expertSex}</li>
                    <li><span>顾问年龄：</span>{this.state.expert.expertAge}</li>
                    <li><span>顾问学历：</span>{this.state.expert.expertEducation}</li>
                    <li><span>顾问学校：</span>{this.state.expert.expertCampus}</li>
                    <li><span>顾问学院：</span>{this.state.expert.expertCollege}</li>
                    <li><span>顾问专业：</span>{this.state.expert.expertMajor}</li>
                    <li><span>顾问邮箱：</span>{this.state.expert.expertEmail}</li>
                    <li><span>顾问地址：</span>{this.state.expert.expertLocation}</li>
                    <li><span>留学年数：</span>{this.state.expert.expertAbroadyear}</li>
                    <li><span>留学经验：</span>{this.state.expert.expertAbroadexp}</li>
                    <li><span>审核状态：</span>{expertStatus}</li>
                </ul>

                {expertStatus == '未审核' ? (
                        <div className={styles.expert_check_btn}>
                            <button onClick={this.checkOk}>审核通过</button>
                            <button onClick={this.checkNotOk}>审核不通过</button>
                        </div>
                    ): (
                        ''
                    )}
            </div>
        )
    }
}
let mapStateToProps = (state) => {
    return { state: state }
};
export default connect(mapStateToProps)(ExpertCheckInfo);