import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { BehaviorSubject, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ITask } from '../models/task';


@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasks : ITask[] = [];
  public  taskSubject : BehaviorSubject<ITask[]> = new BehaviorSubject(<ITask[]>[]);


  
  //apiUrl = environment.fireConfig;

  constructor( private database: AngularFireDatabase) { 
    this.getAllTask();
  }


  taskRefresh() {
   this.taskSubject.next(this.tasks);
  }

  getAllTask(): void {
    this.database.list('tasks').query.limitToLast(10).once('value', snapShop => {
      const taskSnapshot = snapShop.val();
      const mapToTask = Object.keys(taskSnapshot).map(id => ({id, ...taskSnapshot[id]}));
      this.tasks = mapToTask;
      this.taskRefresh();
    });
  }

  getTaskOn(): void {
    this.database.list('tasks').query.limitToLast(10).on('value', snapShop => {
      const taskSnapshot = snapShop.val();
      const mapToTask = Object.keys(taskSnapshot).map(id => ({id, ...taskSnapshot[id]}));
    })

  }

  createTask(task: ITask): Promise<ITask> {
    return new Promise((resolve, rejects) => {
      this.database.list('tasks').push(task)
        .then(res => {
          const createTask = {...task, id: <string>res.key};
          this.tasks.push(createTask);
          this.taskRefresh();
          resolve(task);
        }).catch(rejects);
    });
  }


  editTask(task: ITask, taskId: any ): Promise<ITask> {
    return new Promise((resolve, rejects) => {
      this.database.list('tasks').update(taskId, task)
      .then(() => {
        const updateTask = {...task, taskId};
        const taskUpdateIndex = this.tasks.findIndex(task => task.id === taskId);
        this.tasks[taskUpdateIndex] = updateTask;
        this.taskRefresh();
        resolve({...task, id:taskId});
      }).catch(rejects)
    })
  }

  deleteTask(taskId: string): Promise<ITask> {
    return new Promise((resolve, rejects) => {
      this.database.list('tasks').remove(taskId)
      .then(() => {
        const taskDelete = this.tasks.findIndex(task => task.id === taskId);
        this.tasks.slice(taskDelete, 1);
        this.taskRefresh();
      }).catch(console.error);
    })
  }


}
