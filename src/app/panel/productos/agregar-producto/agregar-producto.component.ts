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
import { Categoria } from 'src/app/models/categoria/categoria';
import { Producto } from 'src/app/models/producto/producto';
import { UnidadMedida } from 'src/app/models/unidad-medida/unidad-medida';
import { CategoriasService } from 'src/app/services/categorias/categorias.service';
import { ProductosService } from 'src/app/services/productos/productos.service';
import { UnidadMedidasService } from 'src/app/services/unidad-medidas/unidad-medidas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agregar-producto',
  templateUrl: './agregar-producto.component.html',
  styleUrls: ['./agregar-producto.component.css'],
})
export class AgregarProductoComponent implements OnInit {
  @Input() categorias: Categoria[];
  @Input() unidadMedidas: UnidadMedida[];

  mostrarSkeleton = false;

  producto: any;

  isEdit = false;
  loading = false;

  isEmailDisabled = false;

  // OPCIONES SELECCIONADAS DE DROPDOWNS
  selectedCategoria: string;
  selectedUnidadMedida: string;

  private subscription = new Subscription();

  deshabilitado: any;

  frmAddEditProducto: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private categoriasService: CategoriasService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private productosService: ProductosService,
    private unidadMedidaService: UnidadMedidasService
  ) {}

  ngOnInit(): void {
    this.mostrarSkeleton = false;

    this.cargarCmbCategoria();
    this.cargarCmbUnidadMedida();

    this.createForm();

    this.cargarDatosEnFormulario();
  }

  // f************************************** FUNCION PARA INICIALIZAR FORM ***************************
  createForm() {
    this.frmAddEditProducto = this.formBuilder.group({
      idProducto: [0],
      nombre: ['', Validators.required],
      sku: [''],
      precioUnitario: [''],
      idCategoria: ['', Validators.required],
      idUnidadMedida: ['', Validators.required],
    });
  }

  // f************************************** FUNCION PARA CREAR BARRIO ***************************
  onSave() {
    const { nombre, sku, precioUnitario, idCategoria, idUnidadMedida } =
      this.frmAddEditProducto.value;

    if (this.frmAddEditProducto.valid) {
      this.loading = true;
      this.productosService
        .addData(0, nombre, sku, precioUnitario, idCategoria, idUnidadMedida)
        .subscribe({
          next: (res: any) => {
            console.log('respuesta cargar producto', res);
            this.toastr.success('¡Producto cargado con éxito!');
            this.frmAddEditProducto.reset();
            this.loading = false;
            setTimeout(() => {
              location.reload();
            }, 200);
          },
          error: (error: any) => {
            this.toastr.error(
              'Ha ocurrido un error. Espere e intente nuevamente.'
            );
            this.loading = false;
          },
        });
    } else {
      Object.values(this.frmAddEditProducto.controls).forEach((control) => {
        control.markAsTouched();
      });
      this.toastr.error('Complete los campos obligatorios.');
    }
  }

  // f************************************** FUNCION PARA EDITAR BARRIO ***************************
  onUpdate() {
    if (this.frmAddEditProducto.valid) {
      this.loading = true;

      const body = {
        idProducto: this.frmAddEditProducto.value.idProducto,
        nombre: this.frmAddEditProducto.value.nombre,
        sku: this.frmAddEditProducto.value.sku || '',
        precioUnitario: this.frmAddEditProducto.value.precioUnitario,
        idCategoria: this.frmAddEditProducto.value.idCategoria,
        idUnidadMedida: this.frmAddEditProducto.value.idUnidadMedida,
      };

      console.log('Datos enviados:', body);

      Swal.fire({
        title: '¿Estás seguro que deseas editar este producto?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#2563EB',
        cancelButtonColor: '#4B5563',
        confirmButtonText: 'Si, editar',
      }).then((result) => {
        if (result.isConfirmed) {
          this.subscription.add(
            this.productosService.updateData(body).subscribe({
              next: (response: any) => {
                console.log('respuesta editar', response);
                Swal.fire(
                  '¡Editado!',
                  '¡El producto se ha editado correctamente!',
                  'success'
                );
                this.loading = false;
                setTimeout(() => {
                  this.router
                    .navigate(['/admin/productos/listado-de-productos'])
                    .then(() => {
                      setTimeout(() => {
                        location.reload();
                      }, 10);
                    });
                }, 1000);
              },
              error: (error: any) => {
                Swal.fire(
                  'Error!',
                  'Ha ocurrido un error al intentar editar el producto. Por favor, inténtelo de nuevo más tarde.',
                  'error'
                );
                console.log('error editar pdocuto', error);
              },
            })
          );
        }
      });
    } else {
      this.toastr.error(
        'Ocurrio un error, revise los campos e intente nuevamente'
      );
    }
  }

  // f************************************** FUNCION PARA CARGAR FORMULARIO CON DATOS ***************************
  cargarDatosEnFormulario() {
    this.activatedRoute.params.subscribe((params) => {
      const id = params['id'];
      if (id) {
        this.isEdit = true;
        this.mostrarSkeleton = true;
        this.productosService.getDataById(id).subscribe(
          (data: any) => {
            console.log('data patch value', data);
            this.frmAddEditProducto.patchValue(data.resultado);

            this.selectedCategoria = data.resultado.idCategoria;
            this.selectedUnidadMedida = data.resultado.idUnidadMedida;

            this.mostrarSkeleton = false;
          },
          (error) => {
            console.error(error);
            this.mostrarSkeleton = false;
          }
        );
      }
    });
  }

  // f************************************** FUNCION PARA CREAR BARRIO ***************************
  // CATEGORIAS
  cargarCmbCategoria() {
    this.categoriasService.getAllData().subscribe(
      (data: any) => {
        // console.log(data);
        const categorias = data.resultado;
        this.categorias = categorias;
      },
      (error) => {
        console.error('Error al obtener los categorias:', error);
      }
    );
  }

  // UNIDAD MEDIDA
  cargarCmbUnidadMedida() {
    this.unidadMedidaService.getAllData().subscribe(
      (data: any) => {
        // console.log(data);
        const unidadMedidas = data.resultado;
        this.unidadMedidas = unidadMedidas;
      },
      (error) => {
        console.error('Error al obtener los unidadMedidas:', error);
      }
    );
  }
  // f************************************** GETS PARA OBTENER EL VALOR DE LOS CAMPOS DEL FORMULARIO ***************************
  get controlCategoria(): FormControl {
    return this.frmAddEditProducto.controls['idCategoria'] as FormControl;
  }
  get controlUnidadMedida(): FormControl {
    return this.frmAddEditProducto.controls['idUnidadMedida'] as FormControl;
  }
  get controlNombre(): FormControl {
    return this.frmAddEditProducto.controls['nombre'] as FormControl;
  }
}
