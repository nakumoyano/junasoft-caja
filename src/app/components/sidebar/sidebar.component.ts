import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  providers: [ConfirmationService, MessageService],
})
export class SidebarComponent implements OnInit {
  currentUrl: string = '';

  user: any;

  constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private router: Router,
    // private authService: AuthService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.obtenerDatos();
  }

  // Mantén un registro del estado de los menús desplegables
  // dropdownStates: any = {};
  dropdownStates: { [key: string]: boolean } = {
    'dropdown-productos': false,
    'dropdown-usuarios': false,
    'dropdown-categorias': false,
    'dropdown-ventas': false,
  };

  toggleDropdown(id: string) {
    this.dropdownStates[id] = !this.dropdownStates[id];
  }

  isDropdownOpen(id: string) {
    // Devuelve el estado del menú desplegable
    return this.dropdownStates[id];
  }

  confirm1() {
    this.confirmationService.confirm({
      message: '¿Está seguro que desea cerrar sesión?',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        // this.authService.logout().subscribe(
        //   (resultado: any) => {
        //     if (resultado && resultado.isExitoso) {
        //       // console.log('resultado logout', resultado);
        //       this.toastr.success('Sesión cerrada exitosamente');
        //       this.router.navigate(['/admin/login']); // O a la página que desees después del logout
        //     } else {
        //       // Manejar la respuesta del servidor si no hay un resultado específico
        //       this.toastr.warning('No se pudo cerrar la sesión');
        //     }
        //   },
        //   (error) => {
        //     // console.error(error);
        //     this.toastr.error(
        //       'Error al cerrar sesión. Por favor, inténtelo de nuevo.'
        //     );
        //   }
        // );
      },
      reject: () => {
        this.messageService.add({
          severity: 'warn',
          summary: 'Cancelado',
          detail: '¡Has cancelado!',
        });
      },
      acceptButtonStyleClass: 'p-button-text custom-yes-button',
      rejectButtonStyleClass: 'p-button-text custom-no-button',
    });
  }

  sidebarOpen: boolean = false;
  toggleSidebar() {
    // Alternar el estado del sidebar
    this.sidebarOpen = !this.sidebarOpen;
  }

  closeSidebar() {
    // Cerrar el sidebar
    this.sidebarOpen = false;
  }

  logout() {
    // this.authService.logout().subscribe(
    //   () => {
    //     this.toastr.success('Sesión cerrada exitosamente');
    //     this.router.navigate(['/admin/login']);
    //   },
    //   (error) => {
    //     this.toastr.error(
    //       'Error al cerrar sesión. Por favor, inténtelo de nuevo.'
    //     );
    //   }
    // );
  }

  // f**************************************** FUNCION PARA OBTENER DATOS USUARIO ********************************
  obtenerDatos() {
    // this.authService.getUserByEmail().subscribe(
    //   (user: any) => {
    //     // console.log('respuesta del usuario por email sidebar', user);
    //     this.user = user;
    //   },
    //   (error) => {}
    // );
  }

  // d*************************************** FUNCINO PARA ACTIVA EL LINK ****************************
  isLinkActive(paths: string[]): boolean {
    return paths.some((path) => this.router.url.startsWith(path));
  }
}
