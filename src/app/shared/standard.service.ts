import {Injectable, Inject} from '@angular/core';
import {Observable, Subject} from "rxjs/Rx";
import {StandardModel} from '../models/standard'
import {AngularFireDatabase, FirebaseRef} from "angularfire2";
import {Http} from "@angular/http";

@Injectable()
export class StandardService {

	  	sdkDb:any;

	  	constructor(private db:AngularFireDatabase, @Inject(FirebaseRef) fb,
	              private http:Http) {

	    this.sdkDb = fb.database().ref();

	  }

	  findAllStandards(): Observable<StandardModel[]> {

	  	return this.db.list('standards')
	            .map(StandardModel.fromJsonList);
	  }

	  createStandardForSubject(subject:string, standardkey:string) {
	  		let dataToSave = {};
	  		dataToSave["standardsforcourse/" + subject + '/' + standardkey] = true
	  	
	  		return this.firebaseUpdate(dataToSave);
	  } 

	  findStandardsForStandardKeys(standardKeys$: Observable<any[]>) :Observable<any> {
	  	return standardKeys$
	  		.map(sps => sps.map(standardkey => this.db.object('standards/' + standardkey.$key)))	
	  		.flatMap(fbojs => Observable.combineLatest(fbojs))
	  }

	  // findLessonsForLessonKeys(lessonKeys$: Observable<string[]>) :Observable<Lesson[]> {
	  //     return lessonKeys$
	  //         .map(lspc => lspc.map(lessonKey => this.db.object('lessons/' + lessonKey)) )
	  //         .flatMap(fbojs => Observable.combineLatest(fbojs) )

	  // }

	  // findLessonKeysPerCourseUrl(courseUrl:string,
	  //                            query: FirebaseListFactoryOpts = {}): Observable<string[]> {
	  //     return this.findCourseByUrl(courseUrl)
	  //         .do(val => console.log("course",val))
	  //         .filter(course => !!course)
	  //         .switchMap(course => this.db.list(`lessonsPerCourse/${course.$key}`,query))
	  //         .map( lspc => lspc.map(lpc => lpc.$key) );
	  // }

	  findAllStandardsForSubject(subjectkey:string):Observable<StandardModel[]> {
	  		let courselist$ = this.db.list(`standardsforcourse/${subjectkey}`)
	  						
	  		return this.findStandardsForStandardKeys(courselist$)
	  					.map(StandardModel.fromJsonList)
	  					.do(console.log)
	  		
	  		

	      // return this.findLessonsForLessonKeys(this.findLessonKeysPerCourseUrl(courseUrl));
	  }

	  	 


	  	// return lessonKeys$
	  	//     .map(lspc => lspc.map(lessonKey => this.db.object('lessons/' + lessonKey)) )
	  	//     .flatMap(fbojs => Observable.combineLatest(fbojs) )

	  createNewStandard(standard:any): Observable<any> {

	        const standardToSave = Object.assign({}, standard);

	        const newStandardKey = this.sdkDb.child('standards').push().key;

	        let dataToSave = {};

	        dataToSave["standards/" + newStandardKey] = standardToSave;
	        


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
