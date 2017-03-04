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


	  findAllStandardsForSubject(subjectkey:string):Observable<StandardModel[]> {
	  		let courselist$ = this.db.list(`standardsforcourse/${subjectkey}`)
	  						
	  		return this.findStandardsForStandardKeys(courselist$)
	  					.map(StandardModel.fromJsonList)	  				
	  }

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
