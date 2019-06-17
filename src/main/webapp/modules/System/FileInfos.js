import React, {Component} from 'react';
import { connect } from 'react-redux';
import styles from '../../public/styles/system/manage.css';

class FileInfos extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            fileTypeStatus: 'type1',
            status: 'unchecked',

            noVerifyFileList1: [],
            noVerifyFileList2: [],
            noVerifyFileList3: [],
            passFileList1: [],
            passFileList2: [],
            passFileList3: [],
            noPassFileList1: [],
            noPassFileList2: [],
            noPassFileList3: [],
        };
        this.checkFile = this.checkFile.bind(this);
        this.checkNotFile = this.checkNotFile.bind(this);
    }
    componentDidMount(){
        let { dispatch, actions } = this.props;
        dispatch(actions.getAllFile(this));
    }
    checkFile(e){
        let { dispatch, actions } = this.props;
        let data = {};
        data.fileId = e.target.id;
        data.fileIspassed = 1;
        dispatch(actions.verifyFile(data, this));
    }
    checkNotFile(e){
        let { dispatch, actions } = this.props;
        let data = {};
        data.fileId = e.target.id;
        data.fileIspassed = 2;
        dispatch(actions.verifyFile(data, this));
    }
    render(){
        return (
            <div className={styles.the_right}>
                <p className={styles.the_title}>文件管理</p>
                <ul className={styles.apply_condi}>
                    <li
                        id="type1"
                        onClick={(e) => {this.setState({fileTypeStatus: e.target.id})}}
                        style={{backgroundColor: this.state.fileTypeStatus == 'type1' ? '#a22020' : '#ffffff'}}>学校材料</li>
                    <li
                        id="type2"
                        onClick={(e) => {this.setState({fileTypeStatus: e.target.id})}}
                        style={{backgroundColor: this.state.fileTypeStatus == 'type2' ? '#a22020' : '#ffffff'}}>语言材料</li>
                    <li
                        id="type3"
                        onClick={(e) => {this.setState({fileTypeStatus: e.target.id})}}
                        style={{backgroundColor: this.state.fileTypeStatus == 'type3' ? '#a22020' : '#ffffff'}}>毕业证书材料</li>
                </ul>
                <div style={{display: this.state.fileTypeStatus == 'type1' ? 'block' : 'none'}}>
                    <ul className={styles.second_condi}>
                        <li
                            id="unchecked"
                            onClick={(e) => {this.setState({status: e.target.id})}}
                            style={{color: this.state.status == 'unchecked' ? '#a22020' : '#000'}}>未审核</li>
                        <li
                            id="passed"
                            onClick={(e) => {this.setState({status: e.target.id})}}
                            style={{color: this.state.status == 'passed' ? '#a22020' : '#000'}}>审核通过</li>
                        <li
                            id="unpassed"
                            onClick={(e) => {this.setState({status: e.target.id})}}
                            style={{color: this.state.status == 'unpassed' ? '#a22020' : '#000'}}>审核不通过</li>
                    </ul>
                    <div style={{display: this.state.status == 'unchecked' ? 'block' : 'none'}}>
                        {this.state.noVerifyFileList1.length == 0 || this.state.noVerifyFileList1 == null ? (
                            <h3 style={{textAlign: 'center'}}>暂无 学校材料文件未审核 数据</h3>
                            ) : (
                            this.state.noVerifyFileList1.map((file, i)=>{
                                return(
                                    <ul className={styles.file_each} key={i}>
                                        <li>
                                            <a href={'/gp/' + file.fileUrl}>点此查看：{file.fileUrl}</a>
                                        </li>
                                        <li>审核规则：{file.universityApplicationrule}</li>
                                        <li>
                                            <form className={styles.apply_check_form}>
                                                <button type="button" id={file.fileId} onClick={this.checkFile}>审核通过</button>
                                                <button type="button" id={file.fileId} onClick={this.checkNotFile}>审核不通过</button>
                                            </form>
                                        </li>
                                    </ul>
                                )
                            })
                            )}
                    </div>
                    <div style={{display: this.state.status == 'passed' ? 'block' : 'none'}}>
                        {this.state.passFileList1.length == 0 || this.state.passFileList1 == null ? (
                                <h3 style={{textAlign: 'center'}}>暂无 学校材料文件审核通过 数据</h3>
                            ) : (
                                this.state.passFileList1.map((file, i) => {
                                    return(
                                        <ul className={styles.file_each} key={i}>
                                            <li>
                                                <a href={'/gp/' + file.fileUrl}>点此查看：{file.fileUrl}</a>
                                            </li>
                                            <li>审核规则：{file.universityApplicationrule}</li>
                                            <li>学校材料  审核通过</li>
                                        </ul>
                                    )
                                })
                            )}
                    </div>
                    <div style={{display: this.state.status == 'unpassed' ? 'block' : 'none'}}>
                        {this.state.noPassFileList1.length == 0 || this.state.noPassFileList1 == null ? (
                                <h3 style={{textAlign: 'center'}}>暂无 学校材料文件审核不通过 数据</h3>
                            ) : (
                                this.state.noPassFileList1.map((file, i) => {
                                    return(
                                        <ul className={styles.file_each} key={i}>
                                            <li>
                                                <a href={'/gp/' + file.fileUrl}>点此查看：{file.fileUrl}</a>
                                            </li>
                                            <li>审核规则：{file.universityApplicationrule}</li>
                                            <li>学校材料  审核不通过</li>
                                        </ul>
                                    )
                                })
                            )}
                    </div>
                </div>
                <div style={{display: this.state.fileTypeStatus == 'type2' ? 'block' : 'none'}}>
                    <ul className={styles.second_condi}>
                        <li
                            id="unchecked"
                            onClick={(e) => {this.setState({status: e.target.id})}}
                            style={{color: this.state.status == 'unchecked' ? '#a22020' : '#000'}}>未审核</li>
                        <li
                            id="passed"
                            onClick={(e) => {this.setState({status: e.target.id})}}
                            style={{color: this.state.status == 'passed' ? '#a22020' : '#000'}}>审核通过</li>
                        <li
                            id="unpassed"
                            onClick={(e) => {this.setState({status: e.target.id})}}
                            style={{color: this.state.status == 'unpassed' ? '#a22020' : '#000'}}>审核不通过</li>
                    </ul>
                    <div style={{display: this.state.status == 'unchecked' ? 'block' : 'none'}}>
                        {this.state.noVerifyFileList2.length == 0 || this.state.noVerifyFileList2 == null ? (
                                <h3 style={{textAlign: 'center'}}>暂无 语言材料文件未审核 数据</h3>
                            ) : (
                                this.state.noVerifyFileList2.map((file, i)=>{
                                    return(
                                        <ul className={styles.file_each} key={i}>
                                            <li>
                                                <a href={'/gp/' + file.fileUrl}>点此查看：{file.fileUrl}</a>
                                            </li>
                                            <li>审核规则：{file.universityApplicationrule}</li>
                                            <li>
                                                <form className={styles.apply_check_form}>
                                                    <button type="button" id={file.fileId} onClick={this.checkFile}>审核通过</button>
                                                    <button type="button" id={file.fileId} onClick={this.checkNotFile}>审核不通过</button>
                                                </form>
                                            </li>
                                        </ul>
                                    )
                                })
                            )}
                    </div>
                    <div style={{display: this.state.status == 'passed' ? 'block' : 'none'}}>
                        {this.state.passFileList2.length == 0 || this.state.passFileList2 == null ? (
                                <h3 style={{textAlign: 'center'}}>暂无 语言材料文件审核通过 数据</h3>
                            ) : (
                                this.state.passFileList2.map((file, i) => {
                                    return(
                                        <ul className={styles.file_each} key={i}>
                                            <li>
                                                <a href={'/gp/' + file.fileUrl}>点此查看：{file.fileUrl}</a>
                                            </li>
                                            <li>审核规则：{file.universityApplicationrule}</li>
                                            <li>语言材料  审核通过</li>
                                        </ul>
                                    )
                                })
                            )}
                    </div>
                    <div style={{display: this.state.status == 'unpassed' ? 'block' : 'none'}}>
                        {this.state.noPassFileList2.length == 0 || this.state.noPassFileList2 == null ? (
                                <h3 style={{textAlign: 'center'}}>暂无 语言材料文件审核不通过 数据</h3>
                            ) : (
                                this.state.noPassFileList2.map((file, i) => {
                                    return(
                                        <ul className={styles.file_each} key={i}>
                                            <li>
                                                <a href={'/gp/' + file.fileUrl}>点此查看：{file.fileUrl}</a>
                                            </li>
                                            <li>审核规则：{file.universityApplicationrule}</li>
                                            <li>语言材料  审核不通过</li>
                                        </ul>
                                    )
                                })
                            )}
                    </div>
                </div>
                <div style={{display: this.state.fileTypeStatus == 'type3' ? 'block' : 'none'}}>
                    <ul className={styles.second_condi}>
                        <li
                            id="unchecked"
                            onClick={(e) => {this.setState({status: e.target.id})}}
                            style={{color: this.state.status == 'unchecked' ? '#a22020' : '#000'}}>未审核</li>
                        <li
                            id="passed"
                            onClick={(e) => {this.setState({status: e.target.id})}}
                            style={{color: this.state.status == 'passed' ? '#a22020' : '#000'}}>审核通过</li>
                        <li
                            id="unpassed"
                            onClick={(e) => {this.setState({status: e.target.id})}}
                            style={{color: this.state.status == 'unpassed' ? '#a22020' : '#000'}}>审核不通过</li>
                    </ul>
                    <div style={{display: this.state.status == 'unchecked' ? 'block' : 'none'}}>
                        {this.state.noVerifyFileList3.length == 0 || this.state.noVerifyFileList3 == null ? (
                                <h3 style={{textAlign: 'center'}}>暂无 毕业证书材料文件未审核 数据</h3>
                            ) : (
                                this.state.noVerifyFileList3.map((file, i)=>{
                                    return(
                                        <ul className={styles.file_each} key={i}>
                                            <li>
                                                <a href={'/gp/' + file.fileUrl}>点此查看：{file.fileUrl}</a>
                                            </li>
                                            <li>审核规则：{file.universityApplicationrule}</li>
                                            <li>
                                                <form className={styles.apply_check_form}>
                                                    <button type="button" id={file.fileId} onClick={this.checkFile}>审核通过</button>
                                                    <button type="button" id={file.fileId} onClick={this.checkNotFile}>审核不通过</button>
                                                </form>
                                            </li>
                                        </ul>
                                    )
                                })
                            )}
                    </div>
                    <div style={{display: this.state.status == 'passed' ? 'block' : 'none'}}>
                        {this.state.passFileList3.length == 0 || this.state.passFileList3 == null ? (
                                <h3 style={{textAlign: 'center'}}>暂无 毕业证书材料文件审核通过 数据</h3>
                            ) : (
                                this.state.passFileList3.map((file, i) => {
                                    return(
                                        <ul className={styles.file_each} key={i}>
                                            <li>
                                                <a href={'/gp/' + file.fileUrl}>点此查看：{file.fileUrl}</a>
                                            </li>
                                            <li>审核规则：{file.universityApplicationrule}</li>
                                            <li>毕业证书材料  审核通过</li>
                                        </ul>
                                    )
                                })
                            )}
                    </div>
                    <div style={{display: this.state.status == 'unpassed' ? 'block' : 'none'}}>
                        {this.state.noPassFileList3.length == 0 || this.state.noPassFileList3 == null ? (
                                <h3 style={{textAlign: 'center'}}>暂无 毕业证书材料文件审核不通过 数据</h3>
                            ) : (
                                this.state.noPassFileList3.map((file, i) => {
                                    return(
                                        <ul className={styles.file_each} key={i}>
                                            <li>
                                                <a href={'/gp/' + file.fileUrl}>点此查看：{file.fileUrl}</a>
                                            </li>
                                            <li>审核规则：{file.universityApplicationrule}</li>
                                            <li>毕业证书材料  审核不通过</li>
                                        </ul>
                                    )
                                })
                            )}
                    </div>
                </div>
            </div>
        )
    }
}
let mapStateToProps = (state) => {
    return { state: state }
};
export default connect(mapStateToProps)(FileInfos);