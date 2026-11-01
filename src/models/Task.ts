export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface TaskInput {
  title: string;
  description: string;
}

export interface TaskValidationErrors {
  title?: string;
  description?: string;
}