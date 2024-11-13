import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AsistenciasAlumnosPage } from './asistencias-alumnos.page';

describe('AsistenciasAlumnosPage', () => {
  let component: AsistenciasAlumnosPage;
  let fixture: ComponentFixture<AsistenciasAlumnosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AsistenciasAlumnosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
