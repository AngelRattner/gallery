import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { OnlineSearchService } from "../services/online-search.service";
import { DataService } from "../services/data.service";
import { Photo } from "../classes/photo";

@Component({
  selector: 'app-online',
  templateUrl: './online.component.html',
  styleUrls: ['./online.component.css']
})
export class OnlineComponent implements OnInit {

  searchData;
  perPage: any;
  photos = [];

  imageID = 0;

  @ViewChild('canvas')
  public canvas: ElementRef;

  windowScrolled: boolean;
  name = "Angular";
  base64TrimmedURL: string;
  base64DefaultURL: string;
  generatedImage: string;
  windowOPen: boolean;

  constructor(
    private OnlineSearchService: OnlineSearchService,
    private http: HttpClient,
    private dataService: DataService
  ) { }

  ngOnInit(): void {
  }


  search() {
    this.OnlineSearchService.getdata(this.searchData, this.perPage).subscribe((response: any) => {
      console.log(response);
      this.photos = response.photos;
    }, (error) => {
      console.log(error);
    })
  }


  fileSelection(item: any) {
    let path = "";
    let file = item;
    let reader = new FileReader();
    reader.readAsDataURL(file);
    //set selected image details to default
    const photosClass = new Photo("", [], null, null, false, false, path)
    let id = photosClass.id

    //save selected image
    let f = (file) => {
      this.http
        .post('http://localhost:3000/upload', { image: file, id })
        .subscribe((res) => {
          console.log(res);
          path = res as string
        });
    };

    reader.onload = () => { f(reader.result) };

    this.http
      .post<any>('http://localhost:3000/saveDetails', { photosClass }).subscribe(response => {
        console.log(response);
        if (response.statusCode === 200) {
          console.log("image was saved");
        }
      }, er => {
        console.log(er);
        alert(er.error.error);
      });
  }


  downloadIMG(url: any) {
    console.log(url)
    // get image url
    let imgElement = document.getElementById(url);
    // change url to blob
    let tmp = this.getImage(imgElement.getAttribute('src'));
    // call func to save the image
    tmp.subscribe(e => this.fileSelection(e));
    alert('image was saved');
  }

  getImage(imageUrl: string): Observable<Blob> {
    return this.http.get(imageUrl, { responseType: 'blob' });
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
}