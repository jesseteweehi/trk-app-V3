import { Component, OnInit } from '@angular/core';
import {MdSnackBar} from '@angular/material';

@Component({
  selector: 'app-standard-list',
  templateUrl: './standard-list.component.html',
  styleUrls: ['./standard-list.component.css']
})
export class StandardListComponent implements OnInit {
	simpleDrop: any = null;

  
	

    transferData: Object = {id: 1, msg: 'Hello'};
    receivedData: Array<any> = [];
    receivedData2: Array<any> = [];

    transferDataSuccess($event: any) {
    	if (this.receivedData.length < 4 ) {
            this.receivedData.push($event);
    		}
        else {
          this.snackBar.open('Max of 4 Subjects', 'Undo', {
            duration: 3000
          })        
      }
    }

    transferDataSuccess2($event: any) {
    	if (this.receivedData2.length < 4 ) {
            this.receivedData2.push($event);
        }
      }
      


  constructor(public snackBar: MdSnackBar) { 
   
  }

  ngOnInit() {
  }

}


