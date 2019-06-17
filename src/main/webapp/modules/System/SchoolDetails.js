import React, {Component} from 'react';
import { connect } from 'react-redux';
import { FileUpload } from '../../modules/Common/CommonComponent';
import styles from '../../public/styles/system/manage.css';

class SchoolDetails extends Component{
    constructor(props){
        super(props);
        this.state = {
            university: {
                collegeList: []
            },
            status: 'desc',
            collegeId: 0,

            picButton: '点击上传',
            fileValue: '选择文件',
            pictures: '',

            videoButton: '点击上传',
            videoValue: '选择文件',
            video: ''
        };
        this.changePicFile = this.changePicFile.bind(this);
        this.uploadPics = this.uploadPics.bind(this);
        this.changeVideoFile = this.changeVideoFile.bind(this);
        this.uploadVideo = this.uploadVideo.bind(this);
    }
    componentDidMount(){
        let { dispatch, actions, universityId } = this.props;
        let data = {};
        data.universityId = universityId;
        dispatch(actions.requestUniById(data, this));
    }
    changePicFile(e){
        this.setState({
            fileValue: e.target.value,
            pictures: e.target.files[0]
        })
    }
    uploadPics(){
        this.setState({picButton: '上传中...'});
        let { dispatch, actions, universityId } = this.props;
        if(!this.state.pictures){
            alert('请选择图片文件！');
            this.setState({picButton: '点击上传'});
        }
        let formData = new FormData();
        formData.append("universityId", universityId);
        formData.append("pictures", this.state.pictures);
        dispatch(actions.uploadUniPics(formData, this));
    }
    changeVideoFile(e){
        this.setState({
            videoValue: e.target.value,
            video: e.target.files[0]
        })
    }
    uploadVideo(){
        this.setState({videoButton: '上传中...'});
        let { dispatch, actions, universityId } = this.props;
        let formData = new FormData();
        formData.append("universityId", universityId);
        formData.append("video", this.state.video);
        dispatch(actions.uploadUniVideo(formData, this));
    }
    render(){
        return (
            <div className={styles.the_right}>
                <p className={styles.the_title}>院校管理</p>
                <ul className={styles.apply_condi}>
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
                    <li
                        id="upload"
                        onClick={(e) => {this.setState({status: e.target.id})}}
                        style={{backgroundColor: this.state.status == 'upload' ? '#a22020' : '#ffffff'}}>上传材料</li>
                </ul>


                <div className={styles.school_detail} style={{display: this.state.status == "desc" ? 'block' : 'none'}}>
                    <h2 className={styles.school_name}>
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



                <div className={styles.school_upload} style={{display: this.state.status == "upload" ? 'block' : 'none'}}>
                    <form encType="multipart/form-data" className={styles.school_upload_form}>
                        <label htmlFor="images">上传图片</label>
                        <FileUpload id="images" content={this.state.fileValue} change={this.changePicFile}/>
                        <button type="button" onClick={this.uploadPics}>{this.state.picButton}</button>
                    </form>
                    <form encType="multipart/form-data" className={styles.school_upload_form}>
                        <label htmlFor="video">上传视频</label>
                        <FileUpload id="video" content={this.state.videoValue} change={this.changeVideoFile}/>
                        <button type="button" onClick={this.uploadVideo}>{this.state.videoButton}</button>
                    </form>
                </div>


            </div>
        )
    }
}
let mapStateToProps = (state) => {
    return { state: state }
};
export default connect(mapStateToProps)(SchoolDetails);