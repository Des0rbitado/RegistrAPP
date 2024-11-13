import { Component, OnInit } from '@angular/core';
import { AlertController, MenuController, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { QrScannerModalComponent } from '../qr-scanner-modal/qr-scanner-modal.component';


@Component({
  selector: 'app-menu-alumno',
  templateUrl: './menu-alumno.page.html',
  styleUrls: ['./menu-alumno.page.scss'],
})
export class MenuAlumnoPage implements OnInit {
  welcomeMessage: string = '';
  codigoAsistencia: string = '';

  constructor(
    private alertController: AlertController,
    private authService: AuthService,
    private router: Router,
    private modalController: ModalController,
    private menuController: MenuController  // Asegúrate de agregar esto
  ) {
    this.setWelcomeMessage();
}

  ngOnInit() {}

  async openQrScanner() {
    const modal = await this.modalController.create({
      component: QrScannerModalComponent,
    });

    modal.onDidDismiss().then((result) => {
      if (result.data) {
        this.codigoAsistencia = result.data;
        this.registrarAsistenciaConCodigo(result.data);
      }
    });

    await modal.present();
  }

  async registrarAsistenciaConCodigo(codigo: string) {
    const [codigoSeccion, fecha] = codigo.split('|');
    
    if (codigoSeccion && fecha) {
      const usuario = this.authService.getCurrentUser();
      const alumnoId = usuario.id;
      const estado = 'presente';
  
      this.authService.getAsistenciasAlumno(alumnoId, codigoSeccion).subscribe(
        async (asistencias) => {
          const asistenciaExistente = asistencias.some((asistencia: any) =>
            asistencia.asistencias.some((a: any) => a.fecha === fecha)
          );
  
          if (asistenciaExistente) {
            const alert = await this.alertController.create({
              header: 'Asistencia ya registrada',
              message: 'Ya existe una asistencia registrada para esta sección y fecha.',
              buttons: ['OK']
            });
            await alert.present();
          } else {
            this.authService.addAsistencia(alumnoId, codigoSeccion, fecha, estado).subscribe(
              async (response) => {
                const successAlert = await this.alertController.create({
                  header: 'Éxito',
                  message: 'Asistencia registrada correctamente',
                  buttons: ['OK']
                });
                await successAlert.present();
              },
              async (error) => {
                const errorAlert = await this.alertController.create({
                  header: 'Error',
                  message: `Algo salió mal al registrar la asistencia: ${error.message || error}`,
                  buttons: ['OK']
                });
                await errorAlert.present();
              }
            );
          }
        },
        async (error) => {
          const errorAlert = await this.alertController.create({
            header: 'Error',
            message: `Error al verificar la asistencia: ${error.message || error}`,
            buttons: ['OK']
          });
          await errorAlert.present();
        }
      );
    } else {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'El formato del código no es válido.',
        buttons: ['OK']
      });
      await alert.present();
      this.codigoAsistencia = '';
    }
  }

  private setWelcomeMessage() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    this.welcomeMessage = currentUser?.nombre ? `Bienvenido ${currentUser.nombre}` : 'Bienvenido';
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
  toggleMenu() {
    // Aquí usarías el menuController para abrir o cerrar el menú
    this.menuController.toggle();  
  }
}

