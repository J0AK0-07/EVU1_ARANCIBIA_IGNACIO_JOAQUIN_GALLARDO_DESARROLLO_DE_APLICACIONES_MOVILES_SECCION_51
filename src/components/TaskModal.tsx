import React, { useEffect, useState } from 'react';
import {
  IonButton, IonButtons, IonContent, IonHeader, IonInput, IonItem,
  IonList, IonModal, IonNote, IonTitle, IonToolbar,
} from '@ionic/react';
import type { Task, TaskInput, TaskValidationErrors } from '../models/Task';
import { validateTaskInput } from '../lib/taskLogic';

interface TaskModalProps {
  open: boolean;
  editing: Task | null;
  onClose: () => void;
  onSave: (input: TaskInput) => void;
}

const TaskModal: React.FC<TaskModalProps> = ({ open, editing, onClose, onSave }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState<TaskValidationErrors>({});

  // Precarga la tarea al editar y limpia ambos campos al iniciar una tarea nueva.
  useEffect(() => {
    if (open) {
      setTitle(editing?.title ?? '');
      setDescription(editing?.description ?? '');
      setErrors({});
    }
  }, [open, editing]);

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const input = { title, description };
    const nextErrors = validateTaskInput(input);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;
    onSave(input);
    setTitle('');
    setDescription('');
    onClose();
  };

  return (
    <IonModal isOpen={open} onDidDismiss={onClose} breakpoints={[0, 0.85, 1]} initialBreakpoint={0.85}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{editing ? 'Editar tarea' : 'Nueva tarea'}</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={onClose} aria-label="Cerrar formulario">Cancelar</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <form onSubmit={submit} noValidate>
          <p className="form-intro">Completa los dos campos para {editing ? 'actualizar' : 'guardar'} tu tarea.</p>
          <IonList lines="none" className="form-list">
            <IonItem className="form-item">
              <IonInput
                label="Título de la tarea" labelPlacement="stacked" fill="outline"
                placeholder="Ej.: Estudiar Ionic" value={title} maxlength={80}
                onIonInput={event => { setTitle(event.detail.value ?? ''); setErrors(prev => ({ ...prev, title: undefined })); }}
                aria-label="Título de la tarea"
              />
            </IonItem>
            {errors.title && <IonNote color="danger" className="field-error">{errors.title}</IonNote>}
            <IonItem className="form-item">
              <IonInput
                label="Descripción" labelPlacement="stacked" fill="outline"
                placeholder="Ej.: Repasar componentes y navegación" value={description} maxlength={240}
                onIonInput={event => { setDescription(event.detail.value ?? ''); setErrors(prev => ({ ...prev, description: undefined })); }}
                aria-label="Descripción de la tarea"
              />
            </IonItem>
            {errors.description && <IonNote color="danger" className="field-error">{errors.description}</IonNote>}
          </IonList>
          <div className="form-footer">
            <IonButton type="submit" expand="block" className="primary-action">
              {editing ? 'Guardar cambios' : 'Guardar tarea'}
            </IonButton>
            <p className="hint">Se aceptan hasta 80 caracteres en el título y 240 en la descripción.</p>
          </div>
        </form>
      </IonContent>
    </IonModal>
  );
};

export default TaskModal;