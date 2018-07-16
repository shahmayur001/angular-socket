import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';

import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  greetings: string[] = [];
  showConversation: boolean = false;
  ws: any;
  name: string;
  disabled: boolean;

  constructor(){}

  connect() {
  	//connect to stomp where stomp endpoint is exposed
    let socket = new SockJS("http://206.189.136.143:8010/order-book/ETHBCH");
    // let socket = new WebSocket("http://206.189.136.143:8010");
    this.ws = Stomp.over(socket);
    let that = this;
    this.ws.connect({}, function(frame) {
      
      that.ws.subscribe("/order/book/ETHBCH", function(message) {
        console.log(message)
        that.showGreeting(message.body);
      });
      that.disabled = true;
    }, function(error) {
      alert("STOMP error " + error);
    });
  }


  disconnect() {
    if (this.ws != null) {
      this.ws.ws.close();
    }
    this.setConnected(false);
    console.log("Disconnected");
  }

  // sendName() {
  //   let data = JSON.stringify({
  //     'name' : this.name
  //   })
  //   this.ws.send("/app/message", {}, data);
  // }

  showGreeting(message) {
    this.showConversation = true;
    this.greetings.push(message)
    console.log(this.greetings);
  }

  setConnected(connected) {
    this.disabled = connected;
    this.showConversation = connected;
    this.greetings = [];
  }
}