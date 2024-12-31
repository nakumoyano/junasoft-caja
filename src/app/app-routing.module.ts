import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './panel/dashboard/dashboard.component';
import { AgregarCategoriaComponent } from './panel/categorias/agregar-categoria/agregar-categoria.component';
import { ListadoDeCategoriasComponent } from './panel/categorias/listado-de-categorias/listado-de-categorias.component';
import { AgregarProductoComponent } from './panel/productos/agregar-producto/agregar-producto.component';
import { ListadoDeProductosComponent } from './panel/productos/listado-de-productos/listado-de-productos.component';
import { CrearAdministradorComponent } from './panel/administradores/crear-administrador/crear-administrador.component';
import { CajaComponent } from './panel/caja/caja/caja.component';
import { EditarAperturaCajaComponent } from './panel/caja/editar-apertura-caja/editar-apertura-caja.component';
import { LoginComponent } from './auth/login/login.component';
import { CargarVentaComponent } from './panel/ventas/cargar-venta/cargar-venta.component';
import { ListadoDeVentasComponent } from './panel/ventas/listado-de-ventas/listado-de-ventas.component';
import { ListadoDeAdministradoresComponent } from './panel/administradores/listado-de-administradores/listado-de-administradores.component';
import { ConfiguracionComponent } from './panel/configuracion/configuracion.component';

const routes: Routes = [
  // AUTH
  { path: '', redirectTo: '/admin/login', pathMatch: 'full' },
  {
    path: 'admin/login',
    component: LoginComponent,
    data: { title: 'Login | Junasoft - Caja' },
  },
  // DASHBOARD
  {
    path: 'admin/dashboard',
    component: DashboardComponent,
    data: { title: 'Dashboard | Junasoft - Caja' },
  },
  // PRODUCTOS
  {
    path: 'admin/productos/agregar-producto',
    component: AgregarProductoComponent,
    data: { title: 'Agregar Producto | Junasoft - Caja' },
  },
  {
    path: 'admin/productos/editar-producto/:id',
    component: AgregarProductoComponent,
    data: { title: 'Editar Producto | Junasoft - Caja' },
  },
  {
    path: 'admin/productos/listado-de-productos',
    component: ListadoDeProductosComponent,
    data: { title: 'Listado de Productos | Junasoft - Caja' },
  },
  // CATEGORIAS
  {
    path: 'admin/categorias/agregar-categoria',
    component: AgregarCategoriaComponent,
    data: { title: 'Agregar Categoría | Junasoft - Caja' },
  },
  {
    path: 'admin/categorias/editar-categoria/:id',
    component: AgregarCategoriaComponent,
    data: { title: 'Editar Categoría | Junasoft - Caja' },
  },
  {
    path: 'admin/categorias/listado-de-categorias',
    component: ListadoDeCategoriasComponent,
    data: { title: 'Listado de Categorías | Junasoft - Caja' },
  },
  // USUARIOS
  {
    path: 'admin/administradores/registrar-administrador',
    component: CrearAdministradorComponent,
    data: { title: 'Registrar Administrador | Junasoft - Caja' },
  },
  {
    path: 'admin/administradores/listado-de-administradores',
    component: ListadoDeAdministradoresComponent,
    data: { title: 'Listado de Administradores | Junasoft - Caja' },
  },
  // CAJA
  {
    path: 'admin/caja',
    component: CajaComponent,
    data: { title: 'Caja' },
  },
  {
    path: 'admin/caja/editar-caja/:id',
    component: EditarAperturaCajaComponent,
    data: { title: 'Caja - Editar caja' },
  },
  // VENTAS
  {
    path: 'admin/ventas/cargar-venta',
    component: CargarVentaComponent,
    data: { title: 'Cargar Venta | Junasoft - Caja' },
  },
  {
    path: 'admin/ventas/editar-venta/:id',
    component: CargarVentaComponent,
    data: { title: 'Editar Venta | Junasoft - Caja' },
  },
  {
    path: 'admin/ventas/listado-de-ventas',
    component: ListadoDeVentasComponent,
    data: { title: 'Listado de Ventas | Junasoft - Caja' },
  },
  // VENTAS
  {
    path: 'admin/configuracion',
    component: ConfiguracionComponent,
    data: { title: 'Configuración | Junasoft - Caja' },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' })],

  exports: [RouterModule],
})
export class AppRoutingModule {}
