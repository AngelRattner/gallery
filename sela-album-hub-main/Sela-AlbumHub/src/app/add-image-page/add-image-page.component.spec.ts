import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddImagePageComponent } from './add-image-page.component';

describe('AddImagePageComponent', () => {
  let component: AddImagePageComponent;
  let fixture: ComponentFixture<AddImagePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddImagePageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddImagePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
