import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-student',
  templateUrl: './my-student.component.html',
  styleUrls: ['./my-student.component.css']
})
export class MyStudentComponent implements OnInit {
	navLinks = [ { link: 'dashboard', label: 'Dashboard'},
	             { link: 'subjects', label: 'Subjects' },
	             { link: 'pathway', label: 'Pathway' },
	             { link: 'goals', label: 'Goals' },
	             ]
	             
  constructor() { }

  ngOnInit() {
  }

}
