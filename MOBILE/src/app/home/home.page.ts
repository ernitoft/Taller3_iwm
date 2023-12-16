import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  /**
   * Constructor de la pagina de inicio.
   * @param router Router de la pagina.
   */
  constructor(public router:Router) { }

  /**
   * Metodo que se ejecuta al iniciar la pagina.
   */
  ngOnInit() {
  }

  /**
   * Metodo que va a la pagina de login.
   */
  login(){
    this.router.navigate(['/login']);
  }

  /**
   * Metodo que va a la pagina de registro.
   */
  register(){
    this.router.navigate(['/register']);
  }

}
