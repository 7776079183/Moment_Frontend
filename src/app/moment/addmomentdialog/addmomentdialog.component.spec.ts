import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddmomentdialogComponent } from './addmomentdialog.component';

describe('AddmomentdialogComponent', () => {
  let component: AddmomentdialogComponent;
  let fixture: ComponentFixture<AddmomentdialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddmomentdialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddmomentdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
