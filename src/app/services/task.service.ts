import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Task } from '../interfaces/task.interface';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasks: Task[] = [];
  private tasksSubject = new BehaviorSubject<Task[]>([]);

  constructor() {}

  getTasks(): Observable<Task[]> {
    return this.tasksSubject.asObservable();
  }

  addTask(title: string, description?: string, dueDate?: string): void {
    const newTask: Task = {
      id: Date.now(),
      title,
      description,
      dueDate,
      completed: false
    };
    this.tasks = [...this.tasks, newTask];
    this.tasksSubject.next(this.tasks);
  }

  toggleTaskCompletion(taskId: number): void {
    this.tasks = this.tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    this.tasksSubject.next(this.tasks);
  }

  deleteTask(taskId: number): void {
    this.tasks = this.tasks.filter(task => task.id !== taskId);
    this.tasksSubject.next(this.tasks);
  }
}