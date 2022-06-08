import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user/user.model';
import { UserServiceService } from 'src/app/services/UserService/user-service.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  public user: User
  @ViewChild('signUpForm') signUpForm: NgForm
  constructor(private userService: UserServiceService, public snackbar: MatSnackBar, private router: Router) { }

  ngOnInit(): void {
    this.user = new User('', '', '', '', '', '')
  }
  onSubmit() {
    if (this.signUpForm.invalid) {
      this.snackbar.open('Please Provide Valid Input','',{duration:3000})
    }
    else {
      this.userService.createUser(this.user).subscribe(
        response => this.snackbar.open('User Created Successfully', '', {
          duration: 3000
        }).afterDismissed().subscribe(
          () => this.router.navigate(['login'])
        ),
        error => this.snackbar.open('User Already Present.', 'Ok').onAction().subscribe(
          () => this.signUpForm.reset()
        )
      )
    }
  }

}
