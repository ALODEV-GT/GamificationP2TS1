import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PuntajeComidoComponent } from './puntaje-comido.component';

describe('PuntajeComidoComponent', () => {
  let component: PuntajeComidoComponent;
  let fixture: ComponentFixture<PuntajeComidoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PuntajeComidoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PuntajeComidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
