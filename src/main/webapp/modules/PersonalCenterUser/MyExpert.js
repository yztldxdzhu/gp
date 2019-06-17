import React, {Component} from 'react';
import { connect } from 'react-redux';
import NavLink  from '../Common/NavLink';
import styles from '../../public/styles/user/myInfo.css';

class MyExpert extends Component{
    constructor(props){
        super(props);
        this.state = {
            expert: {
                tagList: []
            }
        };
        this.clickMyExpert = this.clickMyExpert.bind(this);
    }
    componentDidMount(){
        let { dispatch, actions } = this.props;
        dispatch(actions.findUserExpert(this));
    }
    clickMyExpert(e){
        this.context.router.push({
            pathname: '/experts/expert',
            query: { expertId: e.target.id }
        });
    }
    render(){
        if(!this.state.expert){
            return (
                <div>
                    <p className={styles.the_header}>对不起，您还未绑定顾问，请去
                        <NavLink to="/experts">顾问中心</NavLink>绑定！
                    </p>
                </div>
            )
        }else{
            return(
                <div>
                    <p
                        onClick={this.clickMyExpert}
                        className={styles.the_header}
                        id={this.state.expert.expertId}
                    >您绑定的顾问：
                        {this.state.expert.expertTel}
                    </p>
                </div>
            )
        }

    }
}
MyExpert.contextTypes = {
    router: React.PropTypes.object
};
let mapStateToProps = (state) => {
    return { state: state }
};
export default connect(mapStateToProps)(MyExpert);