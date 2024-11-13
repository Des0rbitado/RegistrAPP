import { Component, ViewChild } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { IonInput } from '@ionic/angular';
import { MenuController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  selectedCard: string = 'first';
  username: string = '';
  password: string = '';

  @ViewChild('usernameInput', { static: false }) usernameInput!: IonInput;
  @ViewChild('passwordInput', { static: false }) passwordInput!: IonInput;

  constructor(
    private alertController: AlertController,
    private authService: AuthService,
    private navCtrl: NavController,
    private menu: MenuController,
  ) {}

  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['Entendido'],
    });
    await alert.present();
  }

  async restablecerPwd() {
    const alert = await this.alertController.create({
      header: "Recuperar Contraseña",
      subHeader: "Verifica tu Correo",
      message: "Se ha enviado un correo a la dirección proporcionada para restablecer la contraseña del usuario mencionado.",
      buttons: ['Entendido']
    });
    await alert.present();
  }

  async login() {
    const isStudent = this.selectedCard === 'first';

    if (!this.username) {
      this.presentAlert('Campo vacío', 'Por favor, ingresa tu usuario.');
      await this.usernameInput.setFocus();
      return;
    }

    if (!this.password) {
      this.presentAlert('Campo vacío', 'Por favor, ingresa tu contraseña.');
      await this.passwordInput.setFocus();
      return;
    }

    const user = await this.authService.login(this.username, this.password, isStudent);

    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));

      if (isStudent) {
        this.navCtrl.navigateRoot('/menu-alumno');
      } else {
        this.navCtrl.navigateRoot('/menu-profesor');
      }
    } else {
      this.presentAlert('Error', 'Usuario o contraseña incorrectos');
    }
  }

  ngOnInit() {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      const user = JSON.parse(currentUser);
      const isStudent = user.tipo === 'alumno';

      this.navCtrl.navigateRoot(isStudent ? '/menu-alumno' : '/menu-profesor');
    }
  }
  toggleMenu() {
    this.menu.toggle('myMenu');
  }
}
