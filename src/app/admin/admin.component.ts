import { Component, OnInit, Inject } from '@angular/core';
import { standards, subjects, students }  from '../data/db'
import {firebaseConfig} from "../app.module";
import {AngularFireDatabase, FirebaseRef} from "angularfire2";


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
	sdkDb:any;

  constructor(@Inject(FirebaseRef) fb,) { 
  this.sdkDb = fb.database().ref();}

  ngOnInit() {
  }


  standards(){
  	standards.forEach( standard => {
  		console.log('adding standard')

  		this.sdkDb.child('standards').push({
  			number:standard.number,
  			domain:standard.domain,
  			standardtype:standard.standardtype,
  			assessmenttype:standard.assessmenttype,
  			level:standard.level,
  			title:standard.title,
  			credits:standard.credits,
  			l1literacy:standard.L1literacy,
  			l1numeracy:standard.L1numeracy,
  			UEliteract:standard.UEliteracy
  		})
  	})
  }

  subjects(){
  	subjects.forEach( subject => {
  		console.log('adding subject')

  		this.sdkDb.child('subjects').push({
  			code:subject.code,
  			name:subject.name,
  			faculty:subject.faculty,
  			description:subject.description
  		})
  	})
  }

  students(){
  	students.forEach( student => {
  		console.log('adding student')

  		this.sdkDb.child('students').push({
  			studentIdentification:student.student_id,
  			firstName:student.first_name,
  			lastName:student.last_name,
  			imageUrl:student.avatar,
  		})
  	})
  }
}
