import { Component, OnInit, Input } from '@angular/core';
import {StudentModel} from '../models/student';
import { MyStudentService } from '../shared/my-student.service'
import {RecordModel} from '../models/record'

@Component({
  selector: 'app-my-pathways-list',
  templateUrl: './my-pathways-list.component.html',
  styleUrls: ['./my-pathways-list.component.css']
})
export class MyPathwaysListComponent implements OnInit {
	  edited: boolean = false
	  showtitle: string = ''

		recordslist: RecordModel[];

		@Input() student: StudentModel

		public editorContent: string = '<p>SMART Goal Planning Form</p><p><span>Specific &ndash; WHO? WHAT?</span></p><p>Measurement/Assessment &ndash; HOW?</p><p><span>Attainable/Achieve &ndash; REASONABLE?</span></p><p>Relevant &ndash; EXPECTED RESULT?</p><p><span>By</span></p><p>Timed &ndash; WHEN?</p>'

	  constructor(private mystudentservice: MyStudentService) { }

	  ngOnInit() {
	    this.mystudentservice.findallPathwaysForStudent(this.student.$key)
	      .subscribe(pathways => this.recordslist = pathways)

	  }

	  savenew() {
	  	const editorToSave = {};
	    editorToSave['content'] = this.editorContent
	    editorToSave['modified'] = Date.now()
	    editorToSave['title'] = 'New Goal'

	    this.mystudentservice.createNewPathway(this.student.$key, editorToSave)
	    this.edited = true

	  }

	  // save(recordkey : string) {
	  //     this.mystudentservice.updateGoalRecord(recordkey, this.editorContent)
	  // }

	  delete(recordkey:string) {
	    if (this.recordslist.length > 1) {
	        this.mystudentservice.deletePathway(this.student.$key, recordkey);
	    }
	    else {
	      this.mystudentservice.deletePathway(this.student.$key, recordkey);
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
	    this.mystudentservice.updatePathwayRecord(recordkey, editorToSave)
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
	    this.mystudentservice.updatePathwayTitle(recordkey, value)
	    this.showtitle = ''
	  }


	}
