import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TaskService } from '../services/task.service';
import { ITask } from '../models/task';
import { Chart, registerables } from 'chart.js';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-stat-task',
  templateUrl: './stat-task.component.html',
  styleUrls: ['./stat-task.component.less']
})
export class StatTaskComponent implements OnInit, AfterViewInit {

  public onGetAllTask!: Subscription;
  taskPlanned!: ITask[];
  taskInProgress!: ITask[];
  taskCompleted!: ITask[];
  public htmlElementOfTask!: string;
  public chart!: any;
  public allTasks!: ITask[];




  constructor(private taskService: TaskService,
    private translateService: TranslateService
    
    ) {
    Chart.register(...registerables);
    this.htmlElementOfTask = 'taskChart';
   }

  ngOnInit(): void {     
    this.onGetAllTask = this.taskService.taskSubject.subscribe({
      next: (task) => {
        this.allTasks = task;
      },
         error: (console.error)
      });
    }

    ngAfterViewInit(): void {
      this.getTaskbyStatus(this.allTasks);
    }



    getTaskbyStatus(task: ITask[]) {
      if (task) {
      this.taskPlanned = task.filter((task) => task.status === 0);
      this.taskInProgress = task.filter((task) => task.status === 1);
      this.taskCompleted = task.filter((task) => task.status === 2);
      this.createChartActivities(this.taskPlanned, this.taskInProgress, this.taskCompleted);
    }
  }

  public createChartActivities( taskPlanned: ITask[], taskInProgress: ITask[], taskCompleted: ITask[]):void {
    if(this.htmlElementOfTask) {
      const ctx = document.getElementById(this.htmlElementOfTask) as HTMLCanvasElement | null;
      if (ctx) {
          this.chart = new Chart(ctx!, {
            type: 'doughnut',
            data: {
              labels: ['Taches planifiées', 'Taches en cours', 'Taches terminées'],
              datasets: [
                {
                  label: 'Activités',
                  data: [
                    taskPlanned.length,
                    taskInProgress.length,
                    taskCompleted.length,
                  ],
                  backgroundColor: [
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                  ],
                  hoverOffset: 4,
                },
              ],
            },
            options: {
              responsive: true,
            },
          });
      }
  }
  }
  

}
