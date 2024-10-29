import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RatingsGraphPageRoutingModule } from './ratings-graph-routing.module';

import { RatingsGraphPage } from './ratings-graph.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RatingsGraphPageRoutingModule
  ],
  declarations: [RatingsGraphPage]
})
export class RatingsGraphPageModule {}
