import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UsuariosService } from 'src/app/services/usuarios/usuarios.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  formulario: FormGroup;
  user: any;
  visible = true;
  changetype: boolean = true;

  loading = false;

  private subscription = new Subscription();

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      email: ['', Validators.required],
      clave: ['', Validators.required],
    });
  }

  mostrarPassword() {
    this.visible = !this.visible;
    this.changetype = !this.changetype;
  }

  login() {
    if (this.formulario.valid) {
      this.loading = true;
      const email = this.formulario.get('email')?.value;
      const clave = this.formulario.get('clave')?.value;

      this.authService.login(email, clave).subscribe(
        (response: any) => {
          if (response && response.isExitoso) {
            // console.log('Resultado de login:', response);

            // Accede al email correctamente desde response.resultado.email
            if (response.resultado && response.resultado.email) {
              localStorage.setItem('email', response.resultado.email);
              // console.log('Email almacenado:', localStorage.getItem('email'));
            } else {
              console.error('Email no encontrado en el resultado');
            }

            this.toastr.success('¡Bienvenido!');
            this.router.navigate(['/admin/dashboard']);
          } else {
            this.toastr.error(
              'Credenciales incorrectas. Por favor, revise los datos ingresados e intente nuevamente.'
            );
          }
          this.loading = false;
        },
        (error: any) => {
          console.error(error);
          if (error.status === 401) {
            this.toastr.error(
              'La contraseña es incorrecta. Corrobore el dato.'
            );
          } else {
            this.toastr.error(
              'Error al iniciar sesión. Por favor, revise los datos ingresados e intente nuevamente.'
            );
          }
          this.loading = false;
        }
      );
    } else {
      Object.values(this.formulario.controls).forEach((control) => {
        control.markAsTouched();
      });
      this.toastr.error('Complete los campos obligatorios.');
    }
  }

  get controlEmail(): FormControl {
    return this.formulario.controls['email'] as FormControl;
  }

  get controlPassword(): FormControl {
    return this.formulario.controls['clave'] as FormControl;
  }
}
