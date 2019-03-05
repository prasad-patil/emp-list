import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderInfoPopupComponent } from './order-info-popup.component';

describe('OrderInfoPopupComponent', () => {
  let component: OrderInfoPopupComponent;
  let fixture: ComponentFixture<OrderInfoPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderInfoPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderInfoPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
