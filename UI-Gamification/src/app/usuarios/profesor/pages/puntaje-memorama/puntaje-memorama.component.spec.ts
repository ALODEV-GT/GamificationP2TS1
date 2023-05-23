import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PuntajeMemoramaComponent } from './puntaje-memorama.component';

describe('PuntajeMemoramaComponent', () => {
  let component: PuntajeMemoramaComponent;
  let fixture: ComponentFixture<PuntajeMemoramaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PuntajeMemoramaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PuntajeMemoramaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
