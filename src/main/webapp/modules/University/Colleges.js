import React, {Component} from 'react';
import { IndexLink } from 'react-router';
import { connect } from 'react-redux';
import fetch from 'isomorphic-fetch';
import NavLink from '../Common/NavLink';
import styles from '../../public/styles/user/colleges.css';
import collegeLogo from '../../public/images/collegelogo.jpg';

class Colleges extends Component{
    constructor(props){
        super(props);
        this.state = {
            universityList: [],
            loading: '加载中...'
        };
        this.searchByState = this.searchByState.bind(this);
        this.getUniById = this.getUniById.bind(this);
    }
    componentDidMount(){
        let { dispatch, actions, state } = this.props;
        if(state.SearchReducers.success){
            this.setState({universityList: state.SearchReducers.dataList});
        }else if((!state.SearchReducers.success) && (state.SearchReducers.errMsg)){
            this.setState({loading: state.SearchReducers.errMsg});
        }else{
            dispatch(actions.requestAllUniversities(this));
        }
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.state.SearchReducers.success){
            this.setState({universityList: nextProps.state.SearchReducers.dataList});
        }
    }
    searchByState(e){
        let { dispatch, actions } = this.props;
        let stateName = e.target.id;
        if(stateName == '全部'){
            dispatch(actions.requestAllUniversities(this));
        }else{
            let data = {};
            data.universityState = stateName;
            dispatch(actions.requestUniByState(data, this));
        }
    }
    getUniById(e){
        this.context.router.push({
            pathname: '/collegeLibrary/college',
            state: { universityId: e.target.id }
        });
    }
    render(){
        return (
            <div className={styles.category} style={{marginTop: '145px'}}>
                <div className={styles.category_each}>
                    <span>地区</span>
                    <ul onClick={this.searchByState}>
                        <li id="全部">全部</li>
                        <li id="新南威尔士州">新南威尔士州</li>
                        <li id="昆士兰州">昆士兰州</li>
                        <li id="南澳大利亚州">南澳大利亚州</li>
                        <li id="塔斯马尼亚州">塔斯马尼亚州</li>
                        <li id="维多利亚州">维多利亚州</li>
                        <li id="西澳大利亚州 ">西澳大利亚州 </li>
                        <li id="澳洲首都特区">澳洲首都特区</li>
                        <li id="北领地">北领地</li>
                    </ul>
                </div>
                <div className={styles.category_each_last}>
                    <ul>
                        <li>综合排行</li>
                        <li>热门院校</li>
                        <li>
                            <input type="text" className={styles.search_text}/>
                            <input type="button" className={styles.search_btn}/>
                        </li>
                    </ul>
                </div>
                {this.state.universityList.length == 0 ? (
                        <div className={styles.college_sort_no}>
                            {this.state.loading}
                        </div>
                    ) : (
                        this.state.universityList.map((uni, i) => {
                            return (
                                <div className={styles.college_sort_each} key={i}>
                                    <p onClick={this.getUniById} id={uni.universityId}>
                                        <img src={uni.universityLogo} alt="澳洲院校展示" id={uni.universityId}/>
                                    </p>
                                    <div className={styles.college_sort_each_desc}>
                                        <p className={styles.college_sort_each_name} dangerouslySetInnerHTML={{__html: uni.universityName ? uni.universityName : '无'}}/>
                                        <p className={styles.college_sort_each_name_en}>{uni.universityEnname ? uni.universityEnname : '无'}</p>
                                        <p className={styles.college_sort_each_locate}>所在地区：{uni.universityState ? uni.universityState : '无'}</p>
                                    </div>
                                </div>
                            )
                        })
                    )}
            </div>
        );
    }
}
Colleges.contextTypes = {
    router: React.PropTypes.object
};
let mapStateToProps = (state) => {
    return { state: state }
};
export default connect(mapStateToProps)(Colleges);










class Collegeses extends Component{

    constructor(props){
        super(props);
        this.state = {"loading": false, "list": []}
    }

    //当初次渲染完毕 设置该组件的属性firstView为true
    componentDidMount(){
        this.setState({"firstView": true});
    }

    //当传入的props有变化，就是时候发起请求 更新列表的内容了
    componentWillReceiveProps(nextProps){
        console.log('nextProps:', nextProps);
        let keyword = nextProps.keyword;
        this.setState({"loading": true, "firstView": false});

        let url = `https://api.github.com/search/users?q=${keyword}`;
        fetch(url)
            .then((data) => {
                console.log(data);
                this.setState({"loading": false, "list": data.items});
            })
            .catch((err) => {
                console.error(err);

            })
    }

    render(){

        if(this.state.firstView){
            return (
                <h2>请输入搜索关键词！</h2>
            )
        }
        if(this.state.loading){
            return (
                <h2>加载中...</h2>
            )
        }else{
            if(this.state.list.length === 0){
                return (
                    <h2>没有搜索结果，请重新输入！</h2>
                )
            }else{
                return(
                    <div className={styles.category}>
                        <div className={styles.category_each}>
                            <span>地区</span>
                            <ul>
                                <li>全部</li>
                                <li>新南威尔斯州</li>
                                <li>昆士兰州</li>
                                <li>南澳洲</li>
                                <li>塔斯马尼亚州</li>
                                <li>维多利亚州</li>
                                <li>西澳洲</li>
                                <li>澳洲首都区</li>
                                <li>北领地</li>
                            </ul>
                        </div>
                        <div className={styles.category_each_last}>
                            <ul>
                                <li>综合排行</li>
                                <li>热门院校</li>
                                <li>
                                    <input type="text" className={styles.search_text}/>
                                    <input type="button" className={styles.search_btn}/>
                                </li>
                            </ul>
                        </div>

                        <div className={styles.college_sort_each}>
                            {this.state.list.map( college => {
                                return (
                                    <div>
                                        <NavLink to="/collegeLibrary/college">
                                            <img src={college.avatar_url} alt="澳洲院校排行榜展示"/>
                                        </NavLink>
                                        <div className={styles.college_sort_each_desc}>
                                            <p className={styles.college_sort_each_name}>{college.login}</p>
                                            <p className={styles.college_sort_each_name_en}>The University of Melbourne</p>
                                            <p className={styles.college_sort_each_locate}>所在地区：维多利亚州</p>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>

                    </div>
                )
            }
        }


    }
}