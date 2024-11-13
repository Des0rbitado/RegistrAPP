import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CambiarClavePage } from './cambiar-clave.page';

describe('CambiarClavePage', () => {
  let component: CambiarClavePage;
  let fixture: ComponentFixture<CambiarClavePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CambiarClavePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
