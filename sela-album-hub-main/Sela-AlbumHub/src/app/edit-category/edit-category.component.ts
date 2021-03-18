import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ImageInfoService } from "../services/image-info.service";

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit {

  arrayLength
  constructor(
    private imageInfoService: ImageInfoService
  ) { }

  ngOnInit(): void {
  }

  addCategory(name: string) {
    this.imageInfoService.getCategory().subscribe(e => {
      this.arrayLength = e;
      const newCat = {
        "item_id": (this.arrayLength.length + 1) + "",
        "item_text": name
      };
      this.imageInfoService.addCategory(newCat);
    })
  }
}
