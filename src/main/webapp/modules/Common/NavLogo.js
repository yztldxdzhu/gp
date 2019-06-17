import React, {Component} from 'react';
import { Router, IndexLink } from 'react-router';
import { connect } from 'react-redux';
import NavLink from './NavLink';
import styles from '../../public/styles/user/common.css';
import logo from '../../public/images/azlx1.jpg';
class NavLogo extends Component {
    render(){
        return (
            <nav className={styles.nav_logo}>
                <NavLink to="/">
                    <img
                        src={logo}
                        alt='Study in Australia'
                        width='70px'
                        height='46px'/>
                </NavLink>
                <IndexLink to="/" onlyActiveOnIndex={true}>澳洲留学</IndexLink>
            </nav>
        )
    }
}
export default NavLogo;