import { Component } from '@angular/core';
import { AuthService } from './security/auth.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  	public editorContent: string = 'My Document\'s Title';

    navLinks = [ { link: 'standards', label: 'Standards'},
                 { link: 'subjects', label: 'Subjects' },
                 { link: 'students', label: 'Students' }
                 ]
  

	constructor(private as: AuthService) {
	}

  	ngOnInit(){
  	}

	login() {
      this.as.login();
	}

	logout() {
	    this.as.logout();
	}



	
}
