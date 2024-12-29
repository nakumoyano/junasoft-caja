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
import { CategoriasService } from 'src/app/services/categorias/categorias.service';
import { ProductosService } from 'src/app/services/productos/productos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agregar-producto',
  templateUrl: './agregar-producto.component.html',
  styleUrls: ['./agregar-producto.component.css'],
})
export class AgregarProductoComponent implements OnInit {
  @Input() categorias: Categoria[];

  mostrarSkeleton = false;

  producto: any;

  isEdit = false;
  loading = false;

  isEmailDisabled = false;

  // OPCIONES SELECCIONADAS DE DROPDOWNS
  selectedCategoria: string;

  private subscription = new Subscription();

  deshabilitado: any;

  frmAddEditProducto: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private categoriasService: CategoriasService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private productosService: ProductosService
  ) {}

  ngOnInit(): void {
    this.mostrarSkeleton = false;

    this.cargarCmbCategoria();

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
    });
  }

  // f************************************** FUNCION PARA CREAR BARRIO ***************************
  onSave() {
    const { nombre, sku, precioUnitario, idCategoria } =
      this.frmAddEditProducto.value;

    if (this.frmAddEditProducto.valid) {
      this.loading = true;
      this.productosService
        .addData(0, nombre, sku, precioUnitario, idCategoria)
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

      const formData = new FormData(); // Usamos FormData para enviar los archivos

      // Agregar los valores del formulario al FormData
      const formValues = this.frmAddEditProducto.value;

      formData.append('idProducto', formValues.idProducto);
      formData.append('nombre', formValues.nombre);
      formData.append('sku', formValues.sku);
      formData.append('precioUnitario', formValues.precioUnitario);
      formData.append('idCategoria', formValues.idCategoria);

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
            this.productosService
              .updateData(
                formValues.idProducto,
                formValues.nombre,
                formValues.sku,
                formValues.precioUnitario,
                formValues.idCategoria
              )
              .subscribe({
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
  // f************************************** GETS PARA OBTENER EL VALOR DE LOS CAMPOS DEL FORMULARIO ***************************
  get controlCategoria(): FormControl {
    return this.frmAddEditProducto.controls['idCategoria'] as FormControl;
  }
  get controlNombre(): FormControl {
    return this.frmAddEditProducto.controls['nombre'] as FormControl;
  }
}
