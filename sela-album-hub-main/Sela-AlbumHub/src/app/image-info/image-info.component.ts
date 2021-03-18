import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ImageInfoService } from "../services/image-info.service";

@Component({
  selector: 'app-image-info',
  templateUrl: './image-info.component.html',
  styleUrls: ['./image-info.component.css']
})
export class ImageInfoComponent implements OnInit {

  photo: any

  constructor(
    private http: HttpClient,
    private service: ImageInfoService
  ) { }

  ngOnInit(): void {
  }
  
  submit(caption: string, isFavorite: boolean, isPrivate: boolean) {
    this.photo = this.service.photo;
    const photo = this.photo.url;
    this.http
      .post<any>('http://localhost:3000/saveDetails', { caption, isFavorite, isPrivate, photo }).subscribe(response => {
        console.log(response);
        if (response.statusCode === 200) {
          console.log("information & image was saved");
        }
      }, er => {
        console.log(er);
        alert(er.error.error);
      });
  }

}


