import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from "@ionic/react";
import React, { useContext } from "react";
import { contextInterface, GlobalContext } from "../../context/Context";
import useFetch from '../../utils/useFetch';
import { domain } from '../../utils/utils';


const Info:React.FC<{setPath: React.Dispatch<React.SetStateAction<string>>}> = ({setPath}) => {
    const {data, err, loading} = useFetch(`http://${domain}/user?id=${window.localStorage.getItem('id')}`);

    const {loggedIn, setLoggedIn} = useContext(GlobalContext) as contextInterface;

    const logOut = () => {
        window.localStorage.clear();
        setPath('/account/login');
        setLoggedIn(false);
        window.location.assign('/account/login');
    }

    return (
        <div>  
            {data && 
            <IonCard>
                <IonCardHeader>
                    <IonCardTitle>{JSON.parse(JSON.stringify(data)).user.username}</IonCardTitle>
                    <IonCardSubtitle>{JSON.parse(JSON.stringify(data)).user.email}</IonCardSubtitle>
                </IonCardHeader>

                <IonCardContent>
                Welcome to your account {JSON.parse(JSON.stringify(data)).user.gender === "male" && "mr."} {JSON.parse(JSON.stringify(data)).user.gender === "female" && "mrs."} {JSON.parse(JSON.stringify(data)).user.name}
                </IonCardContent>

                <IonButton color={"tertiary"} fill="clear" onClick={() => logOut()}>Log out</IonButton>
                <IonButton color={"tertiary"} fill="clear" onClick={() => window.location.assign('/account/change')}>Change Password</IonButton>
            </IonCard>
            }
            {loading && <div>...Loading</div>}
            {err && loggedIn && <div>Error while fetching data</div>}
            {err && !loggedIn && <div className="not-found">
            <h1>You are not logged in!</h1>
            <IonButton shape="round" href="/account/login" slot="center">Log in</IonButton>
        </div>}
        </div>
    );
}
 
export default Info;