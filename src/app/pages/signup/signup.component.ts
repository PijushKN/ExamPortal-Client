import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user/user.model';
import { UserServiceService } from 'src/app/services/UserService/user-service.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  public user:User
  constructor(private userService:UserServiceService) { }

  ngOnInit(): void {
    this.user = new User('','','','','','')
  }
  onSubmit(){
    this.userService.createUser(this.user).subscribe(
      response=>alert('User Created'),
      error=>alert('User Exists.Please Login')
    )
  }

}
