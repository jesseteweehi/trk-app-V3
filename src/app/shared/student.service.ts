import {Injectable, Inject} from '@angular/core';
import {Observable, Subject} from "rxjs/Rx";
import {StudentModel} from '../models/student'
import {AngularFireDatabase, FirebaseRef} from "angularfire2";
import {Http} from "@angular/http";

@Injectable()
export class StudentService {

  	sdkDb:any;

  	constructor(private db:AngularFireDatabase, @Inject(FirebaseRef) fb,
              private http:Http) {

    this.sdkDb = fb.database().ref();

  }
  findSingleStudentByKey(studentkey: string): Observable<StudentModel> {
    
    return this.db.object(`students/${studentkey}`)
              .map(StudentModel.fromJson)

  }

  // findLessonByUrl(url:string):Observable<Lesson> {
  //     return this.db.list('lessons', {
  //         query: {
  //             orderByChild: 'url',
  //             equalTo: url
  //         }
  //     })
  //     .filter(results => results && results.length > 0)
  //     .map(results => Lesson.fromJson(results[0]))
  //     .do(console.log);
  // }

  findAllStudents(): Observable<StudentModel[]> {

  	return this.db.list('students')
            .map(StudentModel.fromJsonList);
  }

  createNewStudent(student:any): Observable<any> {

        const lessonToSave = Object.assign({}, student);

        const newLessonKey = this.sdkDb.child('students').push().key;

        let dataToSave = {};

        dataToSave["students/" + newLessonKey] = lessonToSave;
        


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
