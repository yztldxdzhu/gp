import React, {Component} from 'react';
import { connect } from 'react-redux';
import styles from '../../public/styles/user/college.css';

class CollegeDetail extends Component{
    constructor(props){
        super(props);
        this.state = {
            university: {
                collegeList: []
            },
            status: 'desc',
            collegeId: 0,
        };
    }
    componentDidMount(){
        let { dispatch, actions, universityId } = this.props;
        let data = {};
        data.universityId = universityId;
        dispatch(actions.requestUniById(data, this));
    }
    render(){
        return (
            <div className={styles.college_infos} style={{marginTop: '145px'}}>
                <ul className={styles.college_condi}>
                    <li
                        id="desc"
                        onClick={(e) => {this.setState({status: e.target.id})}}
                        style={{backgroundColor: this.state.status == 'desc' ? '#a22020' : '#ffffff'}}>院校描述</li>
                    <li
                        id="major"
                        onClick={(e) => {this.setState({status: e.target.id})}}
                        style={{backgroundColor: this.state.status == 'major' ? '#a22020' : '#ffffff'}}>专业详情</li>
                    <li
                        id="scene"
                        onClick={(e) => {this.setState({status: e.target.id})}}
                        style={{backgroundColor: this.state.status == 'scene' ? '#a22020' : '#ffffff'}}>校园风光</li>
                </ul>

                <div className={styles.college_detail} style={{display: this.state.status == "desc" ? 'block' : 'none'}}>
                    <h2 className={styles.college_name}>
                        {this.state.university.universityName}
                        <small>{this.state.university.universityEnname}</small>
                        <a href={this.state.university.universityUrl}>学校官网</a>
                    </h2>
                    <div dangerouslySetInnerHTML={{__html: this.state.university.universityDescription}} />
                </div>


                {this.state.university.collegeList == null ? (
                        <h2 style={{textAlign: "center"}}>暂无数据</h2>
                    ) : (
                        <div className={styles.school_major} style={{display: this.state.status == "major" ? 'block' : 'none'}}>
                            {this.state.university.collegeList.map((college, i) => {
                                return(
                                    <span
                                        style={{backgroundColor: this.state.collegeId == college.collegeId ? 'yellow' : '#ccc'}}
                                        className={styles.college}
                                        key={i}
                                        id={college.collegeId}
                                        onClick={(e) => {this.setState({collegeId: e.target.id})}}
                                    >
                                        {college.collegeName}

                                        {college.majorList == null ? (<span style={{textAlign: "center"}}>暂无数据</span>) : (
                                                <span className={styles.major_all}>
                                                    {college.majorList.map((major, i) => {
                                                        return(
                                                            <span
                                                                style={{display: this.state.collegeId == college.collegeId ? 'block' : 'none'}}
                                                                className={styles.major_each}
                                                                key={i}
                                                            >
                                                                {major.majorName}
                                                                </span>
                                                        )
                                                    })}
                                                </span>
                                            )}
                                    </span>
                                )
                            })}
                        </div>
                    )}


                <div className={styles.school_scene} style={{display: this.state.status == "scene" ? 'block' : 'none'}}>
                    {this.state.university.universityVideo == null ? (
                            <h2 style={{textAlign: "center"}}>暂无视频数据，请上传</h2>
                        ) : (
                            <div className={styles.scene_video}>
                                <video src={"/gp/" + this.state.university.universityVideo} controls="controls">
                                    您的浏览器不支持 video 标签。
                                </video>
                            </div>
                        )}
                    {this.state.university.universitypictureList == null ? (
                            <h2 style={{textAlign: "center"}}>暂无图片数据，请上传</h2>
                        ) : (
                            <div className={styles.scene_pics}>
                                {this.state.university.universitypictureList.map((pic, i)=>{
                                    return(<img src={"/gp/" + pic.universitypictureUrl} alt="校园图片展示" key={i}/>)
                                })}
                            </div>
                        )}
                </div>


            </div>
        )
    }
}
let mapStateToProps = (state) => {
    return { state: state }
};
export default connect(mapStateToProps)(CollegeDetail);