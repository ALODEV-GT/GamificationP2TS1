import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavBarProfeComponent } from './nav-bar-profe.component';

describe('NavBarProfeComponent', () => {
  let component: NavBarProfeComponent;
  let fixture: ComponentFixture<NavBarProfeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavBarProfeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavBarProfeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
