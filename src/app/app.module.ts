import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { AngularFireDatabase, AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireModule } from '@angular/fire/compat';
import { DashbordComponent } from './dashbord/dashbord.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { CreateTaskComponent } from './crud-task/create-task/create-task.component';
import { UpdateTaskComponent } from './crud-task/update-task/update-task.component';
import { DeleteTaskComponent } from './crud-task/delete-task/delete-task.component';
import { ReactiveFormsModule } from '@angular/forms';
import { StatTaskComponent } from './stat-task/stat-task.component';



@NgModule({
  declarations: [
    AppComponent,
    DashbordComponent,
    NavBarComponent,
    CreateTaskComponent,
    UpdateTaskComponent,
    DeleteTaskComponent,
    StatTaskComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.fireConfig),
    AngularFireDatabaseModule,
    MaterialModule,
    //AngularFireDatabase,
    AngularFireAuthModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
