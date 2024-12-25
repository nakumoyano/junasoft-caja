import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  @Input() vehiculos: any[];
  @Input() clientes: any[];
  @Input() usuarios: any[];

  ingresos: number = 0;

  loading = false;

  mostrarIngresos = false;

  constructor(
    private toastr: ToastrService,
    // private userService: UsuariosService,
    // private clientesService: ClientesService,
    // private vehiculosService: VehiculosService,
    // private ventasService: VentasService,
    private router: Router // private pagosService: PagosService
  ) {}

  ngOnInit(): void {
    this.getAllData();
    this.getAllDataVehiculos();
    this.getAllDataUsuarioNoAlDia();
    this.getAllDataFacturacionMes();
  }

  // S************************* FUNCION PARA MOSTRAR CLIENTES*********************
  getAllData() {
    this.loading = true;
    // this.clientesService.getAllData().subscribe(
    //   (data: any) => {
    //     // console.log('datos de clientes', data);
    //     const clientes = data.resultado;

    //     this.clientes = clientes;
    //     // console.log(this.ventas);
    //     this.loading = false;
    //   },
    //   (error) => {
    //     console.error('Error al obtener las clientes', error);
    //   }
    // );
  }

  // S************************* FUNCION PARA MOSTRAR VEHICULOS *********************
  getAllDataVehiculos() {
    this.loading = true;
    // this.ventasService.getAllData().subscribe(
    //   (data: any) => {
    //     // console.log('datos de clientes', data);
    //     const vehiculos = data.resultado;

    //     this.vehiculos = vehiculos;
    //     // console.log(this.ventas);
    //     this.loading = false;
    //   },
    //   (error) => {
    //     console.error('Error al obtener las vehiculos', error);
    //   }
    // );
  }

  // S************************* FUNCION PARA MOSTRAR USUARIOS QUE NO ESTAN AL DIA EN PAGOS *********************
  getAllDataUsuarioNoAlDia() {
    this.loading = true;
    // this.userService.getAllDataNoAlDia().subscribe(
    //   (data: any) => {
    //     // console.log('datos de usuario no al dia', data);
    //     const usuarios = data.resultado;

    //     this.usuarios = usuarios;
    //     // console.log(this.ventas);
    //     this.loading = false;
    //   },
    //   (error) => {
    //     console.error('Error al obtener las usuarios', error);
    //   }
    // );
  }

  // S************************* FUNCION PARA MOSTRAR TOTAL DE INGRESOS DEL MES *********************
  getAllDataFacturacionMes() {
    this.loading = true;
    // this.pagosService.getAllFacturacionDelMes().subscribe(
    //   (data: any) => {
    //     // console.log('datos de ingresos', data);
    //     const ingresos = data;

    //     this.ingresos = ingresos; // Convierte ingresos a número si no lo es ya

    //     // console.log(this.ventas);
    //     this.loading = false;
    //   },
    //   (error) => {
    //     console.error('Error al obtener las ingresos', error);
    //   }
    // );
  }

  // S************************* FUNCION PARA OBTENER TOTAL DE RESULETADOS *********************
  // CLIENTES
  obtenerTotalResultados(): number {
    return this.clientes?.length;
  }

  // VEWHICULOS
  obtenerTotalResultadosVehiculos(): number {
    return this.vehiculos?.length;
  }

  // S************************* FUNCION PARA HACER ENVIO POR WPP *********************
  completarURLWhatsapp(urlBase: any, telefono: any) {
    if (urlBase && telefono) {
      const urlCompleta = urlBase.replace('phone=549', `phone=549${telefono}`);
      window.open(urlCompleta, '_blank');
    } else {
      this.toastr.error(
        'La URL base y el teléfono son requeridos para enviar un mensaje de WhatsApp.'
      );
    }
  }

  // S************************* FUNCION PARA MOSTRAR INGRESOS *********************
  toggleIngresos() {
    this.mostrarIngresos = !this.mostrarIngresos;
  }
}
