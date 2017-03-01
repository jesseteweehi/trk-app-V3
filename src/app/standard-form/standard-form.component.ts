import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { StandardService } from '../shared/standard.service'

@Component({
  selector: 'app-standard-form',
  templateUrl: './standard-form.component.html',
  styleUrls: ['./standard-form.component.css']
})
export class StandardFormComponent implements OnInit {

	form: FormGroup;

  	constructor(private fb:FormBuilder,
  				private standardservice: StandardService) {

  	    this.form = this.fb.group({
            field: [''],
            subfield: [''],
            domain: [''],
            standardtype: [''],
            assessmenttype: [''],
            level: [''],
            number: [''],
            title: [''],
            credits: ['']
  		})
  	}

  	create(form) {
  	  this.standardservice.createNewStandard(form.value)
  	}

 	ngOnInit() {}
}		


