import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { MenuController } from '@ionic/angular';
import { AlertController, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-asistencias-alumnos',
  templateUrl: './asistencias-alumnos.page.html',
  styleUrls: ['./asistencias-alumnos.page.scss'],
})
export class AsistenciasAlumnosPage implements OnInit {
  asistencias: any[] = [];

  constructor(private authService: AuthService, private menuCtrl: MenuController, private alertController: AlertController, private router: Router,) {}

  ngOnInit() {
    this.authService.getAsistenciasByAlumnoId().subscribe(
      (data) => {
        this.asistencias = data;
      },
      (error) => {
        console.error('Error al obtener asistencias:', error);
      }
    );
    console.log(this.authService.getCurrentUser());
  }

  toggleMenu() {
    this.menuCtrl.toggle('myMenu');
  }


  async logOutAlumno() {
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
