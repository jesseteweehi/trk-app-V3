import {Injectable, Inject} from '@angular/core';
import {Observable, Subject} from "rxjs/Rx";
import {SubjectModel} from '../models/subject'
import {AngularFireDatabase, FirebaseRef} from "angularfire2";
import {Http} from "@angular/http";

@Injectable()
export class SubjectService {

  	sdkDb:any;

  	constructor(private db:AngularFireDatabase, @Inject(FirebaseRef) fb,
  	            private http:Http) {

  	this.sdkDb = fb.database().ref();

  	}

  	findAllSubjects(): Observable<SubjectModel[]> {

  		return this.db.list('subjects')
  			.map(SubjectModel.fromJsonList)
  	}


  	createNewSubject(subject:any): Observable<any> {

  		      const subjectToSave = Object.assign({}, subject);

  		      const newSubjectKey = this.sdkDb.child('students').push().key;

  		      let dataToSave = {};

  		      dataToSave["subjects/" + newSubjectKey] = subjectToSave;
  		      


  		      return this.firebaseUpdate(dataToSave);
  		}

  		  firebaseUpdate(dataToSave) {
  		      const subject = new Subject();

  		      this.sdkDb.update(dataToSave)
  		          .then(
  		              val => {
  		                  subject.next(val);
  		                  subject.complete();

  		              },
  		              err => {
  		                  subject.error(err);
  		                  subject.complete();
  		              }
  		          );

  		      return subject.asObservable();

  	}

}
