import { Component, OnInit, Input } from '@angular/core';
import {MdSnackBar} from '@angular/material';

@Component({
  selector: 'app-my-subject-list',
  templateUrl: './my-subject-list.component.html',
  styleUrls: ['./my-subject-list.component.css']
})
export class MySubjectListComponent implements OnInit {


	

	constructor(public snackBar: MdSnackBar) { 
	   
	}

	ngOnInit() {}
}
