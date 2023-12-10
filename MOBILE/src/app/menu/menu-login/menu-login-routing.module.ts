import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuLoginPage } from './menu-login.page';

const routes: Routes = [
  {
    path: '',
    component: MenuLoginPage,
    children: [
      {
        path: 'visualizar',
        loadChildren: () => import('../visualizar/visualizar.module').then( m => m.VisualizarPageModule)
      },
      {
        path: 'editarinfo',
        loadChildren: () => import('../editarinfo/editarinfo.module').then( m => m.EditarinfoPageModule)
      }, 
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuLoginPageRoutingModule {}
