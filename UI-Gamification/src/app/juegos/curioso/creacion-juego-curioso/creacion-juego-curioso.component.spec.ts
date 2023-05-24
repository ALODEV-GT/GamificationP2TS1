import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreacionJuegoCuriosoComponent } from './creacion-juego-curioso.component';

describe('CreacionJuegoCuriosoComponent', () => {
  let component: CreacionJuegoCuriosoComponent;
  let fixture: ComponentFixture<CreacionJuegoCuriosoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreacionJuegoCuriosoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreacionJuegoCuriosoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
