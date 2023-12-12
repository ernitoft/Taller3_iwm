import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { firstValueFrom } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  /**
   * Endpoiint de la API Laravel.
   */
  private endpoint = 'http://127.0.0.1:8000/api/';

  /**
   * Constructor de la clase.
   * @param http variable para hacer peticiones http.
   */
  constructor(private http: HttpClient) { }

  /**
   * Login de usuario.
   * @param form formulario de login.
   * @returns respuesta de la API.
   */
  login (form: any) {
    return firstValueFrom(this.http.post(this.endpoint + 'login', form));
  }

  /**
   * Registrar usuario.
   * @param form formulario de registro.
   * @returns respuesta de la API.
   */
  register (form: any) {
    return firstValueFrom(this.http.post(this.endpoint + 'register', form));
  }

  /**
   * Obtener informacion de usuario.
   * @param id id del usuario.
   * @returns respuesta de la API.
   */
  getInfo (email:any) {
    return this.http.get<any>(this.endpoint + 'user/' + email,this.crearHeader());
  }
  /**
   * Actualizar informacion de usuario.
   * @param form formulario de actualizacion de informacion.
   * @returns respuesta de la API.
   */
  updateInfo (form: any) {
    return firstValueFrom(this.http.patch(this.endpoint + 'updateInfo/'+form.id, form, this.crearHeader()));
  }

  /**
   * Actualizar contraseña.
   * @param form contraseña nueva y contraseña confirmada.
   * @returns respuesta de la API.
   */
  updatePassword (form: any) {
    return firstValueFrom(this.http.patch(this.endpoint + 'updatePassword/'+form.id, form, this.crearHeader()));
  }

  /**
   * Funcion para verificar si el usuario esta logueado.
   * @returns true si esta logueado, false si no lo esta.
   */
  estaLogueado () {
    return localStorage.getItem('token') ? true : false;
  }

  /**
   * Crear headers de la API.
   * @returns headers de la API.
   */
  crearHeader () {
    return {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      })
    }
  }
}
