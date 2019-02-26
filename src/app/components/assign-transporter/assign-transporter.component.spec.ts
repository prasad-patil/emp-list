import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignTransporterComponent } from './assign-transporter.component';

describe('AssignTransporterComponent', () => {
  let component: AssignTransporterComponent;
  let fixture: ComponentFixture<AssignTransporterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignTransporterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignTransporterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
