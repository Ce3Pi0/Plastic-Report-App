import { IonHeader, IonMenu, IonTitle, IonToolbar, IonContent } from "@ionic/react";

const Menu = () => {
    return (  
        <IonMenu contentId="main-content">
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Menu</IonTitle>
                </IonToolbar>
            </IonHeader>
          <IonContent className="ion-padding">Menu content.</IonContent>
        </IonMenu>
    );
}
 
export default Menu;