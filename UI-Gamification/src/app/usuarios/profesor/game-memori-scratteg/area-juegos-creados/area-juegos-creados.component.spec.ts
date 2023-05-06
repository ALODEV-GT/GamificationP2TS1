import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaJuegosCreadosComponent } from './area-juegos-creados.component';

describe('AreaJuegosCreadosComponent', () => {
  let component: AreaJuegosCreadosComponent;
  let fixture: ComponentFixture<AreaJuegosCreadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AreaJuegosCreadosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AreaJuegosCreadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
