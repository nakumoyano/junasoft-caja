import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './panel/dashboard/dashboard.component';

const routes: Routes = [
  {
    path: 'admin/dashboard',
    component: DashboardComponent,
    data: { title: 'Dashboard | Junasoft - Caja' },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' })],

  exports: [RouterModule],
})
export class AppRoutingModule {}
