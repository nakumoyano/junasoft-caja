import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Location } from '@angular/common';

@Component({
  selector: 'app-boton-cancelar',
  templateUrl: './boton-cancelar.component.html',
  styleUrls: ['./boton-cancelar.component.css'],
})
export class BotonCancelarComponent implements OnInit {
  constructor(private location: Location) {}

  ngOnInit(): void {}

  cancelar(): void {
    Swal.fire({
      title: '¿Seguro que desea cancelar? Los cambios no se guardarán.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#2563EB',
      cancelButtonColor: '#4B5563',
      confirmButtonText: 'Si, cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.location.back();
      }
    });
  }
}
