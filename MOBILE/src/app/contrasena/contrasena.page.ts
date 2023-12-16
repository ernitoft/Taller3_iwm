import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { ApiServiceService } from 'src/app/service/api-service.service';

@Component({
  selector: 'app-contrasena',
  templateUrl: './contrasena.page.html',
  styleUrls: ['./contrasena.page.scss'],
})
export class ContrasenaPage implements OnInit {

  /**
   * Variable que contiene los datos del usuario.
   */
  logUser: any = [];

  /**
   * Variable que contiene los mensajes de error.
   */
  errorMessages: string[] = [];

  /**
   * Variable que contiene el formulario de contraseñas.
   */
  form: FormGroup;

  /**
   * Constructor de la pagina de contraseñas.
   * @param fb Form builder del registro
   * @param alertController Alert controller
   * @param navController Nav controller
   */
  constructor(private fb: FormBuilder,
    private alertController: AlertController,
    private navController: NavController,
    private apiService: ApiServiceService,
    private router: Router) {

    this.form = this.fb.group({
      id: new FormControl(''),
      newPassword: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required),
    });

  }

  /**
   * Metodo que se ejecuta al iniciar la pagina.
   */
  ngOnInit() {
    this.apiService.getInfo(localStorage.getItem('email')).subscribe((data:any) => {
      this.logUser = data;
    });
  }


  /**
   * Metodo que se ejecuta al enviar el formulario de contraseñas.
   */
  async onSubmit() {
    try{
      if (this.form.invalid) {
        const alert = await this.alertController.create({
          header: 'Error',
          message: 'Todos los campos son obligatorios',
          buttons: ['Aceptar'],
        });
        await alert.present();
        return;
      }
    
      this.form.controls['id'].setValue(this.logUser.usuario[0].id);

      const response:any = await this.apiService.updatePassword(this.form.value);
      if (!response.error) {
        const alert = await this.alertController.create({
          header: 'Contraseña actualizada',
          message: 'Su contraseña ha sido actualizada correctamente',
          buttons: ['Aceptar'],
        });
        await alert.present();
        this.router.navigate(['/editarinfo'],{ replaceUrl: true });
      }
    }catch(error:any){
      if (error instanceof HttpErrorResponse && error.error && error.error.errors) {
        const emailErrors = error.error.errors.email;
        const nameErrors = error.error.errors.name;
        const yearBirthErrors = error.error.errors.yearBirth;
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
        const errorResponse = "Error al cambiar contraseña";
        this.addErrorMessages([errorResponse]);
      } else if (error instanceof HttpErrorResponse && error.status === 400) {
        const errorResponse = error.error.message;
        this.addErrorMessages([errorResponse]);
      } else{
        const errorResponse = "Error al cambiar contraseña";
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
  /**
   * Metodo que cancela el cambio de contraseña
   */
  async volver() {
    const alert = await this.alertController.create({
      header: 'Cancelar',
      message: '¿Está seguro que desea cancelar la operación?',
      buttons: [
        {
          text: 'Cancelar operación',
          role: 'cancel',
          handler: () => {
            this.router.navigate(['/editarinfo'],{ replaceUrl: true });
          }
        }, {
          text: 'Continuar operación',
          role: 'continue',
        }
      ]
    });
    await alert.present();
  } 
}
