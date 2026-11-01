import React from 'react';
import {
  IonButton, IonButtons, IonContent, IonHeader, IonIcon,
  IonMenuButton, IonPage, IonTitle, IonToolbar,
} from '@ionic/react';
import { arrowBackOutline, checkmarkCircleOutline, createOutline, trashOutline } from 'ionicons/icons';

const AboutPage: React.FC = () => (
  <IonPage>
    <IonHeader className="ion-no-border">
      <IonToolbar color="primary">
        <IonButtons slot="start"><IonMenuButton aria-label="Abrir menú" /></IonButtons>
        <IonTitle>Cómo usar la app</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent>
      <div className="app-container about-layout">
        <span className="eyebrow">GUÍA RÁPIDA</span>
        <h1>Organizar tus tareas es sencillo.</h1>
        <p className="about-lead">TareaClara reúne tus pendientes en una interfaz móvil simple y accesible.</p>
        <div className="guide-grid">
          <article className="guide-card"><IonIcon color="primary" icon={checkmarkCircleOutline} /><h2>Crear y completar</h2><p>Usa “Nueva tarea”, escribe título y descripción, y guarda. Marca la casilla cuando termines.</p></article>
          <article className="guide-card"><IonIcon color="primary" icon={createOutline} /><h2>Editar</h2><p>Selecciona el lápiz de cualquier tarea, modifica sus datos y presiona “Guardar cambios”.</p></article>
          <article className="guide-card"><IonIcon color="primary" icon={trashOutline} /><h2>Eliminar con seguridad</h2><p>Selecciona el basurero. La aplicación te pedirá confirmar antes de eliminar la tarea.</p></article>
        </div>
        <p className="about-lead">Evaluación Unidad 1 · Equipo: Ignacio Arancibia Arce y Joaquín Gallardo.</p>
        <div className="notice"><strong>Alcance de la Unidad 1</strong><p>Las tareas se guardan en memoria mientras la aplicación está abierta. El almacenamiento local, los usuarios y las API se considerarán en unidades posteriores.</p></div>
        <IonButton routerLink="/tareas" routerDirection="back" className="primary-action">
          <IonIcon icon={arrowBackOutline} slot="start" /> Volver a mis tareas
        </IonButton>
      </div>
    </IonContent>
  </IonPage>
);
export default AboutPage;