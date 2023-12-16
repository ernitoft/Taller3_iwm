import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiServiceService } from '../service/api-service.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  /**
   * Variable que contiene el formulario de registro.
   */
  form: FormGroup;

  /**
   * Variable que contiene los mensajes de error.
   */
  errorMessages: string[] = [];

  /**
   * Constructor de la pagina de registro.
   * @param fb Form builder.
   * @param apiService Servicio de la api.
   * @param router Router de la pagina.
   * @param alertController Alert controller.
   */
  constructor(public fb: FormBuilder, private apiService:ApiServiceService, private router:Router, public alertController: AlertController) {
    this.form = this.fb.group({
      name: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      rut:new FormControl('', Validators.required),
      yearBirth: new FormControl('', Validators.required),
    });
  }

  /**
   * Metodo que se ejecuta al iniciar la pagina.
   */
  ngOnInit() {
    this.limpiarErrores();
  }

  /**
   * Metodo que limpia los mensajes de error.
   */
  async limpiarErrores() {
    this.errorMessages = []
  }

  /**
   * Metodo que se ejecuta al enviar el formulario de registro.
   */
  async onSubmit() {
    try{
      this.limpiarErrores();
      if (this.form.invalid) {
        const alert = await this.alertController.create({
          header: 'Error',
          message: 'Todos los campos son obligatorios',
          buttons: ['Aceptar'],
        });
        await alert.present();
        return;
      }

      const response:any = await this.apiService.register(this.form.value);
      const response2:any = await this.apiService.login(response);
      localStorage.setItem('token', response2.token);
      localStorage.setItem('email', response2.email);
      this.router.navigate(['/editarinfo'],{ replaceUrl: true });
      
    }catch(error){
      if (error instanceof HttpErrorResponse && error.error && error.error.errors) {
        const emailErrors = error.error.errors.email;
        const rutErrors = error.error.errors.rut;
        const nameErrors = error.error.errors.name;
        const yearBirthErrors = error.error.errors.yearBirth;
        if (rutErrors && rutErrors.length > 0) {
          this.addErrorMessages(rutErrors);
        }
        if (nameErrors && nameErrors.length > 0) {
          this.addErrorMessages(nameErrors);
        }
        if (yearBirthErrors && yearBirthErrors.length > 0) {
          this.addErrorMessages(yearBirthErrors);
        }
        if (emailErrors && emailErrors.length > 0) {
          this.addErrorMessages(emailErrors);
        }
      } else if (error instanceof HttpErrorResponse && error.status === 500) {
        const errorResponse = "Error al crear usuario";
        this.addErrorMessages([errorResponse]);
      }else if (error instanceof HttpErrorResponse && error.status === 400) {
        const errorResponse = error.error.message;
        this.addErrorMessages([errorResponse]);
      }
       else{
        const errorResponse = "Error al crear usuario";
        this.addErrorMessages([errorResponse]);
      }
    }
  }
   /**
   * Añaade mensajes de error al arreglo de mensajes de error.
   * @param messages mensajes de error
   */
   addErrorMessages(messages: string[]) {
    for (let index = 0; index < messages.length; index++) {
      const element = messages[index];
      this.errorMessages.push(element);
    }
  }

}
