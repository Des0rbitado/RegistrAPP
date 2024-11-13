import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AsignaturasAlumnosPage } from './asignaturas-alumnos.page';

describe('AsignaturasAlumnosPage', () => {
  let component: AsignaturasAlumnosPage;
  let fixture: ComponentFixture<AsignaturasAlumnosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AsignaturasAlumnosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
