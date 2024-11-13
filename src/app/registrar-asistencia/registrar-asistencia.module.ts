import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { QrCodeModule } from 'ng-qrcode';

import { IonicModule } from '@ionic/angular';

import { RegistrarAsistenciaPageRoutingModule } from './registrar-asistencia-routing.module';

import { RegistrarAsistenciaPage } from './registrar-asistencia.page';

@NgModule({
  imports: [
    QrCodeModule,
    CommonModule,
    FormsModule,
    IonicModule,
    RegistrarAsistenciaPageRoutingModule
  ],
  declarations: [RegistrarAsistenciaPage]
})
export class RegistrarAsistenciaPageModule {}
