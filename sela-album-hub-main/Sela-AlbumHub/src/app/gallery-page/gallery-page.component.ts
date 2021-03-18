import { Component, OnInit, HostListener, Input, Inject, ViewChild, ElementRef } from '@angular/core';
import { DataService } from "../services/data.service";
import { HttpClient } from '@angular/common/http';
import { Photo } from "../classes/photo";
import { Observable } from 'rxjs';
import { DomSanitizer, SafeUrl } from "@angular/platform-browser";
import { CookieService } from 'ngx-cookie-service';
import { DOCUMENT } from '@angular/common';
import { Router } from "@angular/router";
import { Location } from '@angular/common';

@Component({
  selector: 'app-gallery-page',
  templateUrl: './gallery-page.component.html',
  styleUrls: ['./gallery-page.component.css']
})
export class GalleryPageComponent implements OnInit {
  windowScrolled: boolean;
  imageDataList: Observable<Photo[]> = this.dataService.getImagesDetails()
  @Input()
  images: Photo[];
  @Input()
  TMPimages: Observable<Photo[]>;
  images$;
  viewDisplay: boolean = true
  counterviewDisplay: boolean = false
  firstName: any;
  TMPimageList: Photo[];
  publicImageList: Photo[];
  favoriteImageList: Photo[];
  isFavorite: boolean = false;
  galeryName = this.cookieService.get('galeryName')
  @ViewChild('captionSearch')
  private captionSearch: ElementRef;

  constructor(
    private dataService: DataService,
    private http: HttpClient,
    private sanitizer: DomSanitizer,
    private cookieService: CookieService,
    @Inject(DOCUMENT) private document: Document,
    private router: Router,
  ) { }

  ngOnInit(): void {
    //set image array
    this.TMPimages.subscribe(e => {
      this.TMPimageList = e;
      //check and display images in private mode
      if (this.cookieService.get("isPrivate") === "isPrivateFalse") {
        this.PrivateModeDisplay()
      }
    });
    this.classDisplay();
  }

  //allow using local source images
  sanitizeImageUrl(imageUrl: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(imageUrl);
  }

  serchByCaption() {
    if (this.cookieService.get("isPrivate") === "isPrivateFalse") {
      this.images = this.publicImageList;
    } else {
      this.images = this.TMPimageList;
    }
    this.images = this.images.filter(e => e.caption.includes(this.captionSearch.nativeElement.value));
  }

  serchByCategory(category: string) {
    if (this.cookieService.get("isPrivate") === "isPrivateFalse") {
      this.images = this.publicImageList;
    } else {
      this.images = this.TMPimageList;
    }
    let tmp = new Array();
    // search in images array
    for (let i = 0; i < this.images.length; i++) {
      //search in categories array of a singke image
      for (let j = 0; j < this.images[i].categories.length; j++) {
        //check for match and add to tmp array
        if (this.images[i].categories[j].includes(category)) {
          tmp.push(this.images[i]);
          break;
        }
      }
    }
    this.images = tmp;
  }

  showFavorite() {
    if (this.isFavorite === false) {
      if (this.cookieService.get("isPrivate") === "isPrivateFalse") {
        this.images = this.publicImageList
      } else {
        this.images = this.TMPimageList;
      }
      this.images = this.images.filter(e => e.favorite == true);
      this.favoriteImageList = this.images;
      this.isFavorite = true;
    } else if (this.cookieService.get("isPrivate") === "isPrivateFalse") {
      this.PrivateModeDisplay()
      this.isFavorite = false;
    } else {
      this.images = this.TMPimageList;
    }
    window.location.reload;
  }

  //set and show scroll up icon
  @HostListener("window:scroll", [])
  onWindowScroll() {
    if (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop > 100) {
      this.windowScrolled = true;
    }
    else if (this.windowScrolled && window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop < 10) {
      this.windowScrolled = false;
    }
  }
  scrollToTop() {
    (function smoothscroll() {
      var currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
      if (currentScroll > 0) {
        window.requestAnimationFrame(smoothscroll);
        window.scrollTo(0, currentScroll - (currentScroll / 8));
      }
    })();
  }

  //check and display images in private mode
  classDisplay() {
    const display = this.cookieService.get('displayType')
    if (display === "grid") {
      console.log("true");
      this.viewDisplay = true;
      this.counterviewDisplay = false;
    } else {
      this.viewDisplay = false
      this.counterviewDisplay = true;
    }
  }

  editCategories(id: string) {
    this.dataService.newPhoto = id
    this.router.navigate(['/Edit-page'])
  }

  PrivateModeDisplay() {
    this.images = this.TMPimageList;
    this.images = this.images.filter(e => e.privateMode == false);
    this.publicImageList = this.images;
  }

  deleteImage(id) {
    this.dataService.deleteImage(id);
    window.location.reload();
  }
}
