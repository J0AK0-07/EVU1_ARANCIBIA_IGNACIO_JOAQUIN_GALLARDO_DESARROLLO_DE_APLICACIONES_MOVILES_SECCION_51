import type { Task, TaskInput, TaskValidationErrors } from '../models/Task.ts';

/** Reglas de validación del formulario. La descripción es obligatoria. */
export const validateTaskInput = ({ title, description }: TaskInput): TaskValidationErrors => {
  const errors: TaskValidationErrors = {};
  if (!title.trim()) errors.title = 'Escribe un título para la tarea.';
  else if (title.trim().length > 80) errors.title = 'Máximo 80 caracteres.';
  if (!description.trim()) errors.description = 'Escribe una descripción.';
  else if (description.trim().length > 240) errors.description = 'Máximo 240 caracteres.';
  return errors;
};

export const makeTask = (input: TaskInput, id: string, timestamp: string): Task => ({
  id,
  title: input.title.trim(),
  description: input.description.trim(),
  completed: false,
  createdAt: timestamp,
  updatedAt: timestamp,
});

export const insertTask = (tasks: Task[], task: Task): Task[] => [task, ...tasks];

export const editTask = (tasks: Task[], id: string, input: TaskInput, timestamp: string): Task[] =>
  tasks.map(task => task.id === id
    ? { ...task, title: input.title.trim(), description: input.description.trim(), updatedAt: timestamp }
    : task,
  );

export const deleteTask = (tasks: Task[], id: string): Task[] =>
  tasks.filter(task => task.id !== id);

export const switchTaskStatus = (tasks: Task[], id: string, timestamp: string): Task[] =>
  tasks.map(task => task.id === id
    ? { ...task, completed: !task.completed, updatedAt: timestamp }
    : task,
  );