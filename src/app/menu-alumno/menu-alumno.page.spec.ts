import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MenuAlumnoPage } from './menu-alumno.page';

describe('MenuAlumnoPage', () => {
  let component: MenuAlumnoPage;
  let fixture: ComponentFixture<MenuAlumnoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuAlumnoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
