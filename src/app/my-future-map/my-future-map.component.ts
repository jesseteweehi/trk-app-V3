import { Component, OnInit, Input } from '@angular/core';
import {Observable, Subject} from "rxjs/Rx";
import { StudentModel } from '../models/student';
import { StandardModel } from '../models/standard';
import { MyStudentService } from '../shared/my-student.service'

@Component({
  selector: 'app-my-future-map',
  templateUrl: './my-future-map.component.html',
  styleUrls: ['./my-future-map.component.css']
})
export class MyFutureMapComponent implements OnInit {
	@Input() student: StudentModel
	l1check: boolean = false;
	l2check: boolean = false;
	l3check: boolean = false;

	standards$: Observable<any>

	standardlist: StandardModel[];
	filteredlist: StandardModel[];

	
  	constructor(private mystudentservice: MyStudentService) { }

  	ngOnInit() {
  	this.mystudentservice.findStandardsforCourses(this.student.$key)
  			.subscribe(standards => this.standardlist = this.filteredlist = standards);








  	}

  	setlevel() {
  		console.log('checked')
  		let level1standards : StandardModel[] = []
  		let level2standards : StandardModel[] = []
  		let level3standards : StandardModel[] = []

  		if (this.l1check) {
  			level1standards = this.standardlist.filter(x => x.level == '1');
  		}

  		if (this.l2check) {
  			level2standards = this.standardlist.filter(x => x.level == '2');
  		}

  		if (this.l3check) {
  			level3standards = this.standardlist.filter(x => x.level == '3');
  		}

  		let n : StandardModel[] = []

  		if (this.l1check === true || this.l2check === true || this.l3check === true) {
  			console.log('some')
  			this.filteredlist = n.concat(level1standards,level2standards,level3standards)
  		}
  		else {
  			console.log('none')
  			this.filteredlist = this.standardlist
  		}


  	}
}


// What does the dashboard need?
// NCEA Levels Certification.
// Literacy
// Numeracy
// UE Literacy Reading
// UE Literacy Writing
// Vocational Pathway