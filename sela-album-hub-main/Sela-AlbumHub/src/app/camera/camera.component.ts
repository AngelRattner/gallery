import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Photo } from "../classes/photo";
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { FormGroup, FormBuilder } from '@angular/forms';
import { LocationService } from "../services/location.service";
import { ImageInfoService } from "../services/image-info.service";

@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.css']
})
export class CameraComponent implements OnInit {

  title = 'cam';

  div1: boolean = false;

  myForm: FormGroup;
  disabled = false;
  ShowFilter = true;
  showAll = true;
  limitSelection = false;
  disableBangalore = true;
  categoriesList: Array<any> = [];
  selectedItems: Array<any> = [];
  dropdownSettings: IDropdownSettings = {};
  dropDownList;

  @ViewChild('video')
  public video: ElementRef;

  @ViewChild('canvas')
  public canvas: ElementRef;

  @ViewChild('caption')
  public caption: ElementRef;

  @ViewChild('favorite')
  public isFavorite: ElementRef

  @ViewChild('private')
  public isPrivate: ElementRef

  public constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private locationService: LocationService,
    private ImageInfoService: ImageInfoService
  ) { }

  public ngOnInit() {
    this.ImageInfoService.getCategory().subscribe( e => this.categoriesList = e)
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
      city: [this.selectedItems]
    });
  }

  public ngAfterViewInit() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
        this.video.nativeElement.srcObject = stream;
        this.video.nativeElement.play();
      });
    }
  }

  public capture() {
    this.uploadToServer(this.canvas.nativeElement.toDataURL('image/png'));
  }

  onFileSelected(fileInputEvent: any) {
    let file = fileInputEvent.target.files[0];
    let reader = new FileReader();

    //convert file (any file) to DataUrl
    reader.readAsDataURL(file);
    // make reference to the method so you can pass the reader results
    let f = (file) => {
      this.uploadToServer(file);
    };
    // after the reader is finished
    reader.onload = () => {
      // call the method reference
      f(reader.result);
    };
  }

  uploadToServer(base64Image) {
    debugger;

    let photoName = "";
    //set photo wite user input details
    const photosClass = new Photo(this.caption.nativeElement.value, this.selectedItems, this.locationService.selectedLat, this.locationService.selectedLng, this.isFavorite.nativeElement.checked,
      this.isPrivate.nativeElement.checked, photoName)
    let id = photosClass.id

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

    this.http
      .post('http://localhost:3000/upload', { image: base64Image, id })
      .subscribe((res) => {
        console.log(res);
        photoName = res as string
      });
  }


  //set details inputs visibality  

  showIMG() {
    this.canvas.nativeElement
      .getContext('2d')
      .drawImage(this.video.nativeElement, 0, 0, 640, 480);
    this.showFunction()
  }


  showFunction() {
    this.div1 = true;
  }

  hideFunction() {
    this.div1 = false;
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
}








