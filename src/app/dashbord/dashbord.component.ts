import { Component, OnInit } from '@angular/core';

import { Observable, Subscription } from 'rxjs';
import { CreateTaskComponent } from '../crud-task/create-task/create-task.component';
import { DeleteTaskComponent } from '../crud-task/delete-task/delete-task.component';
import { UpdateTaskComponent } from '../crud-task/update-task/update-task.component';
import { ITask } from '../models/task';
import { TaskService } from '../services/task.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';



@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.component.html',
  styleUrls: ['./dashbord.component.less']
})
export class DashbordComponent implements OnInit {

    public onGetAllTask!: Subscription;
    public displayedColumns = ['name', 'description', 'action'];
    public dataSource = new MatTableDataSource<ITask>();
    public taskPlanned!: ITask[];
    public taskInProgress!: ITask[];
    public taskCompleted!: ITask[];


  constructor(private taskService: TaskService, private dialog: MatDialog) { }

  ngOnInit(): void {
    
    this.onGetAllTask = this.taskService.taskSubject.subscribe({
      next: (task) => {
        this.dataSource.data = task;
        this.getTaskbyStatus(task);
      },
         error: (console.error)
      });
}

  addNewTask() {
    this.dialog.open(CreateTaskComponent,
      {
        width: '500px',
        height: '320px'
      }
      );
    this.dialog.afterAllClosed.subscribe((data) => 
    this.taskService.getAllTask());
  }

  editTask(task:any) {
    this.dialog.open(UpdateTaskComponent, {
      data: {id: task.id, name: task.name, description: task.description},
      width: '400px',
      height: '320px'
    });
    this.dialog.afterAllClosed.subscribe((data) => 
    this.taskService.getAllTask());
  }

  deleteTask(task:any) {
    this.dialog.open(DeleteTaskComponent, {
      data: {id: task.id},
      width: '350px',
      height: '150px'
    });

    this.dialog.afterAllClosed.subscribe((data) => 
    this.taskService.getAllTask());
  }

  getTaskbyStatus(task: ITask[]) {
    if (task) {
    this.taskPlanned = task.filter((task) => task.status === 0);
    this.taskInProgress = task.filter((task) => task.status === 1);
    this.taskCompleted = task.filter((task) => task.status === 2);
  }
}

endTask(task: ITask) {
  task.status = 2;
  this.taskService.editTask(task, task.id).then((task) => {
  }, (error: any) => {
    console.log(error);
  });
}


}
