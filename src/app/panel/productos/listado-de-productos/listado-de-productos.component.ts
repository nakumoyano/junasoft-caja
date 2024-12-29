import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Producto } from 'src/app/models/producto/producto';
import { ProductosService } from 'src/app/services/productos/productos.service';

@Component({
  selector: 'app-listado-de-productos',
  templateUrl: './listado-de-productos.component.html',
  styleUrls: ['./listado-de-productos.component.css'],
})
export class ListadoDeProductosComponent implements OnInit {
  @Input() productos: Producto[] = [];

  totalRecords: any;
  loading: boolean = false;

  constructor(
    private productosService: ProductosService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAllDatos();
  }

  // d***************************************** FUNCION PARA OBTENER TODOS LOS DATOS ***********************************
  getAllDatos() {
    this.loading = true;
    this.productosService.getAllData().subscribe(
      (data: any) => {
        this.productos = data.resultado;
        console.log(this.productos);
        this.loading = false;
        this.totalRecords = this.productos?.length;
      },
      (error) => {
        console.error('Error al obtener los productos:', error);
      }
    );
  }

  // d***************************************** FUNCION PARA ELIMINAR ***********************************
  eliminar(marca: any) {
    this.productosService.deleteData(marca).subscribe({
      next: (response: any) => {
        if (response.statusCode === 204) {
          this.toastr.success('¡El producto se ha eliminado correctamente!');
          this.getAllDatos();
        } else {
        }
      },
      error: (error: any) => {
        this.toastr.error(
          'Ha ocurrido un error al intentar eliminar la marca.'
        );
      },
    });
  }

  // d***************************************** FUNCION PARA OBTENER EL TOTAL DE DATOS ***********************************
  obtenerTotalResultados(): number {
    return this.productos?.length;
  }

  // d***************************************** FUNCION PARA REDIRECCIONAR A AGREGAR PROYECTO ***********************************
  navigateToProducto() {
    this.router.navigate(['/admin/productos/agregar-producto']);
  }
}
