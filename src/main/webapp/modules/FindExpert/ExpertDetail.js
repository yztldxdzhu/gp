import React, {Component} from 'react';
import { IndexLink } from 'react-router';
import { connect } from 'react-redux';
import styles from '../../public/styles/user/expert.css';
import expertPic from '../../public/images/expert.jpg';

class ExpertDetail extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            expert: {
                tagList: []
            }
        };
        this.bindExpert = this.bindExpert.bind(this);
    }
    componentDidMount(){
        let { dispatch, actions, expertId } = this.props;
        let data = {};
        data.expertId = expertId;
        dispatch(actions.getExpertInfoById(data, this));
     }
    bindExpert(){
        let { dispatch, actions, expertId } = this.props;
        let data = {};
        data.expertId = expertId;
        dispatch(actions.bindExpert(data, this));
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
        return (
            <div className={styles.expert_detail} style={{marginTop: '145px'}}>

                <div className={styles.expert_img}>
                    <img src={expertPic} alt="专家详情"/>
                </div>

                <div className={styles.expert_right}>

                    <p>
                        <span>顾问姓名：</span>
                        <span>{this.state.expert.expertName ? this.state.expert.expertName : '无'}</span>
                    </p>
                    <p>
                        <span>顾问昵称：</span>
                        <span>{this.state.expert.expertNickname ? this.state.expert.expertNickname : '无'}</span>
                    </p>
                    <p>
                        <span>顾问电话：</span>
                        <span>{this.state.expert.expertTel ? this.state.expert.expertTel : '无'}</span>
                    </p>
                    <p>
                        <span>顾问年龄：</span>
                        <span>{this.state.expert.expertAge ? this.state.expert.expertAge : '无'}</span>
                    </p>
                    <p>
                        <span>顾问性别：</span>
                        <span>{expertSex}</span>
                    </p>
                    <p>
                        <span>顾问学历：</span>
                        <span>{this.state.expert.expertEducation ? this.state.expert.expertEducation : '无'}</span>
                    </p>
                    <p>
                        <span>顾问学校：</span>
                        <span>{this.state.expert.expertCampus ? this.state.expert.expertCampus : '无'}</span>
                    </p>
                    <p>
                        <span>顾问学院：</span>
                        <span>{this.state.expert.expertCollege ? this.state.expert.expertCollege : '无'}</span>
                    </p>
                    <p>
                        <span>顾问专业：</span>
                        <span>{this.state.expert.expertMajor ? this.state.expert.expertMajor : '无'}</span>
                    </p>
                    <p>
                        <span>所在地：</span>
                        <span>{this.state.expert.expertLocation ? this.state.expert.expertLocation : '无'}</span>
                    </p>
                    <p>
                        <span>顾问邮箱：</span>
                        <span>{this.state.expert.expertEmail ? this.state.expert.expertEmail : '无'}</span>
                    </p>
                    <p>
                        <span>留学年数：</span>
                        <span>{this.state.expert.expertAbroadyear ? this.state.expert.expertAbroadyear : '无'}</span>
                    </p>
                    <p>
                        <span>留学经验：</span>
                        <span>{this.state.expert.expertAbroadexp ? this.state.expert.expertAbroadexp : '无'}</span>
                    </p>
                    <p>
                        <span>标签：</span>
                        {this.state.expert.tagList.length == 0 ? (<span>无标签</span>) : this.state.expert.tagList.map( (tag, i) => {
                                return (
                                    <span key={i}>
                                        {tag.tagContent + ','}
                                    </span>)
                            } )}

                    </p>

                    <p>
                        <span>他的成功案例：</span>
                        <span>{this.state.expert.expertName ? this.state.expert.expertName : '无'}</span>
                    </p>

                    <p className={styles.advisor_them} onClick={this.bindExpert}>请他作为我的顾问</p>
                </div>
            </div>
        )
    }
}
let mapStateToProps = (state) => {
    return { state: state }
};
export default connect(mapStateToProps)(ExpertDetail);