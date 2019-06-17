import React, {Component} from 'react';
import { Router, IndexLink } from 'react-router';
import { connect } from 'react-redux';
import actions from '../../actions/action';
import NavHeader from './NavHeader';
import NavLogo from './NavLogo';
import NavSearch from './NavSearch';
import NavNeck from './NavNeck';
class CommonHeaderComponent extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div style={{backgroundColor: '#fff', position: 'fixed', top: '0', left: '0', right: '0', zIndex: '2'}}>
                <NavHeader actions={actions}/>
                <NavLogo />
                <NavSearch actions={actions}/>
                <NavNeck actions={actions}/>
            </div>
        );
    }
}
export default CommonHeaderComponent;


