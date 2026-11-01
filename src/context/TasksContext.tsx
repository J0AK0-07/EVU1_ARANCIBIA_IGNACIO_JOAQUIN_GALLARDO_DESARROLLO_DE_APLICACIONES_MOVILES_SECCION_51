import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import type { Task, TaskInput } from '../models/Task';
import { deleteTask, editTask, insertTask, makeTask, switchTaskStatus } from '../lib/taskLogic';

interface TaskContextValue {
  tasks: Task[];
  add: (input: TaskInput) => void;
  update: (id: string, input: TaskInput) => void;
  remove: (id: string) => void;
  toggle: (id: string) => void;
}

const TasksContext = createContext<TaskContextValue | undefined>(undefined);

export const TasksProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  // Almacenamiento en memoria: la persistencia local corresponde a próximas unidades.
  const [tasks, setTasks] = useState<Task[]>([]);

  const add = useCallback((input: TaskInput) => {
    const task = makeTask(input, crypto.randomUUID(), new Date().toISOString());
    setTasks(current => insertTask(current, task));
  }, []);

  const update = useCallback((id: string, input: TaskInput) => {
    const timestamp = new Date().toISOString();
    setTasks(current => editTask(current, id, input, timestamp));
  }, []);

  const remove = useCallback((id: string) => {
    setTasks(current => deleteTask(current, id));
  }, []);

  const toggle = useCallback((id: string) => {
    const timestamp = new Date().toISOString();
    setTasks(current => switchTaskStatus(current, id, timestamp));
  }, []);

  const value = useMemo(() => ({ tasks, add, update, remove, toggle }), [tasks, add, update, remove, toggle]);
  return <TasksContext.Provider value={value}>{children}</TasksContext.Provider>;
};

export const useTasks = (): TaskContextValue => {
  const context = useContext(TasksContext);
  if (!context) throw new Error('useTasks debe usarse dentro de TasksProvider.');
  return context;
};