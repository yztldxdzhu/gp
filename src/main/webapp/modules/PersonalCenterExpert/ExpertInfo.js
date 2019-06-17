import React, {Component} from 'react';
import actions from '../../actions/action';
import ExpertInfoShow from './ExpertInfoShow';
import ExpertinfoEdit from './ExpertinfoEdit';
import ExpertInfoUsers from './ExpertInfoUsers';
import ExpertInfoQuesList from './ExpertInfoQuesList';

class ExpertInfo extends Component{
    render(){
        {
            const url = this.props.params;

            console.log(url);

            if(url.personalCenterExpert === "basicInfo"){
                return(
                    <ExpertInfoShow actions={actions}/>
                )
            }
            else if(url.personalCenterExpert === "editBasicInfo"){
                return(
                    <ExpertinfoEdit actions={actions}/>
                )
            }
            else if(url.personalCenterExpert === "myUsers"){
                return(
                    <ExpertInfoUsers actions={actions}/>
                )
            }
            else if(url.personalCenterExpert === "quesList"){
                return(
                    <ExpertInfoQuesList actions={actions}/>
                )
            }

        }
    }
}

export default ExpertInfo;