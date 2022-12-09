import React, { useContext, useState } from "react";
import { contextInterface, GlobalContext } from "../../context/Context";
import { IonButton, IonTitle, IonInput, IonFab, IonFabButton, IonIcon, IonList, IonRadioGroup, IonItem, IonLabel, IonRadio } from "@ionic/react";
import { useHistory } from "react-router";
import { arrowBack } from "ionicons/icons";
import { UserRegister } from "../../interfaces/interfaces";
import { handleRequest } from "../../utils/userRequest";
import { domain } from "../../utils/utils";


const Register: React.FC<{setPath: React.Dispatch<React.SetStateAction<string>>}> = ({setPath}) => {

    const { loggedIn, setLoggedIn} = useContext(GlobalContext) as contextInterface;
    
    const [email, setEamil] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [gender, setGender] = useState<string>('');
    const [userExists, setUserExists] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");

    const history = useHistory();

    const logOut = () => {
        window.localStorage.clear();
        setPath('/account/login');
        setLoggedIn(false);
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (gender === ''){
            setMessage('Please select a gender!')
            return;
        }

        setMessage('');

        if (password.length < 6){
            setMessage("Password too weak!")
            return;
        }

        const newUser: UserRegister = {
            name,
            username,
            email,
            password,
            gender
        };

        handleRequest(`http://${domain}/user/register`, "POST", newUser, setMessage, undefined, undefined, setUserExists, undefined);
    }

    return (  
        <>
            {!loggedIn && <IonFab horizontal="start" vertical="top">
                <IonFabButton size={"small"} onClick={() =>history.push('/account/login')}>
                    <IonIcon icon={arrowBack}></IonIcon>
                </IonFabButton>
            </IonFab>}
            {!loggedIn &&
            <div id="container">
                <form name="form1" className="box-sign-in" onSubmit={handleSubmit}>
                    <h2>Sign in<span /></h2>
                    <h5>Sign in to your account.</h5>
                    <IonInput onIonChange={e => {
                                if(e.detail.value === undefined) return;
                                setName(e.detail.value!);
                            }} clearInput={true} value={name} id="username" placeholder="Enter your name" required={true} />
                    <i className="typcn typcn-eye" id="eye"></i>
                    <IonInput onIonChange={e => {
                        if(e.detail.value === undefined) return;
                        setUsername(e.detail.value!);
                    }} clearInput={true} value={username} id="username" placeholder="Enter username" required={true} />
                    <i className="typcn typcn-eye" id="eye"></i>
                    <IonInput type="email" onIonChange={e => {
                                if (e.detail.value === undefined) return;
                                setEamil(e.detail.value!)
                            }} clearInput={true} value={email} id="username" placeholder="Enter an email" required={true} />
                    <i className="typcn typcn-eye" id="eye"></i>
                    <IonInput type="password" onIonChange={e => {
                        if (e.detail.value === undefined) return;
                        setPassword(e.detail.value!)
                    }} clearInput={true} value={password} id="password" placeholder="Enter password" required={true} />
                    <IonRadioGroup value={gender} onIonChange={(e) => setGender(e.detail.value)}>
                        <IonItem className="gender" color={"light"}>
                        <IonLabel>Male</IonLabel>
                        <IonRadio slot="end" value="male"></IonRadio>
                        </IonItem>


                        <IonItem className="gender" color={"light"}>
                        <IonLabel>Female</IonLabel>
                        <IonRadio slot="end" value="female"></IonRadio>
                        </IonItem>

                        <IonItem className="gender" color={"light"}>
                        <IonLabel>Other</IonLabel>
                        <IonRadio slot="end" value="other"></IonRadio>
                        </IonItem>
                    </IonRadioGroup>
                    
                    <br />
                    <br />
                    <br />
                    

                    <p id="warning">{!userExists && !message && <br></br>} {message} {userExists && "User already exists"}</p>
                    <input type="submit" value="Sign in" className="btn1" />
                </form>
            </div>}
            {loggedIn &&
                <div className="container">
                    <div>
                        <h1>You are already logged in!</h1>
                        <IonButton expand="block" onClick={() => logOut()}>Logout</IonButton>
                    </div>
                </div>} 
        </>
    );
}
 
export default Register;


