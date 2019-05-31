import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  userDetails;
  constructor(private userService : UserService,private router : Router){}

  ngOnInit() {

    this.userService.getTheUserProfile().subscribe(
      res=>{
        this.userDetails=res['user']; 
      },
      err=>{

      }
    )
  }

  logoutTheUser(){
    this.userService.removeTheJwtToken();
    this.router.navigateByUrl('/signin');
  }

}
