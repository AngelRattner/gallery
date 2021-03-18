import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnlineContainerComponent } from './online-container.component';

describe('OnlineContainerComponent', () => {
  let component: OnlineContainerComponent;
  let fixture: ComponentFixture<OnlineContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnlineContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OnlineContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
