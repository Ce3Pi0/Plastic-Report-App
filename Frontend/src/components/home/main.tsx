import React from "react";

import logo from '../../images/logo.png'
import EuRcc from '../../images/RCC_Logo.png'


const Main: React.FC = () => {
    return (
        <>
            <div className='container'>
                <img className='logo-image' src={logo} />
            </div>

            <div className='container'>
                <img className='sponsor-image' src={EuRcc} />
            </div>
        </>
    );
}

export default Main;