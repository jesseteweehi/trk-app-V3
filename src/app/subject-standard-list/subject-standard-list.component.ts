import { Component, OnInit, Input } from '@angular/core';
import { StandardService } from '../shared/standard.service';
import { StandardModel } from '../models/standard';

@Component({
  selector: 'app-subject-standard-list',
  templateUrl: './subject-standard-list.component.html',
  styleUrls: ['./subject-standard-list.component.css']
})
export class SubjectStandardListComponent implements OnInit {
	@Input() subject: any

	standardslist: StandardModel[];

  constructor(private standardservice: StandardService ) { }

  ngOnInit() {
  	this.standardservice.findAllStandardsForSubject(this.subject.$key)
  		.subscribe(standards => this.standardslist = standards)
  }

}
