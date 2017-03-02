import { Component, OnInit } from '@angular/core';
import { SubjectModel } from '../models/subject';
import { StandardModel } from '../models/standard';
import { SubjectService } from '../shared/subject.service';
import { StandardService } from '../shared/standard.service';

@Component({
  selector: 'app-subject-list',
  templateUrl: './subject-list.component.html',
  styleUrls: ['./subject-list.component.css']
})

export class SubjectListComponent implements OnInit {
	edited: boolean = false;

	subjectlist: SubjectModel[];
  standardlist: StandardModel[];

  // subjectsstandards: Array<StandardModel> = [];


  	constructor(private subjectservice: SubjectService,
                private standardservice: StandardService) { }

  	ngOnInit() {
  		this.subjectservice.findAllSubjects()
  		.subscribe(subjects => this.subjectlist = subjects)

      this.standardservice.findAllStandards()
      .subscribe(standards => this.standardlist = standards)
  	}

  	open() {
  		this.edited = true
  	}

  	close() {
  		this.edited = false
  	}

    transferDataSuccess(subject,$event: any) {
      this.standardservice.createStandardForSubject(subject.$key,$event.dragData.$key)
      // this.subjectsstandards.push($event.dragData)
    }
}
