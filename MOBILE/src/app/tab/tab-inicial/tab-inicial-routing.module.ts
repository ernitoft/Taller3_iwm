import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabInicialPage } from './tab-inicial.page';

const routes: Routes = [
  {
    path: '',
    component: TabInicialPage,
    children: [
      {
        path: 'editarinfo',
        loadChildren: () => import('../../tab/editarinfo/editarinfo.module').then( m => m.EditarinfoPageModule)
      },
      {
        path: 'visualizar',
        loadChildren: () => import('../../tab/visualizar/visualizar.module').then( m => m.VisualizarPageModule)
      },
    ]
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabInicialPageRoutingModule {}
