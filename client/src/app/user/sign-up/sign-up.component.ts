import { Component, OnInit } from '@angular/core';
import {UserService} from '../../shared/user.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
  //providers: [UserService] // UserService class from the Service
})
export class SignUpComponent implements OnInit {

  emailRegx=/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  showSuccessMessage:boolean;
  errorMessage:string;

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm){
    this.userService.CreateTheUser(form.value).subscribe(
      res=>{
        this.showSuccessMessage=true;
        setTimeout(()=> this.showSuccessMessage=false,4000
        );
        this.resetTheRegForm(form);
      },
      err=>{
        console.log(err);
        if(err.status==='422'){
          this.errorMessage=err.error.join('<br/>');  
        }else{
          this.errorMessage='Oops! Something went wrong. Please try again.'
        }
        setTimeout(()=> this.errorMessage='',4000
        );
      }
    )
  }

  resetTheRegForm(form: NgForm){
    this.userService.selectedUser={
      name:'',
      email:'',
      password:''
    };
    form.resetForm();
    this.errorMessage='';
    //this.showSuccessMessage=false;
  }

}
