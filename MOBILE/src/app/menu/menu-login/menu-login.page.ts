import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-menu-login',
  templateUrl: './menu-login.page.html',
  styleUrls: ['./menu-login.page.scss'],
})
export class MenuLoginPage implements OnInit {

  indiceSeleccionado: number = 0;
  
  paginas = [
    {
      titulo: 'Visualizar',
      url: '/menu-login/visualizar',
      icono: 'eye'
    },
    {
      titulo: 'Editar Informacion',
      url: '/menu-login/editarinfo',
      icono: 'create'
    }
  ]

  constructor(public alertController: AlertController, public navController: NavController) { }

  ngOnInit() {
  }

  cambiarIndiceSeleccionado(i: number){
    this.indiceSeleccionado = i;
  }

  async salir() {
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
