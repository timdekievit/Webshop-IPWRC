import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementOrdersComponent } from './management-orders.component';

describe('ManagementOrdersComponent', () => {
  let component: ManagementOrdersComponent;
  let fixture: ComponentFixture<ManagementOrdersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManagementOrdersComponent]
    });
    fixture = TestBed.createComponent(ManagementOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
