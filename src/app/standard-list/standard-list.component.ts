import { Component, OnInit } from '@angular/core';
import { StandardModel } from '../models/standard';
import { StandardService } from '../shared/standard.service';

@Component({
  selector: 'app-standard-list',
  templateUrl: './standard-list.component.html',
  styleUrls: ['./standard-list.component.css']
})
export class StandardListComponent implements OnInit {
    edited: boolean = false;

    standardlist: StandardModel[];

      constructor(private standardservice: StandardService) { }

      ngOnInit() {
        this.standardservice.findAllStandards()
        .subscribe(standards => this.standardlist = standards)
      }

      open() {
        this.edited = true
      }

      close() {
        this.edited = false
      }
  }


