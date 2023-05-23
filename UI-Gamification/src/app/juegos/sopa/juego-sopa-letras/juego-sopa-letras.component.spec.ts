import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JuegoSopaLetrasComponent } from './juego-sopa-letras.component';

describe('JuegoSopaLetrasComponent', () => {
  let component: JuegoSopaLetrasComponent;
  let fixture: ComponentFixture<JuegoSopaLetrasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JuegoSopaLetrasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JuegoSopaLetrasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
