import React, {Component} from 'react';
import NavLink  from '../Common/NavLink';
import styles from '../../public/styles/system/common.css';
import gear from '../../public/images/gear.png';

class CommonLeft extends Component{
    render(){
        return (
            <div className={styles.common_left}>
                <div className={styles.header_title}>
                    <p>澳洲留学</p>
                    <p>后台管理中心</p>
                </div>
                <nav className={styles.header_nav}>
                    <ul>
                        <li><NavLink to="/userManage">用户管理</NavLink></li>
                        <li><NavLink to="/expertManage">顾问管理</NavLink></li>
                        <li><NavLink to="/quesManage">问题管理</NavLink></li>
                        <li><NavLink to="/tagManage">标签管理</NavLink></li>
                        <li><NavLink to="/applyManage">申请管理</NavLink></li>
                        <li><NavLink to="/fileManage">文件管理</NavLink></li>
                        <li><NavLink to="/schoolManage">院校管理</NavLink></li>
                        <li><NavLink to="/goodsManage">商品管理</NavLink></li>
                    </ul>
                </nav>
                <div className={styles.left_gear}>
                    <img src={gear} alt="转啊转" width={64} height={64} className={styles.rot_img}/>
                </div>
            </div>
        )
    }
}
export default CommonLeft;