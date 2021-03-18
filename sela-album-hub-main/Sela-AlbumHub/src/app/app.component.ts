import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit{
  title = 'Sela-AlbumHub';

  show: boolean = false

  constructor(
    private cookieService: CookieService
  ){}

  ngOnInit(){
    this.privateSymbolDisplay()
  }

  //set the visabillity of the private icon
  privateSymbolDisplay(){
    if(this.cookieService.get("isPrivate") === "isPrivateTrue"){
      this.show = true
    }else{
      this.show = false
    }
  }
}
