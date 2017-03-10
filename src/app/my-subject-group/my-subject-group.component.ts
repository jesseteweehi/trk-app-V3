import { Component, OnInit, Input } from '@angular/core';
import {StudentModel} from '../models/student';
import {SubjectGroupModel} from '../models/subject-group';
import {SubjectModel} from '../models/subject';
import { MyStudentService } from '../shared/my-student.service'
import { SubjectService } from '../shared/subject.service';

@Component({
  selector: 'app-my-subject-group',
  templateUrl: './my-subject-group.component.html',
  styleUrls: ['./my-subject-group.component.css']
})
export class MySubjectGroupComponent implements OnInit {
  	@Input() student: StudentModel
	  subjectGroupList : SubjectGroupModel[]
    subjectslist: SubjectModel[]

  	constructor(private mystudentservice: MyStudentService,
                private subjectservice: SubjectService ) { }

  	ngOnInit() {
  		this.mystudentservice.findSubjectGroupForStudent(this.student.$key)
  			.subscribe(subjectgroup => this.subjectGroupList = subjectgroup)

      this.subjectservice.findAllSubjects()
      .subscribe(subjects => this.subjectslist = subjects)
  	}

    transferDataSuccess(groupkey:string, subjectkey: string) {
        
         this.mystudentservice.createSubjectForGroup(groupkey, subjectkey)
    }

    removeGroupClicked(groupkey:string) {
      if (this.subjectGroupList.length > 1) {this.mystudentservice.removeGroup(this.student.$key,groupkey)}
      else{
        this.mystudentservice.removeGroup(this.student.$key,groupkey);
        this.subjectGroupList = null}
   
    }

}
