import { Component, OnInit } from '@angular/core';
import { QrCodeModule } from 'ng-qrcode';
import { AuthService } from '../services/auth.service';
import { AlertController, MenuController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registrar-asistencia',
  templateUrl: './registrar-asistencia.page.html',
  styleUrls: ['./registrar-asistencia.page.scss'],
})
export class RegistrarAsistenciaPage implements OnInit {
  qrSize: number = 300;
  secciones: any[] = [];
  selectedSection: string = '';
  qrValue: string = '';
  constructor(private authService: AuthService, private menu: MenuController, private alertController: AlertController, private router: Router,) { }


  toggleMenu() {
    this.menu.toggle('myMenu'); // ID del menú
  }

  onRangeChange(event: any) {
    this.qrSize = event.detail.value;
  }

  async ngOnInit() {
    try {
      const asignaturas = await this.authService.getTeacherSubjects(this.getUserId());
      
      this.secciones = asignaturas;
  
    } catch (error) {
      console.error('Error al obtener las secciones', error);
    }
  }
  
  onSectionChange() {
    const today = new Date();
    const formattedDate = `${today.getDate().toString().padStart(2, '0')}/${(today.getMonth() + 1).toString().padStart(2, '0')}/${(today.getFullYear()).toString()}`;

    this.qrValue = `${this.selectedSection}|${formattedDate}`;
  }

  private getUserId(): string {
    const user = this.authService.getCurrentUser();
    return user ? user.id : '';
  }
  
  async logOutProfesor() {
    const alert = await this.alertController.create({
      header: 'Cerrar sesión',
      message: '¿Estás seguro de que deseas cerrar sesión?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Cerrar sesión',
          handler: () => {
            this.authService.logout();
            this.router.navigate(['/home']);
          },
        },
      ],
    });

    await alert.present();
  }
  
}
