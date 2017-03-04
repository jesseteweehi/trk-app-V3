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

	recordslist: RecordModel[];

	@Input() student: StudentModel

	public editorContent: string = 'My Document\'s Title'

  constructor(private mystudentservice: MyStudentService) { }

  ngOnInit() {
    this.mystudentservice.findallGoalsForStudent(this.student.$key)
      .subscribe(goals => this.recordslist = goals)

  }

  save() {
  	const editorToSave = {};
    editorToSave['content'] = this.editorContent
    editorToSave['modified'] = Date.now()
    editorToSave['title'] = 'Title'

    this.mystudentservice.createNewGoal(this.student.$key, editorToSave)

  	

  }

  load(s:string) {
  	this.editorContent = s
  }

}
