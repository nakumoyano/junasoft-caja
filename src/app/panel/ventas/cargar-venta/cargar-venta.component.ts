import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProductosService } from 'src/app/services/productos/productos.service';
import { TiposPagosService } from 'src/app/services/tipos-pagos/tipos-pagos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cargar-venta',
  templateUrl: './cargar-venta.component.html',
  styleUrls: ['./cargar-venta.component.css'],
})
export class CargarVentaComponent implements OnInit {
  @Input() elemento: any;
  @Output() eliminado = new EventEmitter();
  @Input() modoPagos: any[];
  @Input() productos: any[];

  frmAddEditVenta: FormGroup;

  productosAgregados: any[] = [];

  isModoPagoSelected: boolean = false;
  loading = false;

  // OPCIONES SELECCIONADAS DE DROPDOWNS
  selectedProducto: string;
  selectedModoPago: any;

  isEdit = false;

  selectedDate: string;

  date: Date;

  constructor(
    private productoService: ProductosService,
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private modoPagoService: TiposPagosService // private ventaService: VentasService
  ) {}

  ngOnInit(): void {
    this.createForm();

    this.cargarCmbModoPagos();
    this.cargarCmbProcuctos();

    this.frmAddEditVenta.get('idTipoPago')?.valueChanges.subscribe((value) => {
      this.isModoPagoSelected = !!value;
    });
  }

  // FUNCION PARA INICLIZAR CAMPOS FORMULARIO
  createForm() {
    const hoy = new Date();
    const anio = hoy.getFullYear();
    const mes = String(hoy.getMonth() + 1).padStart(2, '0');
    const dia = String(hoy.getDate()).padStart(2, '0');

    const fechaActual = `${anio}-${mes}-${dia}`;

    this.frmAddEditVenta = this.formBuilder.group({
      idFactura: [0],
      idProducto: ['', Validators.required],
      idTipoPago: [''],
      cantidad: [''],
      // cantidad: ['', Validators.required],
      // productoString: [''],
      // montotring: [''],
      fechaHora: [fechaActual],
    });
  }

  // FUNCION PARA CARGAR EL COMBO DE PRODUCTOS
  cargarCmbProcuctos() {
    this.productoService.getAllData().subscribe(
      (data: any) => {
        // console.log('data de producto', data.resultado);
        const productos = data.resultado;

        this.productos = productos;
      },
      (error) => {
        console.error('Error al obtener los productos', error);
      }
    );
  }

  // FUNCION PARA CARGAR EL COMBO DE MODOS DE PAGOS
  cargarCmbModoPagos() {
    this.modoPagoService.getAllData().subscribe(
      (data: any) => {
        console.log('data', data);
        const modoPagos = data.resultado;

        this.modoPagos = modoPagos;
      },
      (error) => {
        console.error('Error al obtener los modoPagos', error);
      }
    );
  }

  // FUNCION PARA AGREGAR DATOS AL CARRITO
  agregarAlCarrito() {
    if (this.frmAddEditVenta.valid) {
      const nuevoProducto = {
        producto: this.selectedProducto,
        cantidad: this.frmAddEditVenta.get('cantidad')?.value,
        concepto: this.frmAddEditVenta.get('concepto')?.value,
      };
      this.productosAgregados.push(nuevoProducto);
      this.frmAddEditVenta.reset();
    } else {
      Object.values(this.frmAddEditVenta.controls).forEach((control) => {
        control.markAsTouched();
      });
      this.toastr.error('Complete los campos obligatorios.');
    }
  }

  // OBTENER TOTAL DE LA VENTA
  getTotal(): number {
    return this.productosAgregados.reduce(
      (acc, producto) =>
        acc + producto.cantidad * producto.producto.precioUnitario,
      0
    );
  }
  totalConInteres: number | null = null;
  getTotalConInteres5(): number {
    return this.getTotal() * 1.05; // Añadir 5% de interés
  }
  getTotalConInteres10(): number {
    return this.getTotal() * 1.1; // Añadir 10% de interés
  }
  onModoPagoChange(): void {
    if (this.frmAddEditVenta.get('idTipoPago')?.value === 2) {
      this.totalConInteres = this.getTotal();
    } else if (this.frmAddEditVenta.get('idTipoPago')?.value === 3) {
      this.totalConInteres = this.getTotal();
    } else {
      this.totalConInteres = null;
    }
  }

  // FUNCION PARA ELIMIANR DATOS DE LAS FILAS
  eliminarProducto(index: number) {
    Swal.fire({
      title: '¿Estás seguro que deseas eliminar este dato?',
      text: '¡Esta acción no se puede revertir!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#DC2626',
      cancelButtonColor: '#4B5563',
      confirmButtonText: 'Si, eliminar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.toastr.success('¡La venta se elimino del carrito con éxito!');
        this.productosAgregados.splice(index, 1);
      }
    });
  }

  navigate() {
    this.router.navigate(['/admin/ventas/detalle-de-venta']);
  }

  // Método para preparar los datos de la venta
  prepareVentaData() {
    return {
      idFactura: 0,
      fechaHora: this.frmAddEditVenta.get('fechaHora')?.value || '',
      totalFactura: this.getTotal(),
      idsProductos: this.productosAgregados.map((p) =>
        p.producto.idProducto.toString()
      ),
      cantidades: this.productosAgregados.map((p) => p.cantidad.toString()),
      idPersona: null,
      idTipoPago: this.frmAddEditVenta.get('idTipoPago')?.value,
    };
  }

  // Método para registrar la venta
  registrarVenta() {
    this.loading = true;
    const ventaData = this.prepareVentaData();

    // this.ventaService
    //   .addData(
    //     ventaData.idFactura,
    //     ventaData.fechaHora,
    //     ventaData.totalFactura,
    //     ventaData.idsProductos,
    //     ventaData.cantidades,
    //     ventaData.idPersona,
    //     ventaData.idTipoPago
    //   )
    //   .subscribe(
    //     (response) => {
    //       this.toastr.success('¡Venta cargada con éxito!');
    //       this.frmAddEditVenta.reset();
    //       this.productosAgregados = [];
    //       location.reload();

    //       this.loading = false;

    //       // console.log('Venta registrada exitosamente', response);
    //     },
    //     (error) => {
    //       // Maneja el error
    //       console.error('Error al registrar la venta', error);
    //     }
    //   );
  }

  // GETS PARA OBTENER EL VALOR DE LOS CAMPOS DEL FORMULARIO
  get controlProductos(): FormControl {
    return this.frmAddEditVenta.controls['idProducto'] as FormControl;
  }
  get controlCantidad(): FormControl {
    return this.frmAddEditVenta.controls['cantidad'] as FormControl;
  }
  get controlModoPago(): FormControl {
    return this.frmAddEditVenta.controls['idTipoPago'] as FormControl;
  }
}
