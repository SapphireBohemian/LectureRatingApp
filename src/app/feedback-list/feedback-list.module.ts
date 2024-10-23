import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FeedbackListPageRoutingModule } from './feedback-list-routing.module';

import { FeedbackListPage } from './feedback-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FeedbackListPageRoutingModule
  ],
  declarations: [FeedbackListPage]
})
export class FeedbackListPageModule {}
