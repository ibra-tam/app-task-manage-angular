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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StatTaskComponent } from './stat-task/stat-task.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';



export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, '../assets/i18n/', '.json');
}
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
    FormsModule,
    AngularFireAuthModule,
    HttpClientModule ,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    TranslateModule.forRoot({
      defaultLanguage: 'fr',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
