import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoMemoramaVisitanteComponent } from './demo-memorama-visitante.component';

describe('DemoMemoramaVisitanteComponent', () => {
  let component: DemoMemoramaVisitanteComponent;
  let fixture: ComponentFixture<DemoMemoramaVisitanteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DemoMemoramaVisitanteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DemoMemoramaVisitanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
