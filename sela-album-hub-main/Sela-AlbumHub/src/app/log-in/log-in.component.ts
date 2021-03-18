import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { EncrDecrServiceService } from '../services/encr-decr-service.service'
import { Location } from '@angular/common';


@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {
  //set password encrypten key
  key = "123456$#@$^@1ERF"
  @ViewChild('passInput')
  private passInput: ElementRef

  logOutDisplay: boolean
  logInDisplay: boolean

  constructor(
    private cookieService: CookieService,
    private EncrDecr: EncrDecrServiceService,
    private _location: Location
  ) { }

  ngOnInit(): void {
    this.BTNdisplay();
  }

  logIn() {
    //password validation
    if (this.cookieService.get("password") === null) {
      alert("please sign in first")
    } else {
      const decrPass = this.cookieService.get("password")
      let decrypted = this.EncrDecr.get(this.key, decrPass);

      if (decrypted === this.passInput.nativeElement.value) {
        this.cookieService.set("isPrivate", "isPrivateTrue")
        alert("welcome dear user")
      } else {
        this.cookieService.set("isPrivate", "isPrivateFalse")
        alert("wrong password, please try again")
      }
    }
  }

  logOut(){
    alert("you signed out from private mode")
    this.cookieService.set("isPrivate", "isPrivateFalse")
    this.backClicked()
  }

  
  backClicked() {
    this._location.back()
  }

 
  BTNdisplay(){
    // if loged out show log in button
    if( this.cookieService.get("isPrivate") === "isPrivateFalse"){
      this.logOutDisplay = false;
      this.logInDisplay = true;
    }else{
       // if loged in show log out button
      this.logOutDisplay = true;
      this.logInDisplay = false;
    }
  }
}
