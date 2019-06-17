import React, {Component} from 'react';
import { connect } from 'react-redux';
import styles from '../../public/styles/system/manage.css';

class SchoolInfos extends Component{
    constructor(props){
        super(props);
        this.state = {
            universityList: [],
            loading: '加载中...'
        };
        this.uniClick = this.uniClick.bind(this);
    }
    componentDidMount(){
        let { dispatch, actions } = this.props;
        dispatch(actions.requestAllUniversities(this));
    }
    uniClick(e){
        this.context.router.push({
            pathname: '/schoolManage/schoolDetail',
            state: { universityId: e.target.id }
        });
    }
    render(){
        return (
            <div className={styles.the_right}>
                <p className={styles.the_title}>院校管理</p>

                {this.state.universityList == null ? (
                        <div style={{textAlign: "center"}}>暂无数据！</div>
                    ) : (
                        this.state.universityList.map((uni, i) => {
                            return(
                                <div className={styles.uni_each} key={i} onClick={this.uniClick} id={uni.universityId}>
                                    <img src={uni.universityLogo} alt={uni.universityName} width={50} id={uni.universityId}/>
                                    <span id={uni.universityId}>{uni.universityName}</span>
                                    <span id={uni.universityId}>{uni.universityProperty}</span>
                                    <span id={uni.universityId}>{uni.universityState}</span>
                                </div>
                            )
                        })
                    )}
            </div>
        )
    }
}
SchoolInfos.contextTypes = {
    router: React.PropTypes.object
};
let mapStateToProps = (state) => {
    return { state: state }
};
export default connect(mapStateToProps)(SchoolInfos);