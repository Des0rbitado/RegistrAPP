import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CambiarClaveProfesorPage } from './cambiar-clave-profesor.page';

describe('CambiarClaveProfesorPage', () => {
  let component: CambiarClaveProfesorPage;
  let fixture: ComponentFixture<CambiarClaveProfesorPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CambiarClaveProfesorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
