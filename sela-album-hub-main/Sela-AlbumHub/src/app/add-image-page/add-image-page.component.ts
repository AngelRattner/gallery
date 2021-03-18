import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-add-image-page',
  templateUrl: './add-image-page.component.html',
  styleUrls: ['./add-image-page.component.css']
})
export class AddImagePageComponent implements OnInit {

  showCamera = false;
  showOnline = false;
  showLocal = false;

  camChecked = true;
  cookieValue: string;


  constructor(
    private dataService: DataService,
    private cookieService: CookieService
  ) { }

  ngOnInit(): void {
    if (this.cookieService.get('cameraCheck') === "true")
      this.camChecked = false
  }

  //switch between components

  showCameraComp() {
    this.showCamera = true;
    this.showOnline = false;
    this.showLocal = false;
  }
  
  showLocalComp() {
    this.showCamera = false;
    this.showOnline = false;
    this.showLocal = true;
  }

  showOnlineComp() {
    this.showCamera = false;
    this.showOnline = true;
    this.showLocal = false;
  }
}
