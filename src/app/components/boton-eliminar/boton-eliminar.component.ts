import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-boton-eliminar',
  templateUrl: './boton-eliminar.component.html',
  styleUrls: ['./boton-eliminar.component.css'],
})
export class BotonEliminarComponent implements OnInit {
  @Input() elemento: any;
  @Output() eliminado = new EventEmitter();

  private subscription = new Subscription();

  constructor(private toastr: ToastrService) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  confirmarEliminacion() {
    Swal.fire({
      title: '¿Estás seguro que deseas eliminar este dato?',
      text: '¡Esta acción no se puede revertir!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#DC2626',
      cancelButtonColor: '#4B5563',
      confirmButtonText: 'Si, eliminar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.eliminado.emit(this.elemento);
      }
    });
  }
}
