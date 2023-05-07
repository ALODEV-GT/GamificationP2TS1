import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
    console.log("guardado");

  }

  campoEsValido(control: string) {
    return this.miFormulario.controls[control].errors && this.miFormulario.controls[control].touched;
  }

  vistaPrevia() {

  }

}
