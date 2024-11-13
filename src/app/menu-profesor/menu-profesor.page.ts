import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { MenuController } from '@ionic/angular'; // Importa MenuController
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-menu-profesor',
  templateUrl: './menu-profesor.page.html',
  styleUrls: ['./menu-profesor.page.scss'],
})
export class MenuProfesorPage implements OnInit {
  nombreProfesor: string = '';

  constructor(
    private alertController: AlertController,
    private authService: AuthService,
    private router: Router,
    private menuCtrl: MenuController, // Inyecta MenuController
    private modalController: ModalController
  ) {
    this.setNombreProfesor();
  }

  private setNombreProfesor() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    if (currentUser && currentUser.nombre) {
      this.nombreProfesor = currentUser.nombre;
    } else {
      this.nombreProfesor = 'Profesor';
    }
  }

  goToAsignaturas() {
    this.router.navigate(['/asignatura-profesor']);
  }

  goToAsistencias() {
    this.router.navigate(['/asistencia-profesor']);
  }

  goToRegistrarAsistencia() {
    this.router.navigate(['/registrar-asistencia']);
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

  // Método para abrir/cerrar el menú
  toggleMenu() {
    this.menuCtrl.toggle(); // Usamos el MenuController para abrir o cerrar el menú
  }

  ngOnInit() {}
}
