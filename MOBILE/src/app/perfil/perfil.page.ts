import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { ApiServiceService } from 'src/app/service/api-service.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  /**
   * Variable que contiene los datos del usuario.
   */
  logUser: any = [];


  /**
   * Variable que contiene el formulario de perfil actualizar.
   */
  form: FormGroup;
  /**
   * Variable que contiene los mensajes de error.
   */
  errorMessages: string[] = [];
  
  /**
   * Constructor de la clase.
   * @param userService Servicio para obtener los datos del usuario logueado.
   * @param formBuilder Form builder para el formulario.
   * @param navController Nav controller para navegar entre paginas.
   * @param alertController Alert controller para mostrar alertas.
   * @param router Router para navegar entre paginas.
   */
  constructor(private userService: ApiServiceService, private formBuilder: FormBuilder, 
    private alertController: AlertController,
    private router: Router) {
    
    this.form = this.formBuilder.group({
      id: new FormControl(''),
      name :  new FormControl(null, Validators.required),
      email : new FormControl(null, Validators.required),
      yearBirth : new FormControl(null, Validators.required),
    });
  }

  /**
   * Funcion que se ejecuta al iniciar la pagina.
   */
  ngOnInit() {
    this.router.navigate(['editarinfo/perfil']);
    console.log("AAAAAAAAAAAAAAAAAAAAAAA")
    this.obtenerDatos();    


  }

  /**
   * Funcion para obtener los datos del usuario logueado.
   */
  obtenerDatos() {
    this.userService.getInfo(localStorage.getItem('email')).subscribe((data:any) => {
      this.logUser = data;
    });

    this.form.controls['name'].setValue(this.logUser.usuario[0].name);
    this.form.controls['email'].setValue(this.logUser.usuario[0].email);
    this.form.controls['yearBirth'].setValue(this.logUser.usuario[0].yearBirth);
  }

  /**
   * Funcion para actualizar los datos del usuario una vez se confirme la actualizacion.
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
      const response:any = await this.userService.updateInfo(this.form.value);
      if (!response.error) {
        const alert = await this.alertController.create({
          header: 'Perfil actualizado',
          message: 'Su perfil ha sido actualizado correctamente',
          buttons: ['Aceptar'],
        });
        await alert.present();
        this.router.navigate(['/editarinfo']);
      }
    }catch(error:any){
      console.log(error); 
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
        const errorResponse = "Error al cambiar perfil";
        this.addErrorMessages([errorResponse]);
      } else if (error instanceof HttpErrorResponse && error.status === 400) {
        const errorResponse = error.error.message;
        this.addErrorMessages([errorResponse]);
      } else{
        const errorResponse = "Error al cambiar perfil";
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
            this.router.navigate(['/editarinfo']);
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
