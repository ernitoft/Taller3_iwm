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
    path: 'menu-login',
    canActivate: [loginGuard],
    loadChildren: () => import('./menu/menu-login/menu-login.module').then( m => m.MenuLoginPageModule)
  },
  {
    path: 'visualizar',
    canActivate: [loginGuard],
    loadChildren: () => import('./menu/visualizar/visualizar.module').then( m => m.VisualizarPageModule)
  },
  {
    path: 'editarinfo',
    canActivate: [loginGuard],
    loadChildren: () => import('./menu/editarinfo/editarinfo.module').then( m => m.EditarinfoPageModule)
  },
  {
    path: 'perfil',
    loadChildren: () => import('./menu/actualizar/perfil/perfil.module').then( m => m.PerfilPageModule)
  },
  {
    path: 'contrasena',
    loadChildren: () => import('./menu/actualizar/contrasena/contrasena.module').then( m => m.ContrasenaPageModule)
  },
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }, )
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
