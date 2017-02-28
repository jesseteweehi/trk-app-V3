import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import {RouterModule} from "@angular/router";
import {routerConfig} from "./route.config";

import {ReactiveFormsModule} from "@angular/forms";

import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';
import { MaterialModule } from '@angular/material';
import 'hammerjs';
import { FroalaEditorModule, FroalaViewModule } from 'angular2-froala-wysiwyg';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import {DndModule} from 'ng2-dnd';


import { AuthService } from './security/auth.service';
import { StudentService } from './shared/student.service'
import { SubjectService } from './shared/subject.service'


import { AppComponent } from './app.component';
import { StudentListComponent } from './student-list/student-list.component';
import { StudentFormComponent } from './student-form/student-form.component';
import { SubjectListComponent } from './subject-list/subject-list.component';
import { MySubjectListComponent } from './my-subject-list/my-subject-list.component';
import { SubjectFormComponent } from './subject-form/subject-form.component';
import { StandardListComponent } from './standard-list/standard-list.component'



export const firebaseConfig = {
    apiKey: "AIzaSyBLF6Pyh4BJPYhQlhO6ZiqBIdQYROec0AI",
    authDomain: "tracking-app-77db8.firebaseapp.com",
    databaseURL: "https://tracking-app-77db8.firebaseio.com",
    storageBucket: "tracking-app-77db8.appspot.com",
    messagingSenderId: "285724076007"
};

const myFirebaseAuthConfig = {
  provider: AuthProviders.Google,
  method: AuthMethods.Redirect
}

@NgModule({
  declarations: [
    AppComponent,
    StudentListComponent,
    StudentFormComponent,
    SubjectListComponent,
    SubjectFormComponent,
    MySubjectListComponent,
    SubjectListComponent,
    StandardListComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routerConfig),
    NgxDatatableModule,
    MaterialModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfig, myFirebaseAuthConfig),
    FroalaEditorModule.forRoot(), 
    FroalaViewModule.forRoot(),
    DndModule.forRoot() 

  ],
  providers: [AuthService, StudentService, SubjectService],
  bootstrap: [AppComponent]
})
export class AppModule { }
