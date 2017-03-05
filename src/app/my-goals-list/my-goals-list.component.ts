import { Component, OnInit, Input } from '@angular/core';
import {StudentModel} from '../models/student';
import { MyStudentService } from '../shared/my-student.service'
import {RecordModel} from '../models/record'

@Component({
  selector: 'app-my-goals-list',
  templateUrl: './my-goals-list.component.html',
  styleUrls: ['./my-goals-list.component.css']
})
export class MyGoalsListComponent implements OnInit {
  edited: boolean = false
  showtitle: string = ''

	recordslist: RecordModel[];

	@Input() student: StudentModel

	public editorContent: string = '<p>SMART Goal Planning Form</p><p><span>Specific &ndash; WHO? WHAT?</span></p><p>Measurement/Assessment &ndash; HOW?</p><p><span>Attainable/Achieve &ndash; REASONABLE?</span></p><p>Relevant &ndash; EXPECTED RESULT?</p><p><span>By</span></p><p>Timed &ndash; WHEN?</p>'

  constructor(private mystudentservice: MyStudentService) { }

  ngOnInit() {
    this.mystudentservice.findallGoalsForStudent(this.student.$key)
      .subscribe(goals => this.recordslist = goals)

  }

  savenew() {
  	const editorToSave = {};
    editorToSave['content'] = this.editorContent
    editorToSave['modified'] = Date.now()
    editorToSave['title'] = 'New Goal'

    this.mystudentservice.createNewGoal(this.student.$key, editorToSave)
    this.edited = true

  }

  // save(recordkey : string) {
  //     this.mystudentservice.updateGoalRecord(recordkey, this.editorContent)
  // }

  delete(recordkey:string) {
    if (this.recordslist.length > 1) {
        this.mystudentservice.deleteGoal(this.student.$key, recordkey);
    }
    else {
      this.mystudentservice.deleteGoal(this.student.$key, recordkey);
      this.recordslist = null;
      }
    } 
  

  load(s:string) {
  	this.editorContent = s 
  }

  update(recordkey:string) {
    const editorToSave = {};
    editorToSave['content'] = this.editorContent
    editorToSave['modified'] = Date.now()
    this.mystudentservice.updateGoalRecord(recordkey, editorToSave)
  }

  show() {
    this.edited = true
  }

  
  close() {
    this.edited = false
  }

  unhide(recordkey:string) {
    this.showtitle = recordkey
  }

  savetitle(recordkey:string, value:string) {
    this.mystudentservice.updateGoalTitle(recordkey, value)
    this.showtitle = ''
  }


}
