import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { HttpClientModule } from '@angular/common/http';
import { AccordionModule } from 'primeng/accordion';
import { DropdownModule } from 'primeng/dropdown';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { BotonCancelarComponent } from './components/boton-cancelar/boton-cancelar.component';
import { BotonEliminarComponent } from './components/boton-eliminar/boton-eliminar.component';
import { PanelRightComponent } from './components/panel-right/panel-right.component';
import { SkeletonGridComponent } from './components/skeleton-grid/skeleton-grid.component';
import { DashboardComponent } from './panel/dashboard/dashboard.component';

@NgModule({
  declarations: [AppComponent, SidebarComponent, BotonCancelarComponent, BotonEliminarComponent, PanelRightComponent, SkeletonGridComponent, DashboardComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    DialogModule,
    TableModule,
    ToastModule,
    HttpClientModule,
    ConfirmDialogModule,
    AccordionModule,
    CardModule,
    DropdownModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      closeButton: true,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
