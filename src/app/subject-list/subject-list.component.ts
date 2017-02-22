import { Component, OnInit } from '@angular/core';
import { SubjectModel } from '../models/subject';
import { SubjectService } from '../shared/subject.service';

@Component({
  selector: 'app-subject-list',
  templateUrl: './subject-list.component.html',
  styleUrls: ['./subject-list.component.css']
})

export class SubjectListComponent implements OnInit {
	edited: boolean = false;

	subjectlist: SubjectModel[];

  	constructor(private subjectservice: SubjectService) { }

  	ngOnInit() {
  		this.subjectservice.findAllSubjects()
  		.subscribe(subjects => this.subjectlist = subjects)
  	}

  	open() {
  		this.edited = true
  	}

  	close() {
  		this.edited = false
  	}
}
