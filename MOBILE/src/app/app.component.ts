import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  /**
   * Constructor de la página.
   * @param router router de la página
   * @param alertController alert controller de la página
   * @param navController nav controller de la página
   */
  constructor(private router: Router, private alertController: AlertController, private navController: NavController) {}

  /**
   * Método que desloguea al usuario.
   */
  async logout() {
    const alert = await this.alertController.create({
      header: 'Cerrar Sesión',
      message: '¿Está seguro que desea salir?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('No se ha cerrado sesión');
          }
        }, {
          text: 'Aceptar',
          handler: () => {
            localStorage.removeItem('token');
            localStorage.removeItem('email');
            this.navController.navigateRoot('/home');
          }
        }
      ]
    });

    await alert.present();
  }

}
