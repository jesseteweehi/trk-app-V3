import { Component, OnInit, Input } from '@angular/core';
import {StudentModel} from '../models/student';

@Component({
  selector: 'app-my-pathways-list',
  templateUrl: './my-pathways-list.component.html',
  styleUrls: ['./my-pathways-list.component.css']
})
export class MyPathwaysListComponent implements OnInit {
	@Input() student: StudentModel

  constructor() { }

  ngOnInit() {
  }

}
