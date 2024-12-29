import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Usuario } from 'src/app/models/usuario/usuario';
import { UsuariosService } from 'src/app/services/usuarios/usuarios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-administrador',
  templateUrl: './crear-administrador.component.html',
  styleUrls: ['./crear-administrador.component.css'],
})
export class CrearAdministradorComponent implements OnInit {
  mostrarSkeleton = false;

  usuario: Usuario;

  isEdit = false;
  loading = false;

  visible = true;

  changetype: boolean = true;

  private subscription = new Subscription();

  frmAddEditAdmin: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private usuarioService: UsuariosService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.mostrarSkeleton = false;

    this.createForm();
    this.cargarDatosEnFormulario();
  }

  // f************************************** FUNCION PARA INICIALIZAR FORM ***************************
  createForm() {
    this.frmAddEditAdmin = this.formBuilder.group({
      idUsuario: [''],
      email: ['', Validators.required],
      nombreCompleto: ['', Validators.required],
      clave: ['', Validators.required],
    });
  }

  // f************************************** FUNCION PARA CREAR BARRIO ***************************
  onSave() {
    const { email, clave, nombreCompleto } = this.frmAddEditAdmin.value;

    if (this.frmAddEditAdmin.valid) {
      this.loading = true;
      this.usuarioService.addData(nombreCompleto, email, clave).subscribe({
        next: (res: any) => {
          console.log('respuesta cargar admin', res);
          this.toastr.success('¡Administrador cargado con éxito!');
          this.frmAddEditAdmin.reset();
          this.loading = false;
          setTimeout(() => {
            location.reload();
          }, 200);
        },
        error: (error: any) => {
          this.toastr.error(
            'Ha ocurrido un error. Espere e intente nuevamente.'
          );
          console.log('error', error);
          this.loading = false;
        },
      });
    } else {
      Object.values(this.frmAddEditAdmin.controls).forEach((control) => {
        control.markAsTouched();
      });
      this.toastr.error('Complete los campos obligatorios.');
    }
  }

  // f************************************** FUNCION PARA EDITAR BARRIO ***************************
  // onUpdate() {
  //   if (this.frmAddEditAdmin.valid) {
  //     this.loading = true;
  //     const body = {
  //       idUsuario: this.frmAddEditAdmin.value.idUsuario,
  //       nombreCompleto: this.frmAddEditAdmin.value.nombreCompleto,
  //       email: this.frmAddEditAdmin.value.email,
  //       clave: this.frmAddEditAdmin.value.clave,
  //     };
  //     Swal.fire({
  //       title: '¿Estás seguro que deseas editar este administrador?',
  //       icon: 'warning',
  //       showCancelButton: true,
  //       confirmButtonColor: '#2563EB',
  //       cancelButtonColor: '#4B5563',
  //       confirmButtonText: 'Si, editar',
  //     }).then((result) => {
  //       if (result.isConfirmed) {
  //         this.subscription.add(
  //           this.usuarioService.updateData(body).subscribe({
  //             next: (response: any) => {
  //               console.log('respuesta editar', response);
  //               Swal.fire(
  //                 '¡Editado!',
  //                 '¡El administrador se ha editado correctamente!',
  //                 'success'
  //               );
  //               this.loading = false;
  //               setTimeout(() => {
  //                 this.router
  //                   .navigate([
  //                     '/admin/administradores/listado-de-administradores',
  //                   ])
  //                   .then(() => {
  //                     setTimeout(() => {
  //                       location.reload();
  //                     }, 10);
  //                   });
  //               }, 1000);
  //             },
  //             error: (error: any) => {
  //               Swal.fire(
  //                 'Error!',
  //                 'Ha ocurrido un error al intentar editar el administrador. Por favor, inténtelo de nuevo más tarde.',
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

  // f************************************** FUNCION PARA CARGAR FORMULARIO CON DATOS ***************************
  cargarDatosEnFormulario() {
    this.activatedRoute.params.subscribe((params) => {
      const id = params['id'];
      if (id) {
        this.isEdit = true;
        this.mostrarSkeleton = true;
        this.usuarioService.getDataById(id).subscribe(
          (data: any) => {
            console.log('data patchvalue', data);

            this.frmAddEditAdmin.patchValue(data.resultado);

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

  // f************************************** FUNCION PARA MOSTARR CONTRASEÑA ***************************
  mostrarPassword() {
    this.visible = !this.visible;
    this.changetype = !this.changetype;
  }

  // f************************************** GETS PARA OBTENER EL VALOR DE LOS CAMPOS DEL FORMULARIO ***************************
  get controlEmail(): FormControl {
    return this.frmAddEditAdmin.controls['email'] as FormControl;
  }
  get controlNombre(): FormControl {
    return this.frmAddEditAdmin.controls['nombreCompleto'] as FormControl;
  }
  get controlClave(): FormControl {
    return this.frmAddEditAdmin.controls['clave'] as FormControl;
  }
}
