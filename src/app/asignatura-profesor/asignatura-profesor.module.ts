import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AsignaturaProfesorPageRoutingModule } from './asignatura-profesor-routing.module';

import { AsignaturaProfesorPage } from './asignatura-profesor.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AsignaturaProfesorPageRoutingModule
  ],
  declarations: [AsignaturaProfesorPage]
})
export class AsignaturaProfesorPageModule {}
