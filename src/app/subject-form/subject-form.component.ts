import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { SubjectService } from '../shared/subject.service'

@Component({
  selector: 'app-subject-form',
  templateUrl: './subject-form.component.html',
  styleUrls: ['./subject-form.component.css']
})
export class SubjectFormComponent {

	faculties: any[] = [
	    {value: 'Arts', viewValue: 'Arts'},
	    {value: 'Languages', viewValue: 'Languages'},
	    {value: 'Physical Education', viewValue: 'Physical Education'},
	    {value: 'Science', viewValue: 'Science'},
	    {value: 'Social Science', viewValue: 'Social Science'},
	    {value: 'Mathematics', viewValue: 'Mathematics'},
	    {value: 'Technology', viewValue: 'Technology'},
	    {value: 'English', viewValue: 'English'}
	  ];


  	form: FormGroup;

  	constructor(private fb:FormBuilder,
  				      private subjectService: SubjectService) {

  	    this.form = this.fb.group({
            code: [''],
            name: [''],  
  	        faculty: [''],
            description: ['']
  	    	});


  	}

    create(form) {
      this.subjectService.createNewSubject(form.value)
    }

}
