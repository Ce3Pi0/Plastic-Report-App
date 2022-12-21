import { IonFab } from "@ionic/react";
import logo from '../../images/logo.png'
import EuRcc from '../../images/RCC+EU-logo-color-1.png'

const Main = () => {
    return (
        <> 
            <div className='container'>
                <img className='logo-image' src={logo} />
            </div>
        
            <IonFab horizontal='end' vertical='bottom'>
                <img className='sponsor-image' src={EuRcc} />
            </IonFab>
        </> 
    );
}
 
export default Main;