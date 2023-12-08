import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  formulario: FormGroup;
  

  constructor(public fb: FormBuilder, private router: Router) {
    this.formulario = this.fb.group({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });

    
  }

  ngOnInit() {
  }

  login() {
    this.router.navigate(['/home']);
  }

  register() {
    this.router.navigate(['/register']);
  }

}
