import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { ApiServiceService } from '../service/api-service.service';
import { HttpErrorResponse } from '@angular/common/http';

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
  constructor(public fb: FormBuilder, private router: Router, private usersService: ApiServiceService) {
    this.formulario = this.fb.group({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });

    
  }

  ngOnInit() {
    this.errorMessages = [];
  }

  async onSubmit() {
    try {
      const response:any = await this.usersService.login(this.formulario.value);
      if (!response.error) {
        localStorage.setItem('token', response.token);
        localStorage.setItem('email', response.email);
        this.router.navigate(['/tab-inicial/editarinfo']);
      }
    } catch (error: any) {
      if (this.formulario.value.email === '' || this.formulario.value.password === '') {
        const errorResponse = "Credenciales incorrectas";
        this.addErrorMessages([errorResponse]);
      }
      if (error instanceof HttpErrorResponse && error.error && error.error.errors) {
        const usernameErrors = error.error.errors.username;
        const passwordErrors = error.error.errors.password;
        if (usernameErrors && usernameErrors.length > 0) {
          this.addErrorMessages(usernameErrors);
        }
        if (passwordErrors && passwordErrors.length > 0) {
          this.addErrorMessages(passwordErrors);
        }
      } else if (error instanceof HttpErrorResponse && error.status === 500) {
          const errorResponse = "Credenciales incorrectas";
          this.addErrorMessages([errorResponse]);
      } else if (error instanceof HttpErrorResponse && error.status === 400) {
        const errorResponse = "Credenciales incorrectas";
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

  register() {
    this.router.navigate(['/register']);
  }

}
