import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PuntajeSopaComponent } from './puntaje-sopa.component';

describe('PuntajeSopaComponent', () => {
  let component: PuntajeSopaComponent;
  let fixture: ComponentFixture<PuntajeSopaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PuntajeSopaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PuntajeSopaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
