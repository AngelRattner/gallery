import { Component, OnInit, Input } from '@angular/core';
import { DataService } from "../services/data.service";
import { HttpClient } from '@angular/common/http';
import { Photo } from "../classes/photo";
import { Observable } from 'rxjs';

@Component({
  selector: 'app-slide-container',
  templateUrl: './slide-container.component.html',
  styleUrls: ['./slide-container.component.css']
})
export class SlideContainerComponent implements OnInit {

  images$: Observable<Photo[]>;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.images$ = this.dataService.getImagesDetails();
  }
}
