import React, {Component} from 'react';
import { IndexLink } from 'react-router';
import styles from '../../public/styles/user/home.css';
import azsdBanner from '../../public/images/azsdbanner.jpg';

class ImageBanner extends Component{
    render(){
        return (
            <div className={styles.apply_banner}>
                <img src={azsdBanner} alt="澳洲胜地" width='100%'/>
            </div>
        );
    }
}
export default ImageBanner;