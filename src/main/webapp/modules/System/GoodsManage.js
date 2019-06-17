import React, {Component} from 'react';
import actions from '../../actions/action';
import CommonLeft from './CommonLeft';
import GoodsInfos from './GoodsInfos';
import styles from '../../public/styles/system/manage.css';

class GoodsManage extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div className={styles.the_all}>
                <CommonLeft />
                <GoodsInfos  actions={actions}/>
            </div>
        )
    }
}
export default GoodsManage;