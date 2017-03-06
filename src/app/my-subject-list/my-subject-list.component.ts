import { Component, OnInit, Input } from '@angular/core';
import { SubjectGroupModel } from '../models/subject-group';
import { SubjectModel } from '../models/subject';
import { MdSnackBar } from '@angular/material';
import { MyStudentService} from '../shared/my-student.service'



@Component({
  selector: 'app-my-subject-list',
  templateUrl: './my-subject-list.component.html',
  styleUrls: ['./my-subject-list.component.css']
})
export class MySubjectListComponent implements OnInit {
	@Input() subjectgroup: SubjectGroupModel

	subjectslist: SubjectModel[]

	constructor(
				private mystudentservice: MyStudentService) { 
	   
	}

	ngOnInit() {
		this.mystudentservice.findSubjectsForSubjectGroup(this.subjectgroup.$key)
			.subscribe(subjects => this.subjectslist = subjects)
	}
}
