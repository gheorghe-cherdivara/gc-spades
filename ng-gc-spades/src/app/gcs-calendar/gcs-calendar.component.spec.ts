import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GcsCalendarComponent } from './gcs-calendar.component';

describe('GcsCalendarComponent', () => {
  let component: GcsCalendarComponent;
  let fixture: ComponentFixture<GcsCalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GcsCalendarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GcsCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
