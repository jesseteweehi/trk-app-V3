import {Injectable, Inject} from '@angular/core';
import {Observable, Subject} from "rxjs/Rx";
import {StudentModel} from '../models/student'
import {RecordModel} from '../models/record'
import {AngularFireDatabase, FirebaseRef} from "angularfire2";
import {Http} from "@angular/http";
import {firebaseConfig} from "../app.module";


@Injectable()
export class MyStudentService {

	sdkDb:any;

	constructor(private db:AngularFireDatabase, 
				@Inject(FirebaseRef) fb,
	            private http:Http
	            ) {

	this.sdkDb = fb.database().ref();

	}

	updatePathwayRecord(recordkey:string, record:any) {

		let dataToSave = {};

		dataToSave["pathways/" + recordkey + '/' + 'modified'] = record.modified;
		dataToSave["pathways/" + recordkey + '/' + 'content'] = record.content;
		
		return this.firebaseUpdate(dataToSave);
	}

	updatePathwayTitle(recordkey:string, title:string) {
		const item$ = this.db.object('pathways/' + recordkey)
		item$.update({ title: title})
	}

	deletePathway(studentkey: string,  pathwaykey:string) {

		const item$ = this.db.object(`pathwaysforstudent/${studentkey}/${pathwaykey}`);
		item$.remove();
		
    }

	findPathwaysForStudentKeys(pathwayKeys$: Observable<any[]>) :Observable<any> {
		return pathwayKeys$
			.map(gps => gps.map(pathkey => this.db.object('pathways/' + pathkey.$key)))
			.flatMap(fbojs => Observable.combineLatest(fbojs))
			

	}

	findallPathwaysForStudent(studentKey:string): Observable<RecordModel[]> {
		return this.findPathwaysForStudentKeys(this.db.list(`pathwaysforstudent/${studentKey}`))
			.map(RecordModel.fromJsonList)
			.do(console.log)
	}

	createNewPathway(studentKey, record:any): Observable<any> {

	      const recordToSave = Object.assign({'created': Date.now() }, record);

	      const newRecordKey = this.sdkDb.child('pathways').push().key;

	      let dataToSave = {};

	      dataToSave["pathways/" + newRecordKey] = recordToSave;
	      dataToSave["pathwaysforstudent/" + studentKey + "/" + newRecordKey] = true

	      return this.firebaseUpdate(dataToSave);
	}

	//////////	

	updateGoalRecord(recordkey:string, record:any) {

		let dataToSave = {};

		dataToSave["goals/" + recordkey + '/' + 'modified'] = record.modified;
		dataToSave["goals/" + recordkey + '/' + 'content'] = record.content;
		
		return this.firebaseUpdate(dataToSave);
	}

	updateGoalTitle(recordkey:string, title:string) {
		const item$ = this.db.object('goals/' + recordkey)
		item$.update({ title: title})
	}

	deleteGoal(studentkey: string,  goalkey:string) {

		const item$ = this.db.object(`goalsforstudent/${studentkey}/${goalkey}`);
		item$.remove();
		console.log(goalkey ,':deleted')

        // const url = firebaseConfig.databaseURL + '/goalsforstudent/' + studentkey +'/'+ goalkey + '/' + true + '.json';
        // console.log(url)

        // return this.http.delete(url);
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
