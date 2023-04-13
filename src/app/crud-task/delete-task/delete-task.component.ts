import { Component, Inject, OnInit } from '@angular/core';
import { inject } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ITask } from 'src/app/models/task';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-delete-task',
  templateUrl: './delete-task.component.html',
  styleUrls: ['./delete-task.component.css']
})
export class DeleteTaskComponent implements OnInit {

  public task!: ITask;

  constructor(public dialogRef: MatDialogRef<DeleteTaskComponent>,
                      @Inject(MAT_DIALOG_DATA) public data:any, private taskService: TaskService) { }

  ngOnInit(): void {
  }

  deleteTask(): void {
      this.taskService.deleteTask(this.data.id).catch(console.error);
      this.dialogRef.close();
  }
}
