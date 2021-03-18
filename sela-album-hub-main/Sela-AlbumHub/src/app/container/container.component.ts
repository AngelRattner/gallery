import { Component, OnInit, Input } from '@angular/core';
import { DataService } from "../services/data.service";
import { HttpClient } from '@angular/common/http';
import { Photo } from "../classes/photo";
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css']
})
export class ContainerComponent implements OnInit {
  images$: Observable<Photo[]>;
  images: Photo[];

  constructor(private dataService: DataService,
    private cookieService: CookieService,) { }

  ngOnInit(): void {
     this.images$ = this.dataService.getImagesDetails();
  }

}
