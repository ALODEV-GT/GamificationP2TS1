import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterProfeComponent } from './footer-profe.component';

describe('FooterProfeComponent', () => {
  let component: FooterProfeComponent;
  let fixture: ComponentFixture<FooterProfeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FooterProfeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterProfeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
