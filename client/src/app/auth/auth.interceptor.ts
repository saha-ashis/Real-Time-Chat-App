import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Router } from "@angular/router";
import { UserService } from "../shared/user.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor{
    
    constructor(){}

    intercept(req:HttpRequest<any>, next: HttpHandler){
        
    }
}