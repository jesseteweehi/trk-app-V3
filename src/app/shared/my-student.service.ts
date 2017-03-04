import {Injectable, Inject} from '@angular/core';
import {Observable, Subject} from "rxjs/Rx";
import {StudentModel} from '../models/student'
import {RecordModel} from '../models/record'
import {AngularFireDatabase, FirebaseRef} from "angularfire2";
import {Http} from "@angular/http";


@Injectable()
export class MyStudentService {

	sdkDb:any;

	constructor(private db:AngularFireDatabase, 
				@Inject(FirebaseRef) fb,
	            private http:Http
	            ) {

	this.sdkDb = fb.database().ref();



	}

	findGoalsForStudentKeys(goalKeys$: Observable<any[]>) :Observable<any> {
		return goalKeys$
			.map(gps => gps.map(goalkey => this.db.object('goals/' + goalkey.$key)))
			.flatMap(fbojs => Observable.combineLatest(fbojs))
			

	}

	findallGoalsForStudent(studentKey:string): Observable<RecordModel[]> {
		return this.findGoalsForStudentKeys(this.db.list(`goalsforstudent/${studentKey}`))
			.map(RecordModel.fromJsonList)
			.do(console.log)
	}

	createNewGoal(studentKey, record:any): Observable<any> {

	      const recordToSave = Object.assign({'created': Date.now() }, record);

	      const newRecordKey = this.sdkDb.child('goals').push().key;

	      let dataToSave = {};

	      dataToSave["goals/" + newRecordKey] = recordToSave;
	      dataToSave["goalsforstudent/" + studentKey + "/" + newRecordKey] = true

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
