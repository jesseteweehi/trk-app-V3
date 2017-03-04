import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { StudentService } from '../shared/student.service';
import {StudentModel} from '../models/student';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-my-student',
  templateUrl: './my-student.component.html',
  styleUrls: ['./my-student.component.css']
})
export class MyStudentComponent implements OnInit {

	student: StudentModel

  constructor(
  	private route: ActivatedRoute,
  	private router: Router,
  	private studentservice: StudentService
  	) { }

  ngOnInit() {
  		this.route.params
  			.switchMap((params: Params) => this.studentservice.findSingleStudentByKey(params['id']))
  			.subscribe(student => this.student = student);
  }

}
