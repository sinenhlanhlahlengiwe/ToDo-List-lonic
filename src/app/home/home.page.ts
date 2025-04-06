import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonInput, IonTextarea, IonButton, IonIcon, IonItemSliding, IonItemOptions, IonItemOption, IonText, IonDatetime, IonDatetimeButton, IonModal } from '@ionic/angular/standalone';
import { TaskService } from '../services/task.service';
import { Task } from '../interfaces/task.interface';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
    CommonModule,
    FormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonLabel,
    IonInput,
    IonTextarea,
    IonButton,
    IonIcon,
    IonItemSliding,
    IonItemOptions,
    IonItemOption,
    IonText,
    IonDatetime,
    IonDatetimeButton,
    IonModal
  ],
})
export class HomePage implements OnInit {
  tasks$: Observable<Task[]>;
  newTaskTitle: string = '';
  newTaskDescription: string = '';
  newTaskDueDate: string = '';
  today: Date = new Date();
  isDatePickerOpen: boolean = false;

  constructor(private taskService: TaskService) {
    this.tasks$ = this.taskService.getTasks();
  }

  ngOnInit() {}

  addTask() {
    if (this.newTaskTitle.trim()) {
      this.taskService.addTask(this.newTaskTitle, this.newTaskDescription, this.newTaskDueDate);
      this.newTaskTitle = '';
      this.newTaskDescription = '';
      this.newTaskDueDate = '';
    }
  }

  onDateChange(event: any) {
    this.newTaskDueDate = event.detail.value;
  }

  toggleTaskCompletion(taskId: number) {
    this.taskService.toggleTaskCompletion(taskId);
  }

  deleteTask(taskId: number) {
    this.taskService.deleteTask(taskId);
  }
}
