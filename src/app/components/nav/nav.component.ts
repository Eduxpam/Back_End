import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  showNav = false;
  nomeuser = '';

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
    if (this.authService.user != null) {
      this.showNav = true;
    }
  }


  logout() {
    this.authService.logout();
  }

  useron() {
    if (this.authService.user != null) {
      return true;
    }
    return false;
  }

}
