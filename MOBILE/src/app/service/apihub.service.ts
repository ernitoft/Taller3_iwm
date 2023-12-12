import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class ApihubService {

  /**
   * Endpoiint de la API Github.
   */
  private endpoint = 'https://api.github.com/'
  /**
   * Constructor de la clase.
   * @param httpClient variable para hacer peticiones http.
   */
  constructor(private httpClient: HttpClient) { }


  /**
   * Obtiene todos los repositorios del ayudante David.
   * @returns repositorios del ayudante David.
   */
  Repositorios(){
    return this.httpClient.get(this.endpoint + 'users/Dizkm8/repos');
  }

  /**
   * Obtiene todos los commits de un repositorio.
   * @param repositorio nombre del repositorio.
   * @returns commits del repositorio.
   */
  CommitsRepo(repositorio:string){
    return this.httpClient.get<any>(this.endpoint + 'repos/Dizkm8/'+repositorio+'/commits');
  }

  /**
   * Obtiene un repositorio.
   * @param repositorio nombre del repositorio.
   * @returns informacion del repositorio.
   */
  obtenerRepositorio(repositorio:string){
    return this.httpClient.get<any>(this.endpoint + 'repos/Dizkm8/'+repositorio);
  }
}
