import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/AuthenticationService/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLoggedIn = false;
  user = null;
  constructor(public authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isloggedIn();
    this.user = this.authService.getUser();
    this.authService.loginStatusSubject.asObservable().subscribe(data => {
      this.isLoggedIn = this.authService.isloggedIn();
      this.user = this.authService.getUser().username;
    })
  }

  logout() {
    this.authService.logout();
    this.isLoggedIn = false;
    this.user = null;
    this.router.navigate(['login']);
  }

}
