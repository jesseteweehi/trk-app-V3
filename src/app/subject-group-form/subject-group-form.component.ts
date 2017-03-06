import { Component, Input } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { MyStudentService } from '../shared/my-student.service'
import { StudentModel } from '../models/student'

@Component({
  selector: 'app-subject-group-form',
  templateUrl: './subject-group-form.component.html',
  styleUrls: ['./subject-group-form.component.css']
})
export class SubjectGroupFormComponent {
	@Input() student: StudentModel

	form: FormGroup;

  	constructor(private fb:FormBuilder,
  				private mystudentservice: MyStudentService) { 

  		this.form = this.fb.group({
  			name: [''],
  			description: [''],
  			timeframe: ['']
  		});

  	}

  	create(form) {
  		this.mystudentservice.createSubjectGroup(this.student.$key, form.value)
  		this.form.reset()
  	}

}
