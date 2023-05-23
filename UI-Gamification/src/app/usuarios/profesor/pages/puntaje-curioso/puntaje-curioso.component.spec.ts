import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PuntajeCuriosoComponent } from './puntaje-curioso.component';

describe('PuntajeCuriosoComponent', () => {
  let component: PuntajeCuriosoComponent;
  let fixture: ComponentFixture<PuntajeCuriosoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PuntajeCuriosoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PuntajeCuriosoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
