import React, {Component} from 'react';
import { IndexLink } from 'react-router';
import { connect } from 'react-redux';
import NavLink from '../Common/NavLink';
import styles from '../../public/styles/user/apply.css';

class EvaluateCollegeSuit extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            recommend: '您适合这些院校',
            universityList: [],
            loading: '加载中...'
        };
        this.getUniById = this.getUniById.bind(this);
    }
    componentDidMount(){
        let { dispatch, actions } = this.props;
        dispatch(actions.findUniversityEvaluate(this));
    }
    getUniById(e){
        this.context.router.push({
            pathname: '/collegeLibrary/college',
            state: { universityId: e.target.id }
        });
    }
    render(){
        return (
            <div className={styles.college_suit}>

                <NavLink to="/collegeLibrary">
                    <small>展示更多院校</small>
                </NavLink>

                <h3 className={styles.college_suit_title}>{this.state.recommend}</h3>

                <div className={styles.college_suit_some}>

                    {this.state.universityList.slice(0, 4).map((uni, i) => {
                        return(
                            <div className={styles.college_suit_each} key={i}>
                                <p onClick={this.getUniById} id={uni.universityId}>
                                    <img src={uni.universityLogo} alt={uni.universityName} id={uni.universityId}/>
                                </p>
                                <div className={styles.college_suit_each_desc}>
                                    <p className={styles.college_suit_each_name}>{uni.universityName}</p>
                                    <p className={styles.college_suit_each_name_en}>{uni.universityEnname}</p>
                                    <p className={styles.college_suit_each_locate}>所在地区：{uni.universityState}</p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}
EvaluateCollegeSuit.contextTypes = {
    router: React.PropTypes.object
};
let mapStateToProps = (state) => {
    return {state: state}
};
export default connect(mapStateToProps)(EvaluateCollegeSuit);