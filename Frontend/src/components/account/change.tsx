import React, { useContext, useState } from "react";
import { useHistory } from "react-router";

import { IonButton, IonFab, IonFabButton, IonIcon, IonInput, IonTitle, useIonAlert } from "@ionic/react";
import { arrowBack } from "ionicons/icons";

import { GlobalContext } from '../../context/Context';

import { UserChange, ContextInterface } from "../../interfaces/interfaces";

import { handleRequest } from "../../utils/hooks/userRequest";
import { DOMAIN, UNSAFE_PASSWORD } from "../../utils/utils";


const Change: React.FC = () => {

    const [presentAlert] = useIonAlert();

    const { user, updateTokens } = useContext(GlobalContext) as ContextInterface;

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
        if (newPassword.length < UNSAFE_PASSWORD){
            setMessage("Password too weak!")
            return;
        }
        if (newPassword === password){
            setMistake(false);
            setMessage("You can't change to the same password!")

            return;
        }

        const newUser: UserChange = {
            username: user?.username!,
            password,
            new_password: newPassword
        };
        
        handleRequest(`http://${DOMAIN}/user?id=${window.localStorage.getItem("id")}`, "PUT", newUser, setMessage, setMistake, undefined, undefined, updateTokens, presentAlert);
    }

    return (
        <div id="container"> 
            <form id="form" onSubmit={handleSubmit}>
                <IonFab horizontal="start" vertical="top">
                    <IonFabButton size={"small"} onClick={() => history.push('/account/login')}>
                        <IonIcon icon={arrowBack}></IonIcon>
                    </IonFabButton>
                </IonFab>
                <IonTitle id="title">Change password</IonTitle>
                <br />
                <IonInput type="password" onIonChange={e => {
                    if (e.detail.value === undefined) return;
                    setPassword(e.detail.value!)
                }} clearInput={true} value={password} id="password" placeholder="Enter old password" required={true} />
                <br />
                <IonInput type="password" onIonChange={e => {
                    if (e.detail.value === undefined) return;
                    setNewPassword(e.detail.value!)
                }} clearInput={true} value={newPassword} id="password" placeholder="Enter new password" required={true} />
                <br />
                <IonInput type="password" onIonChange={e => {
                    if (e.detail.value === undefined) return;
                    setConfirmNewPassword(e.detail.value!)
                }} clearInput={true} value={confirmNewPassword} id="password" placeholder="Confirm new password" required={true} />
                <p id="warning">{!message && !mistake && <br></br>} {message} {mistake && "Incorrect password or username"}</p>
                <IonButton type="submit" expand="block" id="button">Change</IonButton>
            </form>
        </div>
    );
}
 
export default Change;
// add option to change password without beeing logged in
