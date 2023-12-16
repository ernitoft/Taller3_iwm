import { Router } from '@angular/router';
import { inject } from '@angular/core';

export const loginGuard = () =>{
/**
 * Funcion que verifica si el usuario está logueado.
 */
    const router = inject(Router);
    if (localStorage.getItem('token')) {
        return true;
    } else {
        router.navigate(['login']);   
        return false;
    }
} 