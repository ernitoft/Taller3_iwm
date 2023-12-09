import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditarinfoPageRoutingModule } from './editarinfo-routing.module';

import { EditarinfoPage } from './editarinfo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditarinfoPageRoutingModule
  ],
  declarations: [EditarinfoPage]
})
export class EditarinfoPageModule {}
