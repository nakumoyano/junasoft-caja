import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { TipoMovimiento } from 'src/app/models/tipo-movimiento/tipo-movimiento';
import { CajaService } from 'src/app/services/caja/caja.service';
import { TiposMovimientosService } from 'src/app/services/tipos-movimientos/tipos-movimientos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-apertura-caja',
  templateUrl: './editar-apertura-caja.component.html',
  styleUrls: ['./editar-apertura-caja.component.css'],
})
export class EditarAperturaCajaComponent implements OnInit {
  @Input() tipoMovimientos: TipoMovimiento[];

  selectedTipoOperacion: string;

  frmAddEditMovCaja: FormGroup;

  mostrarSkeleton = false;
  isEdit = false;
  loading = false;

  private subscription = new Subscription();

  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private cajaService: CajaService,
    private tipoMovimientosService: TiposMovimientosService
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.cargarDatosEnFormulario();
    this.cargarCmbTipoMovimiento();
  }

  createForm() {
    this.frmAddEditMovCaja = this.formBuilder.group({
      idMovimiento: [''],
      monto: ['', Validators.required],
      motivo: [''],
      idTipoOperacion: ['', Validators.required],
      fechaMovimiento: [''],
    });
  }
  // FUNCNION PARA EDITAR FORMULARIO
  // editarMovimientoCaja() {
  //   if (this.frmAddEditMovCaja.valid) {
  //     this.loading = true;

  //     const body = {
  //       idMovimiento: this.frmAddEditMovCaja.value.idMovimiento,
  //       idTipoOperacion: this.frmAddEditMovCaja.value.idTipoOperacion,
  //       motivo: this.frmAddEditMovCaja.value.motivo,
  //       monto: this.frmAddEditMovCaja.value.monto,
  //       fechaMovimiento: this.frmAddEditMovCaja.value.fechaMovimiento,
  //     };

  //     Swal.fire({
  //       title: '¿Estás seguro que deseas editar este movimiento de caja?',
  //       icon: 'warning',
  //       showCancelButton: true,
  //       confirmButtonColor: '#16A34A',
  //       cancelButtonColor: '#4B5563',
  //       confirmButtonText: 'Si, editar',
  //     }).then((result) => {
  //       if (result.isConfirmed) {
  //         this.subscription.add(
  //           this.cajaService.updateDataCaja(body).subscribe({
  //             next: (response: any) => {
  //               Swal.fire(
  //                 '¡Editado!',
  //                 'El movimiento se ha editado correctamente.',
  //                 'success'
  //               );
  //               this.loading = false;

  //               setTimeout(() => {
  //                 this.router.navigate(['/admin/caja']).then(() => {
  //                   setTimeout(() => {
  //                     location.reload();
  //                   }, 10);
  //                 });
  //               }, 1000);
  //             },
  //             error: (error: any) => {
  //               Swal.fire(
  //                 'Error!',
  //                 'Ha ocurrido un error al intentar editar el movimiento de caja. Por favor, inténtelo de nuevo más tarde.',
  //                 'error'
  //               );
  //             },
  //           })
  //         );
  //       }
  //     });
  //   } else {
  //     this.toastr.error(
  //       'Ocurrio un error, revise los campos e intente nuevamente'
  //     );
  //   }
  // }

  // FUNCINO PARA CARGAR LOS DATOS EN EL FORMULARIO CUANDO SE QUIERE EDITAR
  cargarDatosEnFormulario() {
    this.activatedRoute.params.subscribe((params) => {
      const id = params['id'];
      if (id) {
        this.isEdit = true;
        this.mostrarSkeleton = true;
        this.cajaService.getDataById(id).subscribe(
          (data: any) => {
            console.log(data);

            const fecha = new Date(data.resultado.fechaMovimiento);
            const fechaFormateada = fecha.toISOString().split('T')[0];

            const formData = {
              ...data.resultado,
              fechaMovimiento: fechaFormateada,
            };

            this.frmAddEditMovCaja.patchValue(formData);
            this.mostrarSkeleton = false;
            this.selectedTipoOperacion = data.resultado.idTipoOperacion;
          },
          (error) => {
            console.error(error);
          }
        );
      }
    });
  }

  // FUNCION PARA CARGAR EL COMBO DE PROPIETARIOS
  cargarCmbTipoMovimiento() {
    this.tipoMovimientosService.getAllData().subscribe(
      (data: any) => {
        const tipoMovimientos = data.resultado;

        this.tipoMovimientos = tipoMovimientos;
        // // Filtrar el tipo de operación con idTipoOperacion diferente de 4
        // this.tipoMovimientos = tipoMovimientos.filter(
        //   (tipoMovimiento: any) => tipoMovimiento.idTipoMovimiento !== 4
        // );
      },
      (error) => {
        console.error('Error al obtener las tipoMovimientos', error);
      }
    );
  }

  // GETS PARA OBTENER EL VALOR DE LOS CAMPOS DEL FORMULARIO
  get controlMonto(): FormControl {
    return this.frmAddEditMovCaja.controls['monto'] as FormControl;
  }
  get controlMotivo(): FormControl {
    return this.frmAddEditMovCaja.controls['motivo'] as FormControl;
  }
  get controlGaleno(): FormControl {
    return this.frmAddEditMovCaja.controls['galenos'] as FormControl;
  }
  get controlYipoOperacion(): FormControl {
    return this.frmAddEditMovCaja.controls['idTipoOperacion'] as FormControl;
  }
  get controlFecha(): FormControl {
    return this.frmAddEditMovCaja.controls['fechaMovimiento'] as FormControl;
  }
}
