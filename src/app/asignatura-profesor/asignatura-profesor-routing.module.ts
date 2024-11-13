import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AsignaturaProfesorPage } from './asignatura-profesor.page';

const routes: Routes = [
  {
    path: '',
    component: AsignaturaProfesorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AsignaturaProfesorPageRoutingModule {}
