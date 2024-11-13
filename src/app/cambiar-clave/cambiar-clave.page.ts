import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AlertController, MenuController} from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cambiar-clave',
  templateUrl: './cambiar-clave.page.html',
  styleUrls: ['./cambiar-clave.page.scss'],
})
export class CambiarClavePage {
  claveAntigua: string = '';
  claveNueva: string = '';
  confirmarClaveNueva: string = '';

  constructor(
    private authService: AuthService,
    private alertController: AlertController,
    private router: Router,
    private menu: MenuController
  ) {}

  toggleMenu() {
    this.menu.toggle(); 
  }

  async cambiarClave() {
    const currentUser = this.authService.getCurrentUser();

    if (currentUser && currentUser.contraseña === this.claveAntigua) {
      if (this.claveNueva === this.confirmarClaveNueva) {
        currentUser.contraseña = this.claveNueva;
        this.authService.updateUserPassword(currentUser);

        const alert = await this.alertController.create({
          header: 'Éxito',
          message: 'Contraseña actualizada correctamente.',
          buttons: ['OK']
        });
        await alert.present();

        this.authService.logout();
        this.router.navigate(['/home']);
      } else {
        const alert = await this.alertController.create({
          header: 'Error',
          message: 'La nueva clave y la confirmación no coinciden.',
          buttons: ['OK']
        });
        await alert.present();
      }
    } else {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Ingrese su clave antigua.',
        buttons: ['OK']
      });
      await alert.present();
      
    }
    
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
