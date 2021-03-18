import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.css']
})
export class WelcomePageComponent implements OnInit {
  name: any;

  constructor(
    private cookieService: CookieService,
  ) {}

  ngOnInit() {
    //reset all cookies
    this.cookieService.deleteAll();
    this.cookieService.set("isPrivate", "isPrivateFalse")
  }
}
