import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoJuegoComponent } from './demo-juego.component';

describe('DemoJuegoComponent', () => {
  let component: DemoJuegoComponent;
  let fixture: ComponentFixture<DemoJuegoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DemoJuegoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DemoJuegoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
