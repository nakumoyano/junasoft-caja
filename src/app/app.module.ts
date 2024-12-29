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
import { ToolbarModule } from 'primeng/toolbar';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
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
import { AgregarCategoriaComponent } from './panel/categorias/agregar-categoria/agregar-categoria.component';
import { ListadoDeCategoriasComponent } from './panel/categorias/listado-de-categorias/listado-de-categorias.component';
import { AgregarProductoComponent } from './panel/productos/agregar-producto/agregar-producto.component';
import { ListadoDeProductosComponent } from './panel/productos/listado-de-productos/listado-de-productos.component';
import { CrearAdministradorComponent } from './panel/administradores/crear-administrador/crear-administrador.component';
import { CajaComponent } from './panel/caja/caja/caja.component';
import { EditarAperturaCajaComponent } from './panel/caja/editar-apertura-caja/editar-apertura-caja.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    BotonCancelarComponent,
    BotonEliminarComponent,
    PanelRightComponent,
    SkeletonGridComponent,
    DashboardComponent,
    AgregarCategoriaComponent,
    ListadoDeCategoriasComponent,
    AgregarProductoComponent,
    ListadoDeProductosComponent,
    CrearAdministradorComponent,
    CajaComponent,
    EditarAperturaCajaComponent,
  ],
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
    ToolbarModule,
    CardModule,
    CalendarModule,
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
