import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AsignaturasAlumnosPage } from './asignaturas-alumnos.page';

const routes: Routes = [
  {
    path: '',
    component: AsignaturasAlumnosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AsignaturasAlumnosPageRoutingModule {}
