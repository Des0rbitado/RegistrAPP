import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CambiarClaveProfesorPageRoutingModule } from './cambiar-clave-profesor-routing.module';

import { CambiarClaveProfesorPage } from './cambiar-clave-profesor.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CambiarClaveProfesorPageRoutingModule
  ],
  declarations: [CambiarClaveProfesorPage]
})
export class CambiarClaveProfesorPageModule {}
