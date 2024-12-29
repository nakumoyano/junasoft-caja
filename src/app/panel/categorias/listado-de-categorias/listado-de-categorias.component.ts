import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Categoria } from 'src/app/models/categoria/categoria';
import { CategoriasService } from 'src/app/services/categorias/categorias.service';

@Component({
  selector: 'app-listado-de-categorias',
  templateUrl: './listado-de-categorias.component.html',
  styleUrls: ['./listado-de-categorias.component.css'],
})
export class ListadoDeCategoriasComponent implements OnInit {
  @Input() categorias: Categoria[] = [];

  totalRecords: any;
  loading: boolean = false;

  constructor(
    private categoriasService: CategoriasService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAllDatos();
  }

  // d***************************************** FUNCION PARA OBTENER TODOS LOS DATOS ***********************************
  getAllDatos() {
    this.loading = true;
    this.categoriasService.getAllData().subscribe(
      (data: any) => {
        this.categorias = data.resultado;
        console.log(this.categorias);
        this.loading = false;
        this.totalRecords = this.categorias?.length;
      },
      (error) => {
        console.error('Error al obtener los categorias:', error);
      }
    );
  }

  // d***************************************** FUNCION PARA ELIMINAR ***********************************
  eliminar(marca: any) {
    this.categoriasService.deleteData(marca).subscribe({
      next: (response: any) => {
        if (response.statusCode === 204) {
          this.toastr.success('¡La categoría se ha eliminado correctamente!');
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
    return this.categorias?.length;
  }

  // d***************************************** FUNCION PARA REDIRECCIONAR A AGREGAR PROYECTO ***********************************
  navigateToCategoria() {
    this.router.navigate(['/admin/categorias/agregar-categoria']);
  }
}
