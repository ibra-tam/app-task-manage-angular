import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-update-task',
  templateUrl: './update-task.component.html',
  styleUrls: ['./update-task.component.css']
})
export class UpdateTaskComponent implements OnInit {

  public updateTask! : FormGroup;

  constructor( public dialogRef: MatDialogRef<UpdateTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any, private taskService: TaskService) { }

 
  ngOnInit(): void {
    this.updateTaskForm();
  }

  updateTaskForm() {
    this.updateTask = new FormGroup({
      name: new FormControl(this.data.name, Validators.required),
      description: new FormControl(this.data.description, Validators.required),
     
  });
  }


    UpdateTask() : void{
      this.dialogRef.close();
      this.taskService.editTask(this.updateTask.value, this.data.id).then(task => {(task)
      }, (error: any) => {
        console.log(error);
      });
    }

}
