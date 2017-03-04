import { Component, OnInit, Input } from '@angular/core';
import {StudentModel} from '../models/student';


@Component({
  selector: 'app-my-dashboard',
  templateUrl: './my-dashboard.component.html',
  styleUrls: ['./my-dashboard.component.css']
})
export class MyDashboardComponent implements OnInit {
	@Input() student: StudentModel

  constructor() { }

  ngOnInit() {
  }

}
