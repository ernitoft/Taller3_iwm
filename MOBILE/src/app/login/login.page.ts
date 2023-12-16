import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { ApiServiceService } from '../service/api-service.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  /**
   * Variable que contiene el formulario de login.
   */
  formulario: FormGroup;
  /**
   * Variable que contiene los mensajes de error.
   */
  errorMessages: string[] = [];
/**
 * Constructor de la pagina de login.
 * @param fb form builder.
 * @param router router de la pagina.
 * @param usersService servicio de usuarios.
 */
  constructor(public fb: FormBuilder, private router: Router, private usersService: ApiServiceService, public alertController: AlertController, private navController: NavController) {
    this.formulario = this.fb.group({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }
/**
 * Metodo que se ejecuta al iniciar la pagina.
 */
  ngOnInit() {
    this.errorMessages = [];
  }
/**
 * Metodo que se ejecuta al enviar el formulario de login.
 */
  async onSubmit() {
    try {
      if (this.formulario.invalid) {
        const alert = await this.alertController.create({
          header: 'Error',
          message: 'Todos los campos son obligatorios',
          buttons: ['Aceptar'],
        });
        await alert.present();
        return;
      }
      const response:any = await this.usersService.login(this.formulario.value);
      localStorage.setItem('token', response.token);
      localStorage.setItem('email', response.email);
      console.log('Inicio de sesión exitoso');
      await this.navigateToEditarInfo();
      console.log('Fin de la navegación a /editarinfo');
    } catch (error:any) {
      if (error instanceof HttpErrorResponse && error.error && error.error.errors) {
        const emailErrors = error.error.errors.email;
        const passwordErrors = error.error.errors.password;
        if (emailErrors && emailErrors.length > 0) {
          this.addErrorMessages(emailErrors);
        }
        if (passwordErrors && passwordErrors.length > 0) {
          this.addErrorMessages(passwordErrors);
        }
      } else if (error instanceof HttpErrorResponse && error.status === 500) {
          const errorResponse = error.error.message ;
          this.addErrorMessages([errorResponse]);
      } else if (error instanceof HttpErrorResponse && error.status === 400) {
        const errorResponse = error.error.message;
        this.addErrorMessages([errorResponse]);
      } else if (error instanceof HttpErrorResponse && error.status === 401) {
        const errorResponse = error.error.message;
        console.log(errorResponse);
        this.addErrorMessages([errorResponse]);
        console.log(this.errorMessages);
      } else if (error instanceof HttpErrorResponse && error.status === 404) {
        const errorResponse = "No encontrado";
        this.addErrorMessages([errorResponse]);
      }
    } 
  }

  /**
   * Añade mensajes de error a la lista de mensajes de error.
   * @param messages Lista de mensajes de error.
   */
  addErrorMessages(messages: string[]) {
    for (let index = 0; index < messages.length; index++) {
      const element = messages[index];
      this.errorMessages.push(element);
    }
  }

  /**
   * Metodo que redirige a la pagina de registro.
   */
  register() {
    this.router.navigate(['/register']);
  }
  
  /**
   * Metodo que redirige a la pagina de perfil
   */
  navigateToEditarInfo() {
    this.router.navigate(['/editarinfo']);
  }

}
