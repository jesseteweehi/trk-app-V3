import { Component, OnInit, Input } from '@angular/core';
import { SubjectGroupModel } from '../models/subject-group';
import { SubjectModel } from '../models/subject';
import { MdSnackBar } from '@angular/material';


@Component({
  selector: 'app-my-subject-list',
  templateUrl: './my-subject-list.component.html',
  styleUrls: ['./my-subject-list.component.css']
})
export class MySubjectListComponent implements OnInit {
	@Input() subject: SubjectGroupModel




	

	constructor(public snackBar: MdSnackBar) { 
	   
	}

	ngOnInit() {}
}
