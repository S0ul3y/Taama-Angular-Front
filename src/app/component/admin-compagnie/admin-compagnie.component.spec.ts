import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCompagnieComponent } from './admin-compagnie.component';

describe('AdminCompagnieComponent', () => {
  let component: AdminCompagnieComponent;
  let fixture: ComponentFixture<AdminCompagnieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminCompagnieComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminCompagnieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
