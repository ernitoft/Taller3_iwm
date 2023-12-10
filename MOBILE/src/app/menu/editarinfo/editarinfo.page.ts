import { HttpClient } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
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
   * Variable que contiene la ruta de la pagina.
   */
  route = inject(Router);

  /**
   * Constructor de la pagina de informacion.
   * @param userService API de usuarios.
   */
  constructor(private userService: ApiServiceService) { }

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
