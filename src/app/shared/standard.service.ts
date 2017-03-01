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
