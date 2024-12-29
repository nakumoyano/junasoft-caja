import { ViewportScroller } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { forkJoin } from 'rxjs';
import { Caja } from 'src/app/models/caja/caja';
import { Producto } from 'src/app/models/producto/producto';
import { CajaService } from 'src/app/services/caja/caja.service';
import { ProductosService } from 'src/app/services/productos/productos.service';

@Component({
  selector: 'app-caja',
  templateUrl: './caja.component.html',
  styleUrls: ['./caja.component.css'],
})
export class CajaComponent implements OnInit {
  movimientosDiaSeleccionado: Caja[] = [];
  productos: Producto[] = [];

  date: Date;
  dateMonth: Date;

  totalFacturas = 0;

  modalVisible = false;
  ventaSeleccionada: any;

  totalRecords: any;
  totalRecordsMovimientos: any;
  loading: boolean = false;
  columnsNames: any[] = [{ columna: 'RAZA' }, { columna: 'ESPECIE' }];

  visible: boolean;

  activeTab: string = ''; // Inicializa con el tab por defecto

  totalFacturadoMes: number = 0;
  totalFacturadoDia: number = 0;

  frmAddEditCaja: FormGroup;
  frmAddEditAperturaCaja: FormGroup;
  frmAddEditCierreCaja: FormGroup;
  frmAddEditDiaSeleccionado: FormGroup;
  frmAddEditRetiro: FormGroup;

  movimientos: any[] = [];

  constructor(
    // private ventasService: VentasService,
    private productoService: ProductosService,
    private toastr: ToastrService,
    // private modosPagosService: ModoPagosService,
    private formBuilder: FormBuilder,
    private viewportScroller: ViewportScroller,
    private cajaService: CajaService
  ) {}

  ngOnInit(): void {
    // this.viewportScroller.scrollToPosition([0, 0]);

    this.loading = false;
    this.getAllDatos();
    this.getMovimientos();
    this.createForm();
    this.activeTab = 'caja';
  }

  createForm() {
    this.frmAddEditCaja = this.formBuilder.group({
      cajaMes: [''],
      cajaDia: [''],
    });

    this.frmAddEditAperturaCaja = this.formBuilder.group({
      monto: ['', Validators.required],
    });

    this.frmAddEditRetiro = this.formBuilder.group({
      montoRetiro: ['', Validators.required],
      motivoRetiro: ['', Validators.required],
    });

    this.frmAddEditCierreCaja = this.formBuilder.group({
      montoCierre: ['', Validators.required],
    });

    this.frmAddEditDiaSeleccionado = this.formBuilder.group({
      diaSeleccionado: [''],
    });
  }

  getAllDatos() {
    this.loading = true;
    // forkJoin([
    //   this.ventasService.getAllDataCaja(),
    //   this.productoService.getAllData(),
    //   this.modosPagosService.getAllModosPagos(),
    // ]).subscribe(
    //   ([dataVentas, dataProductos, dataModosPagos]: any) => {
    //     const ventas = dataVentas.resultado;
    //     const productos = dataProductos.resultado;
    //     const modosPagos = dataModosPagos.resultado;

    //     let totalFacturas = 0; // Inicializar el total de las facturas

    //     ventas.forEach((venta: any) => {
    //       const idsProductos = venta.idsProductos; // Obtener idsProductos
    //       if (idsProductos) {
    //         // Verificar si idsProductos no es null
    //         const idsArray = idsProductos
    //           .split(',')
    //           .map((id: string) => parseInt(id.trim(), 10)); // Dividir la cadena y convertir a números
    //         const nombresProductos: string[] = [];

    //         idsArray.forEach((id: number) => {
    //           const productoPerteneciente = productos.find(
    //             (producto: any) => producto.idProducto === id
    //           );
    //           if (productoPerteneciente)
    //             nombresProductos.push(productoPerteneciente.nombre);
    //         });

    //         // Crear una nueva propiedad para almacenar los nombres de los productos
    //         venta.nombresProductos = nombresProductos;
    //       }

    //       const modoPagoPerteneciente = modosPagos.find(
    //         (modoPago: any) => modoPago.idModoPago === venta.idModoPago
    //       );
    //       if (modoPagoPerteneciente) venta.modoPago = modoPagoPerteneciente;

    //       // Sumar el total de la factura al total general
    //       totalFacturas += venta.totalFactura;
    //     });

    //     // Asignar el total de las facturas calculado al componente
    //     this.totalFacturas = totalFacturas;

    //     this.ventas = ventas;
    //     // console.log(this.ventas);
    //     this.loading = false;
    //     this.totalRecords = this.ventas.length;
    //   },
    //   (error) => {
    //     console.error('Error al obtener los datos:', error);
    //   }
    // );
  }

  // RECARGAR PAGINA AL IR EDITAR PARA QUE NO SE BUGUEE LOS DROPDOWN
  recargar() {
    setTimeout(() => {
      location.reload();
    }, 100);
  }

  // FUNCION PARA ELIMINAR

  // FUNCION PARA OBTENER EL TOTAL DE DATOS

  // FORMATEAR FECHA
  formatFecha(fecha: string): string {
    const date = new Date(fecha);
    const dd = String(date.getDate()).padStart(2, '0');
    const mm = String(date.getMonth() + 1).padStart(2, '0'); // Enero es 0
    const yyyy = date.getFullYear();
    return dd + '/' + mm + '/' + yyyy;
  }

  // FORMATEAR PRECIO
  formatCurrency(value: number): string {
    return value.toLocaleString('es-AR', {
      style: 'currency',
      currency: 'ARS',
    });
  }

  // FUNCION PARA EXPORTAR PDF

  // FUNCION PARA ABRIR MODAL
  showDialog(e: any) {
    this.ventaSeleccionada = e;

    this.visible = true;
  }

  onMonthSelect(): void {
    const dateMonth = this.frmAddEditCaja.get('cajaMes')?.value;
    if (dateMonth) {
      const month = this.formatDateToMonthString(dateMonth);
      // this.ventasService.getDataByMonth(month).subscribe(
      //   (total: any) => {
      //     this.totalFacturadoMes = total;
      //     this.frmAddEditCaja.get('cajaMes')?.reset();
      //   },
      //   (error) => {
      //     console.error('Error al obtener datos por mes:', error);
      //   }
      // );
    }
  }

  formatDateToMonthString(date: Date): string {
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${month}/${year}`;
  }

  onDaySelect(): void {
    const dateDay = this.frmAddEditCaja.get('cajaDia')?.value;
    if (dateDay) {
      const day = this.formatDateToDayString(dateDay);
      // this.ventasService.getDataByDay(day).subscribe(
      //   (total: any) => {
      //     this.totalFacturadoDia = total;
      //     this.frmAddEditCaja.get('cajaDia')?.reset();
      //   },
      //   (error) => {
      //     console.error('Error al obtener datos por día:', error);
      //   }
      // );
    }
  }

  formatDateToDayString(date: Date): string {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  // f*************************************** FUNCION PARA CAMBIAR DE TAB ****************************
  selectTab(tab: string) {
    this.activeTab = tab;
  }

  idUsuario = 0;
  cargarAperturaCaja() {
    const { monto, descripcion } = this.frmAddEditAperturaCaja.value;

    if (this.frmAddEditAperturaCaja.valid) {
      this.loading = true;
      this.cajaService
        .addDataAperturaCaja(monto, this.idUsuario, descripcion)
        .subscribe({
          next: () => {
            this.toastr.success('¡Apertura de caja cargada con éxito!');
            this.loading = false;

            location.reload();
          },
          error: (error: any) => {
            this.toastr.error(
              'Ha ocurrido un error. Espere e intente nuevamente.'
            );
          },
        });
    } else {
      Object.values(this.frmAddEditAperturaCaja.controls).forEach((control) => {
        control.markAsTouched();
      });
      this.toastr.error('Complete los campos obligatorios.');
    }
  }

  cargarRetiroCaja() {
    const { monto, descripcion } = this.frmAddEditRetiro.value;

    if (this.frmAddEditRetiro.valid) {
      this.loading = true;
      this.cajaService
        .addDataRetiroCaja(monto, this.idUsuario, descripcion)
        .subscribe({
          next: () => {
            this.toastr.success('Retiro de caja cargado con éxito!');
            this.loading = false;

            location.reload();
          },
          error: (error: any) => {
            this.toastr.error(
              'Ha ocurrido un error. Espere e intente nuevamente.'
            );
          },
        });
    } else {
      Object.values(this.frmAddEditRetiro.controls).forEach((control) => {
        control.markAsTouched();
      });
      this.toastr.error('Complete los campos obligatorios.');
    }
  }

  cargarCierreCaja() {
    const { monto, descripcion } = this.frmAddEditCierreCaja.value;

    if (this.frmAddEditCierreCaja.valid) {
      this.loading = true;
      this.cajaService
        .addDataCierreCaja(monto, this.idUsuario, descripcion)
        .subscribe({
          next: () => {
            this.toastr.success('Cierre de caja cargado con éxito!');
            this.loading = false;

            location.reload();
          },
          error: (error: any) => {
            this.toastr.error(
              'Ha ocurrido un error. Espere e intente nuevamente.'
            );
          },
        });
    } else {
      Object.values(this.frmAddEditCierreCaja.controls).forEach((control) => {
        control.markAsTouched();
      });
      this.toastr.error('Complete los campos obligatorios.');
    }
  }

  getMovimientos() {
    this.loading = true;

    this.cajaService.getAllDataDelDia().subscribe(
      (data: any) => {
        this.movimientos = data.resultado;
        console.log(this.movimientos);
        this.loading = false;
        this.totalRecordsMovimientos = this.movimientos.length;
      },
      (error) => {
        console.error('Error al obtener los movimientos', error);
      }
    );
  }

  // FUNCION PARA ELIMINAR MOTIVO DE CAJA
  eliminarMovimiento(movimiento: any) {
    this.cajaService.deleteData(movimiento).subscribe({
      next: (response: any) => {
        if (response.statusCode === 204) {
          this.toastr.success(
            '¡El movimiento de caja se ha eliminado correctamente!'
          );
          this.getMovimientos();
        } else {
        }
      },
      error: (error: any) => {
        this.toastr.error(
          'Ha ocurrido un error al intentar eliminar el movimiento de caja.'
        );
      },
    });
  }

  // FUNCION PARA OBTENER EL TOTAL DE DATOS MVOVIMIENTOS
  obtenerTotalResultadosMovimientos(): number {
    return this.movimientos?.length;
  }

  getMovimientoByDiaSeleccionado(): void {
    const dateDay =
      this.frmAddEditDiaSeleccionado.get('diaSeleccionado')?.value;
    if (dateDay) {
      const day = this.formatDateToDayString(dateDay);
      this.cajaService.getDataByDay(day).subscribe(
        (data: any) => {
          console.log('data de dia seleccionado', data);

          this.movimientosDiaSeleccionado = data.resultado;
          this.frmAddEditDiaSeleccionado.get('diaSeleccionado')?.reset();
        },
        (error) => {
          console.error('Error al obtener datos por día:', error);
        }
      );
    }
  }
}
