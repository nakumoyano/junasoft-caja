import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-panel-right',
  templateUrl: './panel-right.component.html',
  styleUrls: ['./panel-right.component.css'],
})
export class PanelRightComponent implements OnInit {
  user: any;

  constructor() // private authService: AuthService
  {}

  ngOnInit(): void {
    this.obtenerDatos();
  }

  // f**************************************** FUNCION PARA OBTENER DATOS USUARIO ********************************
  obtenerDatos() {
    // this.authService.getUserByEmail().subscribe(
    //   (response: any) => {
    //     // console.log('respuesta del usuario panel right', response);
    //     this.user = response;
    //   },
    //   (error) => {
    //     console.error('Error al obtener los datos del usuario', error);
    //   }
    // );
  }
}
