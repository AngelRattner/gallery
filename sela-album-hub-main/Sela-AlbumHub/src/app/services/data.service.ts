import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Photo } from "../classes/photo";
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  //refernce to image id from gallery to edit pages
  newPhoto: any;

  getImagesDetails(): Observable<Photo[]> {
    return this.http.get('http://localhost:3000/getImagesDetails')
      .pipe(map((res) => <Photo[]>(res)));
  }

  getSingleImaege(id: string){
    return `http://localhost:3000/getImage?id=${id}`;
  }

  getSingleImageDetails(id: string){
    return this.http.get(`http://localhost:3000/getSingleImageDetails?id=${id}`)
    .pipe(map((res) => <Photo[]>(res)));
  }

  deleteImage(id){
    this.http.post(`http://localhost:3000/deleteImage`, {id}).subscribe((res) => {
      console.log(res);
    });
  }

  constructor(private http: HttpClient) { }
}
