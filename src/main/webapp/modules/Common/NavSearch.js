import React, {Component} from 'react';
import { Router, IndexLink } from 'react-router';
import { connect } from 'react-redux';
import styles from '../../public/styles/user/common.css';

class NavSearch extends Component {
    constructor(props){
        super(props);
        this.state = {
            keyword: '澳大利亚',
            type: 'colleges',

            universityList: [],
        };
        this.handleSearch = this.handleSearch.bind(this);
    }
    handleSearch(){
        let { dispatch, actions } = this.props;
        dispatch(actions.notSearch());
        let data = {};
        if(this.state.type == 'colleges'){//搜索院校
            data.universityKeyWords = this.state.keyword;
            dispatch(actions.searchUniversitiesByKeyword(data, this));
        }
        else if(this.state.type == 'products'){
            data.goodsKeyWords = this.state.keyword;
            dispatch(actions.searchGoodsByKeyword(data, this));
        }
    }
    render(){
        return (
            <div className={styles.nav_search}>
                <form>
                    <input className={styles.nav_search_icon} type="button"/>
                    <input
                        defaultValue={this.state.keyword}
                        onChange={ (e) => {this.setState({keyword: e.target.value})} }
                        type="search"
                        placeholder="请输入要搜索的关键词"/>

                    <select onChange={ (e) => {this.setState({type: e.target.value})} }>
                        <option value="colleges">院校</option>
                        <option value="products">产品</option>
                    </select>

                    <input
                        onClick={this.handleSearch}
                        className={styles.nav_search_btn}
                        type="button"
                        value="搜索"/>
                </form>
            </div>
        )
    }
}
NavSearch.contextTypes = {
    router: React.PropTypes.object
};
let mapStateToProps = (state) => {
    return { state: state }
};
export default connect(mapStateToProps)(NavSearch);