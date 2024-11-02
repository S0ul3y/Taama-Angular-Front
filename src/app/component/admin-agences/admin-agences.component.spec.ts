import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAgencesComponent } from './admin-agences.component';

describe('AdminAgencesComponent', () => {
  let component: AdminAgencesComponent;
  let fixture: ComponentFixture<AdminAgencesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminAgencesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminAgencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
