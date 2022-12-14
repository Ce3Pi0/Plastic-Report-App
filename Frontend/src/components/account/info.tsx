import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonFab, IonFabButton, IonIcon, IonLabel, IonList } from "@ionic/react";
import { arrowDownOutline } from "ionicons/icons";
import React, { useContext } from "react";
import { contextInterface, GlobalContext } from "../../context/Context";
import { ReportInterface } from "../../interfaces/interfaces";
import useFetch from '../../utils/useFetch';
import { domain } from '../../utils/utils';
import Report from "./report";


const Info:React.FC = () => {
    const {loggedIn, setLoggedIn} = useContext(GlobalContext) as contextInterface;

    const {data, err, loading} = useFetch(`http://${domain}/user?id=${window.localStorage.getItem("id")}`);
    const {data: reports, err: reports_error, loading: reports_loading} = useFetch(`http://${domain}/report?user_id=${window.localStorage.getItem("id")}`);

    const logOut = () => {
        window.location.assign('/account/login');
        window.localStorage.clear();
        setLoggedIn(false, null);
    }

    return (
        <div>  
            {data &&
            <> 
                <IonCard>
                    <IonFab horizontal="end" vertical="top">
                        <IonFabButton size="small">
                            <IonIcon icon={arrowDownOutline}/>
                        </IonFabButton>
                    </IonFab>
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
                {reports && JSON.parse(JSON.stringify(reports)).reports.map((report: ReportInterface) => (<Report key={report.id} report={report}/>))}
                {reports_loading && <div>...Loading</div>}
                {reports_error && loggedIn && <div>Error while fetching data</div>}
            </>
            }
            {loading && <div>...Loading</div>}
            {err && loggedIn && <div>Error while fetching data</div>}
            {!loggedIn && <div className="not-found">
            <h1>You are not logged in!</h1>
            <IonButton shape="round" href="/account/login" slot="center">Log in</IonButton>
        </div>}
        </div>
    );
}
 
export default Info;