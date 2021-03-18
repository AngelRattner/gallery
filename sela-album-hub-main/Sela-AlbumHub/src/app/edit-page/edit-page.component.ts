import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Photo } from "../classes/photo";
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { LocationService } from '../services/location.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ImageInfoService } from "../services/image-info.service";
import { DataService } from "../services/data.service";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Location } from '@angular/common';
import { DomSanitizer, SafeUrl } from "@angular/platform-browser";


@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.css']
})
export class EditPageComponent implements OnInit {

  @ViewChild('UploadFileInput', { static: false }) uploadFileInput: ElementRef;
  fileUploadForm: FormGroup;
  fileInputLabel: string;
  pic: string;

  @Input()
  image: Photo[];
  angForm: FormGroup;
  myForm: FormGroup;
  disabled = false;
  ShowFilter = true;
  showAll = true;
  limitSelection = false;
  disableBangalore = true;
  categoriesList: Array<any> = [];
  selectedItems: Array<any> = [];
  dropdownSettings: IDropdownSettings = {};
  dropDownList = [];
  recivedPhoto: any;
  tmpPhoto: Observable<Photo[]>;
  isMapClicked: boolean = false;

  constructor(private locationService: LocationService,
    private fb: FormBuilder,
    private formBuilder: FormBuilder,
    private ImageInfoService: ImageInfoService,
    private http: HttpClient,
    private _location: Location,
    private sanitizer: DomSanitizer,
    public dataService: DataService) { this.createForm(); }

  createForm() {
    this.angForm = this.fb.group({
      caption: ['', Validators.required],
      categories: [''],
    });
  }
  ngOnInit(): void {
    this.tmpPhoto = this.dataService.getSingleImageDetails(this.dataService.newPhoto);
    this.tmpPhoto.subscribe(e => this.recivedPhoto = e)

    this.ImageInfoService.getCategory().subscribe(e => {
      this.categoriesList = e;

      this.dropDownList = this.categoriesList
      this.dropdownSettings = {
        singleSelection: false,

        defaultOpen: false,
        idField: 'item_id',
        textField: 'item_text',
        selectAllText: 'Select All',
        unSelectAllText: 'UnSelect All',
        enableCheckAll: this.showAll,
        allowSearchFilter: this.ShowFilter
      };
      this.myForm = this.fb.group({
        categories: [this.selectedItems]
      });
      this.fileUploadForm = this.formBuilder.group({
        uploadedImage: ['']
      });
    })
  }

  //multi selection drop down functions:
  onItemSelect(item: any) {
    console.log('onItemSelect', item);
    this.selectedItems.push(item.item_text);
  }
  onItemDeSelect(item: any) {
    console.log('onItem DeSelect', item);
    this.selectedItems.splice(item.item_text, 1)
  }

  onSelectAll(items: any) {
    console.log('onSelectAll', items);
    if (this.selectedItems.length = 10) {
      this.selectedItems.splice(0, 9)
    } else {
      this.selectedItems.push(items.item_text);
    }
  }

  //allow using local source images
  sanitizeImageUrl(imageUrl: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(imageUrl);
  }

  save(caption: string, isFavorite: boolean, isPrivate: boolean) {
    //caption validation
    if (caption != "") {
      this.recivedPhoto.caption = caption;
    }

    this.recivedPhoto.categories = this.selectedItems;

    //set location if changed
    if (this.isMapClicked) {
      this.recivedPhoto.latitudeLocation = this.locationService.selectedLat;
      this.recivedPhoto.longitudeLocation = this.locationService.selectedLng;
    }
    this.recivedPhoto.favorite = isFavorite;
    this.recivedPhoto.privateMode = isPrivate;
    //set phoo with user inputs details
    const photo = this.recivedPhoto;

    this.http
      .post<any>(`http://localhost:3000/editDetails`, { photo }).subscribe(response => {
        console.log(response);
        if (response.statusCode === 200) {
          console.log("image was edited");
        }
      }, er => {
        console.log(er);
        alert(er.error.error);
      });
    alert("image was edited");
    this._location.back()
  }


  mapClick() {
    this.isMapClicked = true;
  }
}
