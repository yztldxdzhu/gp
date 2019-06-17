import React, {Component} from 'react';
import { connect } from 'react-redux';
import NavLink  from '../Common/NavLink';
import { FileUpload } from '../Common/CommonComponent';
import styles from '../../public/styles/user/myInfo.css';

class ApplyProgress extends Component{
    constructor(props){
        super(props);
        this.state = {
            type1FileList: [],//当前登录用户的申请文件列表。
            type2FileList: [],
            type3FileList: [],

            materialButton: '上传',
            materialFileValue: '选择文件',
            materialFileContent: '',
            materialUploadStatus: 'noUpload',


            languageButton: '上传',
            languageFileValue: '选择文件',
            languageFileContent: '',
            languageUploadStatus: 'noUpload',

            diplomaButton: '上传',
            diplomaFileValue: '选择文件',
            diplomaFileContent: '',
            diplomaUploadStatus: 'noUpload',

            visaButton: '上传',
            visaFileValue: '选择文件',
            visaFileContent: '',
            visaUploadStatus: 'noUpload',


        };
        this.materialFileChange = this.materialFileChange.bind(this);
        this.materialFileUpload = this.materialFileUpload.bind(this);

        this.languageFileChange = this.languageFileChange.bind(this);
        this.languageFileUpload = this.languageFileUpload.bind(this);

        this.diplomaFileChange = this.diplomaFileChange.bind(this);
        this.diplomaFileUpload = this.diplomaFileUpload.bind(this);

        this.visaFileChange = this.visaFileChange.bind(this);
        this.visaFileUpload = this.visaFileUpload.bind(this);
    }
    componentDidMount(){
        let { dispatch, actions } = this.props;
        dispatch(actions.getUserFiles(this));
    }


    materialFileChange(e){
        this.setState({
            materialFileValue: e.target.value,
            materialFileContent: e.target.files[0]
        })
    }
    materialFileUpload(){
        this.setState({materialButton: '上传中...'});
        let { dispatch, actions, applicationId } = this.props;
        if(!this.state.materialFileContent){
            this.setState({materialButton: '上传'});
            alert('请选择文件！');
        }
        let formData = new FormData();
        formData.append("applicationId", applicationId);
        formData.append("fileType", 1);
        formData.append("fileContent", this.state.materialFileContent);
        dispatch(actions.uploadMaterialFile(formData, this));
    }

    languageFileChange(e){
        this.setState({
            languageFileValue: e.target.value,
            languageFileContent: e.target.files[0]
        })
    }
    languageFileUpload(){
        this.setState({languageButton: '上传中...'});
        let { dispatch, actions, applicationId } = this.props;
        if(!this.state.languageFileContent){
            this.setState({languageButton: '上传'});
            alert('请选择文件！');
        }
        let formData = new FormData();
        formData.append("applicationId", applicationId);
        formData.append("fileType", 2);
        formData.append("fileContent", this.state.languageFileContent);
        dispatch(actions.uploadLanguageFile(formData, this));
    }

    diplomaFileChange(e){
        this.setState({
            diplomaFileValue: e.target.value,
            diplomaFileContent: e.target.files[0]
        })
    }
    diplomaFileUpload(){
        this.setState({diplomaButton: '上传中...'});
        let { dispatch, actions, applicationId } = this.props;
        if(!this.state.diplomaFileContent){
            this.setState({diplomaButton: '上传'});
            alert('请选择文件！');
        }
        let formData = new FormData();
        formData.append("applicationId", applicationId);
        formData.append("fileType", 3);
        formData.append("fileContent", this.state.diplomaFileContent);
        dispatch(actions.uploadDiplomaFile(formData, this));
    }

    visaFileChange(e){
        this.setState({
            visaFileValue: e.target.value,
            visaFileContent: e.target.files[0]
        })
    }
    visaFileUpload(){
        this.setState({visaButton: '上传中...'});
        let { dispatch, actions, applicationId } = this.props;
        if(!this.state.visaFileContent){
            this.setState({visaButton: '上传'});
            alert('请选择文件！');
        }
        let formData = new FormData();
        formData.append("applicationId", applicationId);
        formData.append("fileType", 4);
        formData.append("fileContent", this.state.visaFileContent);
        dispatch(actions.uploadVisaFile(formData, this));
    }


    render(){
        let {applicationCampus,scheduleStatus} = this.props;
        return (
            <div className={styles.apply_progress_part} style={{marginTop: '145px'}}>
                <p className={styles.the_header}>{applicationCampus} | 我的申请进度</p>
                <div className={styles.progress_body}>
                    <div className={styles.progress_stage}>
                        <div className={styles.stage_index} style={{backgroundColor: scheduleStatus == 1 || scheduleStatus == 2 || scheduleStatus == 3 || scheduleStatus == 4 ? "yellow" : "#cccccc"}}>
                            <span>1</span>
                        </div>
                        <div className={styles.stage_content}>
                            <h3>您的申请表已经审核，结果为：通过</h3>
                            <p>申请阶段</p>
                        </div>
                    </div>
                    <div className={styles.progress_stage}>
                        <div className={styles.stage_index} style={{backgroundColor: scheduleStatus == 2  || scheduleStatus == 3 || scheduleStatus == 4 ? "yellow" : "#cccccc"}}>
                            <span>2</span>
                        </div>
                        <div className={styles.stage_content}>
                            {scheduleStatus == 2 || scheduleStatus == 3 || scheduleStatus == 4 ? (
                                    <h3>您的校级相关材料已经审核，结果为：通过</h3>
                                ) : (
                                    this.state.type1FileList.length == 0 ? (
                                            <div>
                                                <p className={styles.the_header}>根据您的申请，请选择：中英文成绩单、中英文个人CV、中英文在读证明、中英文个人自述、学院推荐信打包上传</p>
                                                <form className={styles.the_form_right}>
                                                    <FileUpload content={this.state.materialFileValue} change={this.materialFileChange}/>
                                                    <button type="button" className={styles.the_btn} onClick={this.materialFileUpload}>{this.state.materialButton}</button>
                                                </form>
                                            </div>
                                        ) : (
                                            <div>
                                                <h3>您的材料已经上传，正在审核...</h3>
                                                <a href={'/gp/' + this.state.type1FileList[0].fileUrl}>点此查看该材料：{this.state.type1FileList[0].fileUrl}</a>
                                            </div>
                                        )
                                )}
                            <p>校级相关材料提交阶段</p>
                        </div>
                    </div>
                    <div className={styles.progress_stage}>
                        <div className={styles.stage_index} style={{backgroundColor: scheduleStatus == 3 || scheduleStatus == 4  ? "yellow" : "#cccccc"}}>
                            <span>3</span>
                        </div>
                        <div className={styles.stage_content}>
                            {scheduleStatus == 3 || scheduleStatus == 4 ? (
                                    <h3>这是您的条件录取offer！请下载查收！</h3>
                                ) : (
                                    <h3>您的学校材料正在审核，还未生成条件录取Offer，请耐心等候！</h3>
                                )}
                            <p>条件录取Offer阶段</p>
                        </div>
                    </div>
                    <div className={styles.progress_stage}>
                        <div className={styles.stage_index} style={{backgroundColor: scheduleStatus == 3 || scheduleStatus == 4 ? "yellow" : "#cccccc"}}>
                            <span>4</span>
                        </div>
                        <div className={styles.stage_content}>
                            {scheduleStatus == 3 || scheduleStatus == 4 ? (
                                    <h3>您的语言材料已经审核，结果为：通过</h3>
                                ) : (
                                    this.state.type2FileList.length == 0 ? (
                                            <div>
                                                <p className={styles.the_header}>请选择您的语言证明材料上传</p>
                                                <form className={styles.the_form_right}>
                                                    <FileUpload content={this.state.languageFileValue} change={this.languageFileChange}/>
                                                    <button type="button" className={styles.the_btn} onClick={this.languageFileUpload}>{this.state.languageButton}</button>
                                                </form>
                                            </div>
                                        ) : (
                                            <div>
                                                <h3>您的语言材料已经上传，正在审核...</h3>
                                                <a href={'/gp/' + this.state.type2FileList[0].fileUrl}>点此查看该材料：{this.state.type2FileList[0].fileUrl}</a>
                                            </div>
                                        )
                                )}
                            <p>语言成绩阶段</p>
                        </div>
                    </div>
                    <div className={styles.progress_stage}>
                        <div className={styles.stage_index} style={{backgroundColor: scheduleStatus == 4 ? "yellow" : "#cccccc"}}>
                            <span>5</span>
                        </div>
                        <div className={styles.stage_content}>
                            {scheduleStatus == 4 ? (
                                    <h3>这是您的COE！请下载查收！</h3>
                                ) : (
                                    <h3>您的语言材料正在审核，还未生成COE，请耐心等候！</h3>
                                )}
                            <p>COE阶段</p>
                        </div>
                    </div>
                    <div className={styles.progress_stage}>
                        <div className={styles.stage_index} style={{backgroundColor: scheduleStatus == 4 ? "yellow" : "#cccccc"}}>
                            <span>6</span>
                        </div>
                        <div className={styles.stage_content}>
                            {scheduleStatus == 4 ? (
                                    <h3>您的毕业证书材料已经审核，结果为：通过</h3>
                                ) : (
                                    this.state.type3FileList.length == 0 ? (
                                            <div>
                                                <p className={styles.the_header}>请选择您的毕业证书电子版上传</p>
                                                <form className={styles.the_form_right}>
                                                    <FileUpload content={this.state.diplomaFileValue} change={this.diplomaFileChange}/>
                                                    <button type="button" className={styles.the_btn} onClick={this.diplomaFileUpload}>{this.state.diplomaButton}</button>
                                                </form>
                                            </div>
                                        ) : (
                                            <div>
                                                <h3>您的毕业证书电子版材料已经上传，正在审核...</h3>
                                                <a href={'/gp/' + this.state.type3FileList[0].fileUrl}>点此查看该材料：{this.state.type3FileList[0].fileUrl}</a>
                                            </div>
                                        )
                                )}
                            <p>毕业证书阶段</p>
                        </div>
                    </div>




                    <div className={styles.progress_stage}>
                        <div className={styles.stage_index} style={{backgroundColor: scheduleStatus == 7 ? "yellow" : "#cccccc"}}>
                            <span>7</span>
                        </div>
                        <div className={styles.stage_content}>
                            {scheduleStatus == 7 ? (
                                    <h3>您的签证材料已经审核，结果为：通过</h3>
                                ) : (
                                    this.state.visaUploadStatus == 'noUpload' ? (
                                            <div>
                                                <p className={styles.the_header}>请选择您的签证材料电子版上传</p>
                                                <form className={styles.the_form_right}>
                                                    <FileUpload content={this.state.visaFileValue} change={this.visaFileChange}/>
                                                    <button type="button" className={styles.the_btn} onClick={this.visaFileUpload}>{this.state.visaButton}</button>
                                                </form>
                                            </div>
                                        ) : (
                                            <h3>您的签证材料电子版材料已经上传，正在审核...</h3>
                                        )


                                )}
                            <p>签证阶段</p>
                        </div>
                    </div>

                    <div className={styles.progress_stage}>
                        <div className={styles.stage_index} style={{backgroundColor: scheduleStatus == 8 ? "yellow" : "#cccccc"}}>
                            <span>8</span>
                        </div>
                        <div className={styles.stage_content}>
                            <NavLink to="/personalCenter/offer">正在审核中...</NavLink>
                            <p>录取阶段-正式Offer</p>
                        </div>
                    </div>

                    <div className={styles.progress_stage}>
                        <div className={styles.stage_index} style={{backgroundColor: scheduleStatus == 9 ? "yellow" : "#cccccc"}}>
                            <span>9</span>
                        </div>
                        <div className={styles.stage_content}>
                            <NavLink to="/personalCenter/guidance">行前的生活指导和小锦囊</NavLink>
                            <p>行前指导阶段</p>
                        </div>
                    </div>

                    <div className={styles.progress_stage}>
                        <div className={styles.stage_index} style={{backgroundColor: scheduleStatus == 10 ? "yellow" : "#cccccc"}}>
                            <span>10</span>
                        </div>
                        <div className={styles.stage_content}>
                            <NavLink to="/personalCenter/in">您已成功！点此评价！</NavLink>
                            <p>入境留学阶段</p>
                        </div>
                    </div>

                </div>

            </div>
        )
    }
}
ApplyProgress.contextTypes = {
    router: React.PropTypes.object
};
let mapStateToProps = (state) => {
    return { state: state }
};
export default connect(mapStateToProps)(ApplyProgress);