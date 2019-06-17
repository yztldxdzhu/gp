import React, {Component} from 'react';
import actions from '../../actions/action';

import MyInfoShow from './MyInfoShow';
import MyInfoEdit from './MyInfoEdit';
import MyApply from './MyApply';
import MyExpert from './MyExpert';
import MyQues  from './MyQues';
import MyOrder from './MyOrder';
import MyCar from './MyCar';
import MyMessage from './MyMessage';




import ApplyProgress from '../Progress/ApplyProgress';
import {
    Material,
    ConditionalOffer,
    Language,
    COE,
    Diploma,
    Visa,
    Offer,
    Guidance,
    In } from '../Progress/ApplyInfo';






class InfoRight extends Component{
    render(){
        {
            const url = this.props.params;
            if(url.personalCenter === 'basicInfo'){
                return (
                    <MyInfoShow actions={actions}/>
                )
            }
            else if(url.personalCenter === 'editBasicInfo'){
                return (
                    <MyInfoEdit actions={actions}/>
                )
            }
            else if(url.personalCenter === 'myApply'){
                return (
                    <MyApply actions={actions}/>
                )
            }
            else if(url.personalCenter === 'myExpert'){
                return (
                    <MyExpert actions={actions}/>
                )
            }
            else if(url.personalCenter === 'myQuestion'){
                return (
                    <MyQues actions={actions}/>
                )
            }
            else if(url.personalCenter === 'myOrder'){
                return (
                    <MyOrder actions={actions}/>
                )
            }
            else if(url.personalCenter === 'myCar'){
                return (
                    <MyCar actions={actions}/>
                )
            }
            else if(url.personalCenter === 'myMessage'){
                return (
                    <MyMessage />
                )
            }










            else if(url.personalCenter === 'myProgress'){
                return (
                    <ApplyProgress actions={actions} />
                )
            }
            else if(url.personalCenter === 'material'){
                return (
                    <Material />
                )
            }
            else if(url.personalCenter === 'conditionalOffer'){
                return (
                    <ConditionalOffer />
                )
            }
            else if(url.personalCenter === 'language'){
                return (
                    <Language />
                )
            }
            else if(url.personalCenter === 'coe'){
                return (
                    <COE />
                )
            }
            else if(url.personalCenter === 'diploma'){
                return (
                    <Diploma />
                )
            }
            else if(url.personalCenter === 'visa'){
                return (
                    <Visa />
                )
            }
            else if(url.personalCenter === 'offer'){
                return (
                    <Offer />
                )
            }
            else if(url.personalCenter === 'guidance'){
                return (
                    <Guidance />
                )
            }
            else if(url.personalCenter === 'in'){
                return (
                    <In />
                )
            }
        }
    }
}
export default InfoRight;