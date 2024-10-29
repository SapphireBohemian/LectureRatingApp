import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RatingsGraphPage } from './ratings-graph.page';

const routes: Routes = [
  {
    path: '',
    component: RatingsGraphPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RatingsGraphPageRoutingModule {}
