import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginGuard } from './guards/login.guards';

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
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule),

  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'visualizar',
    loadChildren: () => import('./visualizar/visualizar.module').then( m => m.VisualizarPageModule),
    canActivate: [LoginGuard],
  },
  {
    path: 'editarinfo',
    loadChildren: () => import('./editarinfo/editarinfo.module').then( m => m.EditarinfoPageModule),
    canActivate:[LoginGuard]
  },
  {
    path: 'editarinfo/perfil',
    loadChildren: () => import('./perfil/perfil.module').then( m => m.PerfilPageModule),
    canActivate:[LoginGuard]
  },
  {
    path: 'editarinfo/contrasena',    
    loadChildren: () => import('./contrasena/contrasena.module').then( m => m.ContrasenaPageModule),
    canActivate:[LoginGuard]
  },

  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }, )
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
