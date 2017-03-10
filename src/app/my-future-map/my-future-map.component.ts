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

	standardlist: StandardModel[]


  	constructor(private mystudentservice: MyStudentService) { }

  	ngOnInit() {
  		this.mystudentservice.findStandardsforCourses(this.student.$key)
  			.subscribe(standards => this.standardlist = standards)

  	}

  	level1(a) {
  		if (a) {
  		const level1standards = a.filter(x => x.level === 1)
 
  		return this.standardlist = level1standards

  		}

  		}
  	}

}
