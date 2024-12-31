import { Component, Input, OnInit } from '@angular/core';
import { Caja } from 'src/app/models/caja/caja';
import { CajaService } from 'src/app/services/caja/caja.service';

@Component({
  selector: 'app-panel-right',
  templateUrl: './panel-right.component.html',
  styleUrls: ['./panel-right.component.css'],
})
export class PanelRightComponent implements OnInit {
  estadoCaja: any[] = [];
  user: any;

  constructor(
    private cajaService: CajaService // private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.obtenerEstadoCaja();
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

  // f**************************************** FUNCION PARA OBTENER ESTADO CAJA ********************************

  saldoCaja: number = 0; // Para guardar el saldo

  obtenerEstadoCaja() {
    this.cajaService.getEstadoCaja().subscribe(
      (data: any) => {
        console.log('Estado de la caja:', data);
        this.estadoCaja = data.estado; // Asignar el estado
        this.saldoCaja = data.saldo; // Asignar el saldo
      },
      (error) => {
        console.error('Error al obtener el estado de la caja:', error);
        // this.estadoCaja = 'Error al obtener el estado'; // Manejo del error
        this.saldoCaja = 0;
      }
    );
  }
}
