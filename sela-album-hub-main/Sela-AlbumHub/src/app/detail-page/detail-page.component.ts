import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-detail-page',
  templateUrl: './detail-page.component.html',
  styleUrls: ['./detail-page.component.css']
})
export class DetailPageComponent implements OnInit {

  nameValidation: boolean = false

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
  ) { }


  ngOnInit(): void {
    this.warning()
  }

  //save cookies with selected view type display ang galery name
  saveName(name: string, description: string, view: string) {
    //validation
    if (name.length < 3) {
      alert("Library name must be longer than 2 letters");
      return
    }
    this.nameValidation = true
    const display = view;
    console.log(display);
    this.cookieService.set('displayType', display);
    this.cookieService.set('galeryName', name);
    console.log(name, description, view);
  }

  warning() {
    if (this.cookieService.get("password").length < 6) {
      alert("private mode is disabled")
    }
  }
}
