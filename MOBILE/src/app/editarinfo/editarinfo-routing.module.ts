import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditarinfoPage } from './editarinfo.page';

const routes: Routes = [
  {
    path: '',
    component: EditarinfoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditarinfoPageRoutingModule {}
