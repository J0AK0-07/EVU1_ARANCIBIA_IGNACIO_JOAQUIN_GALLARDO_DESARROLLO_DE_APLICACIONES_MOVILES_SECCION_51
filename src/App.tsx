import React from 'react';
import { Navigate, Route } from 'react-router-dom';
import {
  IonApp, IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonList,
  IonMenu, IonMenuToggle, IonRouterOutlet, IonTitle, IonToolbar,
} from '@ionic/react';
import { checkmarkDoneOutline, informationCircleOutline } from 'ionicons/icons';
import { IonReactRouter } from '@ionic/react-router';
import { TasksProvider } from './context/TasksContext';
import TasksPage from './pages/TasksPage';
import AboutPage from './pages/AboutPage';

const App: React.FC = () => (
  <IonApp>
    <TasksProvider>
      <IonReactRouter>
        <IonMenu contentId="main-content" type="overlay">
          <IonHeader>
            <IonToolbar color="primary"><IonTitle>TareaClara</IonTitle></IonToolbar>
          </IonHeader>
          <IonContent>
            <div className="menu-caption">MENÚ PRINCIPAL</div>
            <IonList lines="none">
              <IonMenuToggle autoHide={false}>
                <IonItem routerLink="/tareas" routerDirection="root" button detail={false}>
                  <IonIcon icon={checkmarkDoneOutline} slot="start" color="primary" />
                  <IonLabel>Mis tareas</IonLabel>
                </IonItem>
              </IonMenuToggle>
              <IonMenuToggle autoHide={false}>
                <IonItem routerLink="/acerca" routerDirection="root" button detail={false}>
                  <IonIcon icon={informationCircleOutline} slot="start" color="primary" />
                  <IonLabel>Cómo usar la app</IonLabel>
                </IonItem>
              </IonMenuToggle>
            </IonList>
          </IonContent>
        </IonMenu>

        <IonRouterOutlet id="main-content">
          <Route path="/tareas" element={<TasksPage />} />
          <Route path="/acerca" element={<AboutPage />} />
          <Route path="/" element={<Navigate to="/tareas" replace />} />
        </IonRouterOutlet>
      </IonReactRouter>
    </TasksProvider>
  </IonApp>
);

export default App;