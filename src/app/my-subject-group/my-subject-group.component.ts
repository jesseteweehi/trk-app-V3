import { Component, OnInit, Input } from '@angular/core';
import {StudentModel} from '../models/student';
import {SubjectGroupModel} from '../models/subject-group';
import {SubjectModel} from '../models/subject';
import { MyStudentService } from '../shared/my-student.service'

@Component({
  selector: 'app-my-subject-group',
  templateUrl: './my-subject-group.component.html',
  styleUrls: ['./my-subject-group.component.css']
})
export class MySubjectGroupComponent implements OnInit {
  @Input() student: StudentModel

  subjectGroupList : SubjectGroupModel[]

  constructor(private mystudentservice: MyStudentService) { }

  ngOnInit() {
  	this.mystudentservice.findSubjectGroupForStudent(this.student.$key)
  		.subscribe(subjectgroup => this.subjectGroupList = subjectgroup)
  }

}
