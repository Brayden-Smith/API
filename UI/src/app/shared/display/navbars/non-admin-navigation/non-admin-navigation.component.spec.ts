import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NonAdminNavigationComponent } from './non-admin-navigation.component';

describe('NonAdminNavigationComponent', () => {
  let component: NonAdminNavigationComponent;
  let fixture: ComponentFixture<NonAdminNavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NonAdminNavigationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NonAdminNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
