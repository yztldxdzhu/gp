import React, {Component} from 'react';
import { IndexLink } from 'react-router';
import { connect } from 'react-redux';
import NavLink from '../Common/NavLink';
import styles from '../../public/styles/user/home.css';
import collegeLogo from '../../public/images/collegelogo.jpg';

class CollegeSort extends Component{
    constructor(props){
        super(props);
        this.state = {
            universityList: [],
            loading: '加载中...'
        };
        this.getUniById = this.getUniById.bind(this);
    }
    componentDidMount(){
        let { dispatch, actions } = this.props;
        dispatch(actions.requestAllUniversities(this));
    }
    getUniById(e){
        this.context.router.push({
            pathname: '/collegeLibrary/college',
            state: { universityId: e.target.id }
        });
    }
    render(){
        return (
            <div className={styles.college_sort}>
                <NavLink to="/collegeLibrary">
                    <small className={styles.college_sort_more}>展示更多院校</small>
                </NavLink>

                <h3 className={styles.college_sort_title}>最新澳洲院校排行榜展示</h3>

                <div className={styles.college_sort_some}>
                    {this.state.universityList.slice(0, 5).map( (uni, i) => {
                        return(
                            <div className={styles.college_sort_each} key={i}>
                                <p onClick={this.getUniById} id={uni.universityId}>
                                    <img src={uni.universityLogo} alt={uni.universityName} id={uni.universityId}/>
                                </p>
                                <div className={styles.college_sort_each_desc}>
                                    <p className={styles.college_sort_each_name}>{uni.universityName}</p>
                                    <p className={styles.college_sort_each_name_en}>{uni.universityEnname}</p>
                                    <p className={styles.college_sort_each_locate}>所在地区：{uni.universityState}</p>
                                </div>
                            </div>
                        )
                    } )}
                </div>
            </div>
        )
    }
}
CollegeSort.contextTypes = {
    router: React.PropTypes.object
};
let mapStateToProps = (state) => {
    return { state: state }
};
export default connect(mapStateToProps)(CollegeSort);