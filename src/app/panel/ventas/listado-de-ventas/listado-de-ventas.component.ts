import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Venta } from 'src/app/models/venta/venta';
import { VentasService } from 'src/app/services/ventas/ventas.service';

@Component({
  selector: 'app-listado-de-ventas',
  templateUrl: './listado-de-ventas.component.html',
  styleUrls: ['./listado-de-ventas.component.css'],
})
export class ListadoDeVentasComponent implements OnInit {
  @Input() ventas: Venta[] = [];

  totalRecords: any;
  loading: boolean = false;

  constructor(
    private ventasService: VentasService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAllDatos();
  }

  // d***************************************** FUNCION PARA OBTENER TODOS LOS DATOS ***********************************
  getAllDatos() {
    this.loading = true;
    this.ventasService.getAllDataVentas().subscribe(
      (data: any) => {
        this.ventas = data.resultado;
        console.log(this.ventas);
        this.loading = false;
        this.totalRecords = this.ventas?.length;
      },
      (error) => {
        console.error('Error al obtener los ventas:', error);
      }
    );
  }

  // d***************************************** FUNCION PARA ELIMINAR ***********************************
  eliminar(marca: any) {
    this.ventasService.deleteData(marca).subscribe({
      next: (response: any) => {
        if (response.statusCode === 204) {
          this.toastr.success('¡La venta se ha eliminado correctamente!');
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
    return this.ventas?.length;
  }

  // d***************************************** FUNCION PARA REDIRECCIONAR A AGREGAR PROYECTO ***********************************
  navigateToVenta() {
    this.router.navigate(['/admin/ventas/cargar-venta']);
  }
}
