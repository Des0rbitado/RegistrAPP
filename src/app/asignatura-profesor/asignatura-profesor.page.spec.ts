import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AsignaturaProfesorPage } from './asignatura-profesor.page';

describe('AsignaturaProfesorPage', () => {
  let component: AsignaturaProfesorPage;
  let fixture: ComponentFixture<AsignaturaProfesorPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AsignaturaProfesorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
