import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JuegoMemoramaComponent } from './juego-memorama.component';

describe('JuegoMemoramaComponent', () => {
  let component: JuegoMemoramaComponent;
  let fixture: ComponentFixture<JuegoMemoramaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JuegoMemoramaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JuegoMemoramaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
