import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ComidoService } from '../services/comido.service';
import { Comido } from '../models/Comido';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-juego',
  templateUrl: './crear-juego.component.html',
  styleUrls: ['./crear-juego.component.css']
})
export class CrearJuegoComponent implements OnInit {

  pistas: string[] = []

  errorPista: boolean = false;
  errorGeneral: boolean = false;
  mensajeErrorG: string = "";

  constructor(
    private fb: FormBuilder,
    private comidoService: ComidoService
  ) { }

  miFormulario: FormGroup = this.fb.group({
    codigo: ['', [Validators.required, Validators.minLength(4)],],
    palabra: ['', [Validators.required, Validators.minLength(2)],],
    pista: ['',],
  },

  )

  ngOnInit(): void {
  }

  agregarPista() {
    const pista: string = this.miFormulario.get("pista")?.value
    if (pista.length < 5) {
      this.errorPista = true;
      return
    } else {
      this.pistas.push(this.miFormulario.get("pista")?.value)
      this.miFormulario.get("pista")?.reset()
    }
  }

  eliminarPista(index: number) {
    this.pistas.splice(index, 1)
  }

  crearJuego() {
    if (this.miFormulario.invalid) {
      this.miFormulario.markAllAsTouched();
      return;
    }
    this.errorGeneral = false;

    if (this.pistas.length == 0) {
      this.errorGeneral = true;
      this.mensajeErrorG = "Debes agregar almenos una pista"
      return
    }
    //Guardar las configuraciones en la base de datos
    const palabra = this.miFormulario.get("palabra")?.value
    const codigo = this.miFormulario.get("codigo")?.value
    const comido = new Comido(palabra, codigo, this.pistas);

    this.comidoService.saveComido(comido).subscribe((resp: boolean) => {
      if (resp) {
        Swal.fire(
          'Se ha guardado el juego',
          '',
          'success'
        )
      }
    })
  }

  campoEsValido(control: string) {
    return this.miFormulario.controls[control].errors && this.miFormulario.controls[control].touched;
  }

  vistaPrevia() {

  }

}
