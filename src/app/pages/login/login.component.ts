import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserLoginDetails } from 'src/app/models/login/user-login-details.model';
import { AuthService } from 'src/app/services/AuthenticationService/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginDetails: UserLoginDetails;
  @ViewChild('loginForm') loginForm: NgForm

  constructor(public snackBar: MatSnackBar, private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.loginDetails = new UserLoginDetails('', '')
  }

  onLoginSubmit() {
    if (this.loginForm.invalid) {
      // this.snackBar.open('Please Provide Valid Input','',{duration:3000})
      this.snackBar.open('Please Provide Valid Input', 'OK', { duration: 3000 })
    }
    else {
      console.log('submitted')
      this.auth.generateToken(this.loginDetails).subscribe(
        (response: any) => {
          this.auth.setToken(response.token);
          this.auth.getCurrentUser().subscribe(
            (response) => {
              this.auth.setUser(response);
              if (this.auth.getUserRole() == 'ADMIN') {
                this.router.navigate(['admin-dashboard']);
                this.auth.loginStatusSubject.next(true)
              }
              else if (this.auth.getUserRole() == 'NORMAL') {
                this.router.navigate(['user-dashboard']);
                this.auth.loginStatusSubject.next(true)
              } else {
                this.auth.logout();
              }
            }
          );
        },
        error => this.snackBar.open('Invalid Username or Password','',{duration:3000})
      )

    }
  }

}
