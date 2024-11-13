import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'menu-alumno',
    loadChildren: () => import('./menu-alumno/menu-alumno.module').then( m => m.MenuAlumnoPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'menu-profesor',
    loadChildren: () => import('./menu-profesor/menu-profesor.module').then( m => m.MenuProfesorPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'asignaturas-alumnos',
    loadChildren: () => import('./asignaturas-alumnos/asignaturas-alumnos.module').then( m => m.AsignaturasAlumnosPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'asistencias-alumnos',
    loadChildren: () => import('./asistencias-alumnos/asistencias-alumnos.module').then( m => m.AsistenciasAlumnosPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'cambiar-clave',
    loadChildren: () => import('./cambiar-clave/cambiar-clave.module').then( m => m.CambiarClavePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'registrar-asistencia',
    loadChildren: () => import('./registrar-asistencia/registrar-asistencia.module').then( m => m.RegistrarAsistenciaPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'cambiar-clave-profesor',
    loadChildren: () => import('./cambiar-clave-profesor/cambiar-clave-profesor.module').then( m => m.CambiarClaveProfesorPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'asistencia-profesor',
    loadChildren: () => import('./asistencia-profesor/asistencia-profesor.module').then( m => m.AsistenciaProfesorPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'asignatura-profesor',
    loadChildren: () => import('./asignatura-profesor/asignatura-profesor.module').then( m => m.AsignaturaProfesorPageModule),
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
