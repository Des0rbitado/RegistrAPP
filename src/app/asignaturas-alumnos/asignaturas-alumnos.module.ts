import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AsignaturasAlumnosPageRoutingModule } from './asignaturas-alumnos-routing.module';

import { AsignaturasAlumnosPage } from './asignaturas-alumnos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AsignaturasAlumnosPageRoutingModule
  ],
  declarations: [AsignaturasAlumnosPage]
})
export class AsignaturasAlumnosPageModule {}
