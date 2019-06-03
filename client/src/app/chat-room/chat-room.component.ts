import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../shared/user.service';
import { ChatService } from '../shared/chat.service';


@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.css']
})
export class ChatRoomComponent implements OnInit {

  constructor(private userService : UserService, private chatService : ChatService,  private router : Router) { }

  ngOnInit() {
    if(this.userService.isUserLoggedIn){
      this.chatService.joinTheRoom({user:'ashis',room:'lobby'});
    }
  }

}
