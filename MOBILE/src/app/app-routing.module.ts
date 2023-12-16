import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { loginGuard } from './guards/login.guards';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'visualizar',
    loadChildren: () => import('./visualizar/visualizar.module').then( m => m.VisualizarPageModule)
  },
  {
    path: 'editarinfo',
    loadChildren: () => import('./editarinfo/editarinfo.module').then( m => m.EditarinfoPageModule)
  },
  {
    path: 'editarinfo/perfil',
    loadChildren: () => import('./perfil/perfil.module').then( m => m.PerfilPageModule)
  },
  {
    path: 'editarinfo/contrasena',    
    loadChildren: () => import('./contrasena/contrasena.module').then( m => m.ContrasenaPageModule)
  },

  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }, )
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
