import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
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
	@Output() removegroup: EventEmitter<string> = new EventEmitter<string>();
	@Input() subjectgroup: SubjectGroupModel;

	subjectslist: SubjectModel[];

	constructor(
				private mystudentservice: MyStudentService) { 
	   
	}

	ngOnInit() {

		this.mystudentservice.findSubjectsForSubjectGroup(this.subjectgroup.$key)
			.subscribe(subjects => this.subjectslist = subjects)
	}

	removeGroup(groupkey:string): void {
		this.removegroup.emit(groupkey)
	}

	removeSubject(subjectkey:string): void {
		if (this.subjectslist.length > 1) {
			this.mystudentservice.removeSubjectForGroup(this.subjectgroup.$key, subjectkey);
		}
		else {
			this.mystudentservice.removeSubjectForGroup(this.subjectgroup.$key, subjectkey);
			this.subjectslist = null;
		}
		
		
	}
	
}
