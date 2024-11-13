import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AsistenciasAlumnosPageRoutingModule } from './asistencias-alumnos-routing.module';

import { AsistenciasAlumnosPage } from './asistencias-alumnos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AsistenciasAlumnosPageRoutingModule
  ],
  declarations: [AsistenciasAlumnosPage]
})
export class AsistenciasAlumnosPageModule {}
