import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from 'src/app/models/usuario/usuario';
import { UsuariosService } from 'src/app/services/usuarios/usuarios.service';

@Component({
  selector: 'app-listado-de-administradores',
  templateUrl: './listado-de-administradores.component.html',
  styleUrls: ['./listado-de-administradores.component.css'],
})
export class ListadoDeAdministradoresComponent implements OnInit {
  @Input() admin: Usuario[] = [];

  totalRecords: any;
  loading: boolean = false;

  constructor(
    private usuariosService: UsuariosService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAllDatos();
  }

  // d***************************************** FUNCION PARA OBTENER TODOS LOS DATOS ***********************************
  getAllDatos() {
    this.loading = true;
    this.usuariosService.getAllData().subscribe(
      (data: any) => {
        this.admin = data.resultado;
        console.log(this.admin);
        this.loading = false;
        this.totalRecords = this.admin?.length;
      },
      (error) => {
        console.error('Error al obtener los admin:', error);
      }
    );
  }

  // d***************************************** FUNCION PARA ELIMINAR ***********************************
  eliminar(marca: any) {
    // this.categoriasService.deleteData(marca).subscribe({
    //   next: (response: any) => {
    //     if (response.statusCode === 204) {
    //       this.toastr.success('¡La categoría se ha eliminado correctamente!');
    //       this.getAllDatos();
    //     } else {
    //     }
    //   },
    //   error: (error: any) => {
    //     this.toastr.error(
    //       'Ha ocurrido un error al intentar eliminar la marca.'
    //     );
    //   },
    // });
  }

  // d***************************************** FUNCION PARA OBTENER EL TOTAL DE DATOS ***********************************
  obtenerTotalResultados(): number {
    return this.admin?.length;
  }

  // d***************************************** FUNCION PARA REDIRECCIONAR A AGREGAR ADMINISTRADOR ***********************************
  navigateToAdmin() {
    this.router.navigate(['/admin/administradores/registrar-administradores']);
  }
}
