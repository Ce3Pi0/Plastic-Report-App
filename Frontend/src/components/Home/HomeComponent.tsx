import React from "react";

import logo from '../../images/logo.png'
import EuRcc from '../../images/RCC_Logo.png'

const HomeComponent: React.FC = () => {
    return (
        <>
            <div className='container'>
                <img className='logo-image' src={logo} alt="3D factory logo"/>
            </div>

            <div className='container'>
                <img className='sponsor-image' src={EuRcc} alt="RCC logo"/>
            </div>
        </>
    );
}

export default HomeComponent;