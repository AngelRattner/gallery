import { Component, Input, OnInit } from '@angular/core';
import { DataService } from "../services/data.service";
import { DomSanitizer, SafeUrl } from "@angular/platform-browser";
import { Observable } from 'rxjs';
import { Photo } from '../classes/photo';
import { CookieService } from 'ngx-cookie-service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-slide-show',
  templateUrl: './slide-show.component.html',
  styleUrls: ['./slide-show.component.css']
})
export class SlideShowComponent implements OnInit {

  imageDataList: Observable<Photo[]> = this.dataService.getImagesDetails()
  cnt: number = 0;
  randomPicker: number
  images$;
  @Input()
  images: Photo[];
  index: number;
  TMPimageList: Photo[];
  @Input()
  TMPimages: Observable<Photo[]>;
  timeLeft: number = 5;
  interval;
  galeryName = this.cookieService.get('galeryName');

  constructor(
    public dataService: DataService,
    private sanitizer: DomSanitizer,
    private cookieService: CookieService,
    private _location: Location
  ) { }

  ngOnInit(): void {
    //set images arrays
    this.images$ = this.dataService.getImagesDetails();
    this.TMPimages.subscribe(e => this.TMPimageList = e);
  }

  //check and show privateMode images
  ngAfterViewChecked() {
    if (this.cookieService.get("isPrivate") === "isPrivateFalse") {
      this.PrivateModeDisplay()
    }
  }

  //allow angular to use local source images
  sanitizeImageUrl(imageUrl: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(imageUrl);
  }

  //get random number between 0 - array length
  getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  //filter and show privateMode images
  PrivateModeDisplay() {
    this.images = this.TMPimageList;
    this.images = this.images.filter(e => e.privateMode == false);
  }

  //set image exchange evrey 5 sec
  startTimer() {
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.timeLeft = 5;
        this.getRandomInt(this.images.length);
      }
    }, 5000)
  }

  pauseTimer() {
    clearInterval(this.interval);
  }

  //return to the previus page
  backClicked() {
    this._location.back()
  }
}
