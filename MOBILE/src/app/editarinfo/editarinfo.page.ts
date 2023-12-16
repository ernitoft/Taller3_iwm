import { HttpClient } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { Route, Router } from '@angular/router';
import { ApiServiceService } from 'src/app/service/api-service.service';

@Component({
  selector: 'app-editarinfo',
  templateUrl: './editarinfo.page.html',
  styleUrls: ['./editarinfo.page.scss'],
})
export class EditarinfoPage implements OnInit {

  /**
   * Variables de la clase.
   * 
   * Variable que contiene los datos del usuario.
   */
  logUser: any = [];
  user: any;

  /**
   * Constructor de la pagina de informacion.
   * @param userService API de usuarios.
   */
  constructor(private userService: ApiServiceService, private router: Router) { }

  public actionSheetButtons = [
    {
      text: 'Actualizar perfil',
      handler: () => this.navigateToPerfil(),
    },
    {
      text: 'Cambiar contraseña',
      handler: () => this.navigateToContrasena(),
    },
    {
      text: 'Cancelar',
      role: 'cancel',
      data: {
        action: 'cancel',
      },
    }
  ];
  
  /**
   * Metodo que va al actualizar perfil.
   */
  private navigateToPerfil() {
    this.router.navigate(['editarinfo/perfil']);
  }
  
  /**
   * Metodo que va a cambiar contraseña.
   */
  private navigateToContrasena() {
    this.router.navigate(['editarinfo/contrasena']);
  }

  /**
   * Funcion que se ejecuta al iniciar la pagina.
   */
  ngOnInit() {
    this.obtenerDatos();    
  }

  /**
   * Funcion para obtener los datos del usuario logueado.
   */
  obtenerDatos() {
    this.userService.getInfo(localStorage.getItem('email')).subscribe((data:any) => {
      this.logUser = data;
    });
  }

}
