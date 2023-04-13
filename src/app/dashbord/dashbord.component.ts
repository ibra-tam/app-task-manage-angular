import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatTabContent } from '@angular/material/tabs';
import { Observable, Subscription } from 'rxjs';
import { CreateTaskComponent } from '../crud-task/create-task/create-task.component';
import { DeleteTaskComponent } from '../crud-task/delete-task/delete-task.component';
import { UpdateTaskComponent } from '../crud-task/update-task/update-task.component';
import { ITask } from '../models/task';
import { TaskService } from '../services/task.service';



@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.component.html',
  styleUrls: ['./dashbord.component.less']
})
export class DashbordComponent implements OnInit {

    public onGetAllTask!: Subscription;

    public displayedColumns = ['name', 'description', 'action'];

    public dataSource = new MatTableDataSource<ITask>();


  constructor(private taskService: TaskService, private dialog: MatDialog) { }

  ngOnInit(): void {
    
    this.onGetAllTask = this.taskService.taskSubject.subscribe({
      next: (task) => {
        this.dataSource.data = task;
        console.log('task data',this.dataSource.data);
      },
         error: (console.error)
      });
}

  addNewTask() {
    this.dialog.open(CreateTaskComponent,
      {
        width: '500px',
        height: '300px'
      }
      );
    this.dialog.afterAllClosed.subscribe((data) => 
    this.taskService.getAllTask());
  }

  editTask(task:any) {
    this.dialog.open(UpdateTaskComponent, {
      data: {id: task.id, name: task.name, description: task.description},
      width: '400px',
      height: '300px'
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


}
