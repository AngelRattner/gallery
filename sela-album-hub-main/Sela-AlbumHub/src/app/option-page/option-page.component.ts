import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../services/data.service';
import { CookieService } from 'ngx-cookie-service';
import { EncrDecrServiceService } from '../services/encr-decr-service.service'

@Component({
  selector: 'app-option-page',
  templateUrl: './option-page.component.html',
  styleUrls: ['./option-page.component.css']
})
export class OptionPageComponent implements OnInit {

  @ViewChild('check')
  public cameraCB: ElementRef;
  @ViewChild('check2')
  public locationCB: ElementRef;
  @ViewChild('check3')
  public privateCB: ElementRef;
  @ViewChild('password')
  public password: ElementRef;

  passwordValidation: boolean = false;
  //set password encrypten key
  key = "123456$#@$^@1ERF"


  constructor(private dataService: DataService,
    private cookieService: CookieService,
    private EncrDecr: EncrDecrServiceService
  ) { }

  ngOnInit(): void {
  }


  //set cookie for user agreement
  isCameraCBchecked() {
    const cameraCBstring = this.cameraCB.nativeElement.checked + "";
    console.log(cameraCBstring);
    this.cookieService.set('cameraCheck', cameraCBstring);
  }

  isLoctionCBchecked(){
    const locationCBstring = this.locationCB.nativeElement.checked + "" + "Location";
    console.log(locationCBstring);
    this.cookieService.set('locationCheck', locationCBstring);
  }

  //
  encryptPassword() {
    const passinput = this.password.nativeElement.value;
    if (passinput.length < 6) {
      alert("password must be at least 6 notes !")
      return
    }
    console.log(this.password.nativeElement.value);
    let encrypted = this.EncrDecr.set(this.key, this.password.nativeElement.value)
    console.log(encrypted);
    this.cookieService.set('password', encrypted)
    let decrypted = this.EncrDecr.get(this.key, encrypted);
    console.log(decrypted);
    alert("your password saved")
  }

  savePassword() {
    this.passwordValidation = this.privateCB.nativeElement.checked;
  }
}
