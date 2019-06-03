import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as io from 'socket.io-client';
import {Observable} from 'rxjs/Observable';

import {UserService} from './user.service';
import {User} from './user.model';
import { environment } from '../../environments/environment';

@Injectable()
export class ChatService {

  private socket=io(environment.apiBaseUrl);
  
  constructor(private http: HttpClient) { }

  joinTheRoom(data){
    this.socket.emit('join',data);
  }

}
