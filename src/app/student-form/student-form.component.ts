import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { StudentService } from '../shared/student.service'

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.css']
})
export class StudentFormComponent implements OnInit {

  form: FormGroup;

  constructor(private fb:FormBuilder,
  			      private studentService: StudentService) {

      this.form = this.fb.group({
          firstName: ['',Validators.required],
          lastName: ['',Validators.required],
          studentIdentification: ['',Validators.required],
          imageUrl: ['',Validators.required]
      	});


  }

  ngOnInit() {
  }

  create(form) {
  	this.studentService.createNewStudent(form.value)
  }

}
