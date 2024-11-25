import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PickupShiftsComponent } from './pickup-shifts.component';

describe('PickupShiftsComponent', () => {
  let component: PickupShiftsComponent;
  let fixture: ComponentFixture<PickupShiftsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PickupShiftsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PickupShiftsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
