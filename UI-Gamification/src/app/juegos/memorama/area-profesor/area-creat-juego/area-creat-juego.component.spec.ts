import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaCreatJuegoComponent } from './area-creat-juego.component';

describe('AreaCreatJuegoComponent', () => {
  let component: AreaCreatJuegoComponent;
  let fixture: ComponentFixture<AreaCreatJuegoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AreaCreatJuegoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AreaCreatJuegoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
