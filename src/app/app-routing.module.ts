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

const routes: Routes = [
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
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' })],

  exports: [RouterModule],
})
export class AppRoutingModule {}
