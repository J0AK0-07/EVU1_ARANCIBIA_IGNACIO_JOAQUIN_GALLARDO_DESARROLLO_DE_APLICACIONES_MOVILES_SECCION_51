import React, { useMemo, useState } from 'react';
import {
  IonAlert, IonBadge, IonButton, IonButtons, IonCheckbox, IonChip, IonContent,
  IonHeader, IonIcon, IonItem, IonLabel, IonList, IonMenuButton, IonPage,
  IonSegment, IonSegmentButton, IonTitle, IonToast, IonToolbar,
} from '@ionic/react';
import {
  addOutline, checkmarkCircleOutline, checkmarkDoneOutline, createOutline,
  leafOutline, trashOutline,
} from 'ionicons/icons';
import TaskModal from '../components/TaskModal';
import { useTasks } from '../context/TasksContext';
import type { Task, TaskInput } from '../models/Task';

type Filter = 'todas' | 'pendientes' | 'completadas';

const TasksPage: React.FC = () => {
  const { tasks, add, update, remove, toggle } = useTasks();
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Task | null>(null);
  const [pendingDelete, setPendingDelete] = useState<Task | null>(null);
  const [filter, setFilter] = useState<Filter>('todas');
  const [toast, setToast] = useState('');

  const completed = tasks.filter(task => task.completed).length;
  const pending = tasks.length - completed;
  const visible = useMemo(() => tasks.filter(task =>
    filter === 'todas' || (filter === 'pendientes' && !task.completed) || (filter === 'completadas' && task.completed),
  ), [tasks, filter]);

  const openNew = () => { setEditing(null); setModalOpen(true); };
  const openEdit = (task: Task) => { setEditing(task); setModalOpen(true); };
  const save = (input: TaskInput) => {
    if (editing) { update(editing.id, input); setToast('Tarea actualizada correctamente.'); }
    else { add(input); setFilter('todas'); setToast('Tarea agregada correctamente.'); }
  };

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar color="primary">
          <IonButtons slot="start"><IonMenuButton aria-label="Abrir menú" /></IonButtons>
          <IonTitle>TareaClara</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div className="app-container">
          <section className="hero">
            <div className="hero-copy">
              <span className="eyebrow">TU ESPACIO DE ORGANIZACIÓN</span>
              <h1>Un día claro empieza con una tarea.</h1>
              <p>Anota lo importante, avanza a tu ritmo y mantén todo a la vista.</p>
            </div>
            <div className="hero-symbol" aria-hidden="true"><IonIcon icon={checkmarkDoneOutline} /></div>
          </section>

          <section className="summary" aria-label="Resumen de tareas">
            <div className="summary-item"><span>Total de tareas</span><strong>{tasks.length}</strong></div>
            <div className="summary-item"><span>Pendientes</span><strong>{pending}</strong></div>
            <div className="summary-item"><span>Completadas</span><strong>{completed}</strong></div>
          </section>

          <section className="task-section" aria-labelledby="tasks-heading">
            <div className="section-header">
              <div>
                <p className="section-kicker">MI ORGANIZADOR</p>
                <h2 id="tasks-heading">Mis tareas</h2>
              </div>
              <IonButton onClick={openNew} className="primary-action" aria-label="Agregar una nueva tarea">
                <IonIcon slot="start" icon={addOutline} /> Nueva tarea
              </IonButton>
            </div>

            <IonSegment value={filter} onIonChange={event => setFilter((event.detail.value as Filter) || 'todas')}>
              <IonSegmentButton value="todas"><IonLabel>Todas</IonLabel></IonSegmentButton>
              <IonSegmentButton value="pendientes"><IonLabel>Pendientes</IonLabel></IonSegmentButton>
              <IonSegmentButton value="completadas"><IonLabel>Hechas</IonLabel></IonSegmentButton>
            </IonSegment>

            {visible.length > 0 ? (
              <IonList className="task-list" lines="none">
                {visible.map(task => (
                  <IonItem key={task.id} className={`task-item ${task.completed ? 'is-done' : ''}`}>
                    <IonCheckbox slot="start" checked={task.completed} onIonChange={() => {
                      toggle(task.id);
                      setToast(task.completed ? 'Tarea marcada como pendiente.' : '¡Tarea completada!');
                    }} aria-label={`Marcar ${task.title} como ${task.completed ? 'pendiente' : 'completada'}`} />
                    <IonLabel className="ion-text-wrap">
                      <h3>{task.title}</h3>
                      <p>{task.description}</p>
                      <IonChip color={task.completed ? 'success' : 'medium'} className="status-chip">
                        {task.completed ? 'Completada' : 'Pendiente'}
                      </IonChip>
                    </IonLabel>
                    <IonButtons slot="end" className="task-actions">
                      <IonButton onClick={() => openEdit(task)} aria-label={`Editar ${task.title}`} title="Editar tarea">
                        <IonIcon icon={createOutline} slot="icon-only" />
                      </IonButton>
                      <IonButton color="danger" onClick={() => setPendingDelete(task)} aria-label={`Eliminar ${task.title}`} title="Eliminar tarea">
                        <IonIcon icon={trashOutline} slot="icon-only" />
                      </IonButton>
                    </IonButtons>
                  </IonItem>
                ))}
              </IonList>
            ) : (
              <div className="empty-state">
                <div className="empty-illustration"><IonIcon icon={tasks.length === 0 ? leafOutline : checkmarkCircleOutline} /></div>
                <h3>{tasks.length === 0 ? 'Tu lista está esperando' : 'No hay tareas en esta vista'}</h3>
                <p>{tasks.length === 0 ? 'Crea tu primera tarea para comenzar a organizarte.' : 'Prueba otro filtro o agrega una tarea nueva.'}</p>
                {tasks.length === 0 && <IonButton fill="outline" onClick={openNew}>Crear primera tarea</IonButton>}
              </div>
            )}
            <div className="support-note"><IonBadge color="light">Consejo</IonBadge> Marca la casilla para completar una tarea.</div>
          </section>
          <footer className="app-footer">TareaClara · Evaluación Unidad 1 · Ionic + React</footer>
        </div>

        <TaskModal open={modalOpen} editing={editing} onClose={() => setModalOpen(false)} onSave={save} />
        <IonAlert
          isOpen={pendingDelete !== null}
          onDidDismiss={() => setPendingDelete(null)}
          header="Eliminar tarea"
          message="¿Deseas eliminar la tarea seleccionada? Esta acción no se puede deshacer."
          buttons={[
            { text: 'Cancelar', role: 'cancel' },
            { text: 'Eliminar', role: 'destructive', handler: () => {
              if (pendingDelete) { remove(pendingDelete.id); setToast('Tarea eliminada.'); }
            } },
          ]}
        />
        <IonToast isOpen={Boolean(toast)} message={toast} duration={2300} position="bottom" onDidDismiss={() => setToast('')} />
      </IonContent>
    </IonPage>
  );
};

export default TasksPage;