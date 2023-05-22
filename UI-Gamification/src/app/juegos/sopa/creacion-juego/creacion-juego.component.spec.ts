import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreacionJuegoComponent } from './creacion-juego.component';

describe('CreacionJuegoComponent', () => {
  let component: CreacionJuegoComponent;
  let fixture: ComponentFixture<CreacionJuegoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreacionJuegoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreacionJuegoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
