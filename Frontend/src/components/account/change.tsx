import { IonButton, IonFab, IonFabButton, IonIcon, IonInput, IonTitle } from "@ionic/react";
import { arrowBack } from "ionicons/icons";
import React, { useContext } from "react";
import { useState } from "react";
import { useHistory } from "react-router";
import { contextInterface, GlobalContext } from '../../context/Context';
import { UserChange } from "../../interfaces/interfaces";
import { handleRequest } from "../../utils/userRequest";
import { domain } from "../../utils/utils";


const Change: React.FC = () => {

    const {loggedIn} = useContext(GlobalContext) as contextInterface;

    const [password, setPassword] = useState<string>('');
    const [newPassword, setNewPassword] = useState<string>('');
    const [confirmNewPassword, setConfirmNewPassword] = useState<string>('');
    const [mistake, setMistake] = useState<boolean>(false);
    const [message, setMessage] = useState<string>('');

    const history = useHistory();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setMessage("")

        if (newPassword !== confirmNewPassword){
            setMistake(false);
            setMessage("You didn't confirm the new password correctly")
            return;
        }

        if (newPassword === password){
            setMistake(false);
            setMessage("You can't change to the same password!")
            return;
        }

        const newUser: UserChange = {
            username: window.localStorage.getItem('username')!,
            password,
            new_password: newPassword
        };
        
        handleRequest(`http://${domain}/user?id=${window.localStorage.getItem("id")}`, "PUT", newUser, setMessage, setMistake, undefined, undefined, undefined);
    }

    return (  
        <>
            {loggedIn &&
            <div id="container">
                <form name="form1" className="box" onSubmit={handleSubmit}>
                    <IonFab horizontal="start" vertical="top">
                        <IonFabButton size={"small"} onClick={() =>history.push('/account/login')}>
                            <IonIcon icon={arrowBack}></IonIcon>
                        </IonFabButton>
                    </IonFab>
                    <h2>Change<span /></h2>
                    <h5>Change your password.</h5>
                    <IonInput type="password" onIonChange={e => {
                                if(e.detail.value === undefined) return;
                                setPassword(e.detail.value!);
                            }} clearInput={true} value={password} id="password" placeholder="Enter your password" required={true} />
                    <i className="typcn typcn-eye" id="eye"></i>
                    <IonInput type="password" onIonChange={e => {
                                if(e.detail.value === undefined) return;
                                setNewPassword(e.detail.value!);
                            }} clearInput={true} value={newPassword} id="password" placeholder="Enter new password" required={true} />
                    <IonInput type="password" onIonChange={e => {
                                if(e.detail.value === undefined) return;
                                setConfirmNewPassword(e.detail.value!);
                            }} clearInput={true} value={confirmNewPassword} id="password" placeholder="Confirm new password" required={true} />
                    <p id="warning">{!message && !mistake && <br></br>} {message} {mistake && "Incorrect password"}</p>
                    <input type="submit" value="Change" className="btn1" />
                </form>
            </div>}
            {!loggedIn &&
                <div className="container">
                    <div>
                     <h2> You aren't logged in!</h2>
                     <IonButton expand="block" onClick={() => window.location.assign('/account/login')}>Login</IonButton>
                 </div>
                </div>} 
            </>
    );
}
 
export default Change;