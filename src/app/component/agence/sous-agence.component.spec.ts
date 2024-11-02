import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SousAgenceComponent } from './sous-agence.component';

describe('SousAgenceComponent', () => {
  let component: SousAgenceComponent;
  let fixture: ComponentFixture<SousAgenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SousAgenceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SousAgenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
