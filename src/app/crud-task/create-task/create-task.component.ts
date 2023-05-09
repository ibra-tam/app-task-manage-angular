import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent implements OnInit {

  public createTask! : FormGroup;


  constructor( private taskService: TaskService, private fb: FormBuilder,private dialog: MatDialog ) { }

  ngOnInit(): void {
    this.createTaskForm();
  }

  createTaskForm() {
    this.createTask = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      status: new FormControl('Plannifier' , Validators.required),
      
    });
  }


    createNewTask() : void{
      this.dialog.closeAll();
      this.createTask.value.status = 0;
      this.taskService.createTask(this.createTask.value).then(task => {(task)
      }, (error: any) => {
        console.log(error);
      });
    }
}
