import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { MenuController } from '@ionic/angular';
import { AlertController, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-asignatura-profesor',
  templateUrl: './asignatura-profesor.page.html',
  styleUrls: ['./asignatura-profesor.page.scss'],
})
export class AsignaturaProfesorPage implements OnInit {
  subjectsWithDetails: any[] = [];
  constructor(
    private alertController: AlertController,
    private authService: AuthService,
    private menu: MenuController, // Agrega el controlador de menú
    private router: Router,
  ) {}

  async ngOnInit() {
    try {
      const teacherId = this.getUserId();

      const subjectCodes = await this.authService.getTeacherSubjects(this.getUserId());
      console.log('Códigos de asignaturas:', subjectCodes);

      if (subjectCodes.length === 0) {
        console.warn('No se encontraron asignaturas para este estudiante.');
        return; 
      }

      const subjectDetailsPromises = subjectCodes.map((code: string) => this.authService.getSubjectDetails(code));
      const subjectsDetails = await Promise.all(subjectDetailsPromises);
      console.log('Detalles de asignaturas:', subjectsDetails);

      this.subjectsWithDetails = subjectsDetails
        .filter(subject => subject !== null)
        .map(subject => ({
          ...subject!,
          secciones: subject!.secciones.filter(seccion =>
            seccion.alumnos_inscritos.includes(parseInt(teacherId))
          )
        }))
        .filter(subject => subject.secciones.length > 0);

      console.log('Asignaturas con secciones filtradas:', this.subjectsWithDetails);

    } catch (error) {
      console.error('Error al obtener los detalles de las asignaturas', error);
    }
  }


  private getUserId(): string {
    const user = this.authService.getCurrentUser();
    return user ? user.id : '';
  }

  toggleMenu() {
    this.menu.toggle('myMenu');
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

