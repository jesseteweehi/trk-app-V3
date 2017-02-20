import { Component, OnInit } from '@angular/core';
import {StudentModel} from '../models/student'
import { StudentService } from '../shared/student.service'

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {
	edited: boolean = false;
  	
  	studentslist: StudentModel[];

  	constructor(private studentService: StudentService) { }

  	ngOnInit() {
  		this.studentService.findAllStudents()
  		.subscribe(students => this.studentslist = students)


  	}

  	open() {
  		this.edited = true
  	}

  	close() {
  		this.edited = false
  	}
}
