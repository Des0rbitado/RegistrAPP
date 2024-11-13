import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AsistenciasAlumnosPage } from './asistencias-alumnos.page';

const routes: Routes = [
  {
    path: '',
    component: AsistenciasAlumnosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AsistenciasAlumnosPageRoutingModule {}
