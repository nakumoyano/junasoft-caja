import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UsuariosService } from 'src/app/services/usuarios/usuarios.service';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.css'],
})
export class ConfiguracionComponent implements OnInit {
  frmEditPerfil: FormGroup;
  frmEditClave: FormGroup;

  changetype: boolean = true;
  visible = true;

  logoFile: File;
  imageFile: File | undefined;
  logoPreview: string | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private authService: AuthService,
    private router: Router,
    private usuariosService: UsuariosService
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.obtenerDatos();
  }

  // FUNCION PARA INICIALIZAR VALORES DEL FORMULARIO
  createForm() {
    this.frmEditPerfil = this.formBuilder.group({
      idPersona: [0],
      nombreCompleto: [''],
      email: [''],
      password: [''],
    });
    this.frmEditClave = this.formBuilder.group({
      emailClave: ['', Validators.required],
      claveNueva: ['', Validators.required],
    });

    this.obtenerDatos();
  }

  mostrarPassword() {
    this.visible = !this.visible;
    this.changetype = !this.changetype;
  }

  onLogoChange(event: any): void {
    this.logoFile = event.target.files[0];
    this.logoPreview = URL.createObjectURL(this.logoFile);
  }

  user: any;
  obtenerDatos() {
    this.usuariosService.getUserByEmail().subscribe(
      (response: any) => {
        // console.log('respuesta del usuario por email sidebar', response);
        if (response && response.resultado) {
          this.rellenarFormulario(response.resultado);
        }
      },
      (error) => {
        console.error('Error al obtener los datos del usuario', error);
      }
    );
  }

  rellenarFormulario(datos: any) {
    this.frmEditPerfil.patchValue({
      idPersona: datos.idUsuario,
      nombreCompleto: datos.nombreCompleto,
      email: datos.email,
    });
    this.frmEditClave.patchValue({
      emailClave: datos.email,
    });
  }

  loading: boolean = false;
  // FUNCION
  onSubmit() {
    if (this.frmEditPerfil.valid) {
      const nombreCompleto = this.frmEditPerfil.get('nombreCompleto')?.value;
      const email = this.frmEditPerfil.get('email')?.value;

      this.usuariosService.updateProfile(email, nombreCompleto).subscribe(
        (response: any) => {
          if (response && response.isExitoso) {
            this.toastr.success('Perfil actualizado exitosamente');
            setTimeout(() => {
              location.reload();
            }, 200);
          } else {
            this.toastr.error('Error al actualizar el perfil');
          }
        },
        (error) => {
          console.error('Error al actualizar el perfil', error);
          this.toastr.error('Error al actualizar el perfil');
        }
      );
    } else {
      this.toastr.error('Por favor, complete todos los campos obligatorios');
    }
  }

  onChangePassword() {
    if (this.frmEditClave.valid) {
      const email = this.frmEditClave.get('emailClave')?.value;
      const claveNueva = this.frmEditClave.get('claveNueva')?.value;

      this.usuariosService.changePassword(email, claveNueva).subscribe(
        (response: any) => {
          if (response && response.isExitoso) {
            this.toastr.success('¡Contraseña actualizada exitosamente!');

            this.authService.logout().subscribe(
              (resultado: any) => {
                if (resultado && resultado.isExitoso) {
                  // console.log('resultado logout', resultado);
                  this.router.navigate(['/admin/login']);
                } else {
                  this.toastr.warning('No se pudo cerrar la sesión');
                }
              },
              (error) => {
                // console.error(error);
                this.toastr.error(
                  'Error al cerrar sesión. Por favor, inténtelo de nuevo.'
                );
              }
            );
          } else {
            this.toastr.error('Error al actualizar la contraseña');
          }
        },
        (error) => {
          console.error('Error al actualizar el contraseña', error);
          this.toastr.error('Error al actualizar el contraseña');
        }
      );
    } else {
      this.toastr.error('Por favor, complete todos los campos obligatorios');
    }
  }

  // GETS PARA OBTENER EL VALOR DE LOS CAMPOS DEL FORMULARIO
  get controlNombre(): FormControl {
    return this.frmEditPerfil.controls['nombreCompleto'] as FormControl;
  }
  get controlContrasenia(): FormControl {
    return this.frmEditClave.controls['claveNueva'] as FormControl;
  }
  get controlEmail(): FormControl {
    return this.frmEditPerfil.controls['email'] as FormControl;
  }
  get controlEmailClave(): FormControl {
    return this.frmEditClave.controls['emailClave'] as FormControl;
  }
  get controlPassword(): FormControl {
    return this.frmEditPerfil.controls['password'] as FormControl;
  }
}
