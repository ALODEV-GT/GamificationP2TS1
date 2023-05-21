import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreacionComidoComponent } from './creacion-comido.component';

describe('CreacionComidoComponent', () => {
  let component: CreacionComidoComponent;
  let fixture: ComponentFixture<CreacionComidoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreacionComidoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreacionComidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
