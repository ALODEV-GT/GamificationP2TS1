import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ComidoService } from '../services/comido.service';
import { Comido } from '../models/Comido';
import Swal from 'sweetalert2';
import { JuegosService } from '../../services/juegos.service';
import { InstanciaJuego } from 'src/models/juegos/InstanciaJuego';
import { UsuarioService } from '../../../usuarios/services/usuario.service';
import { Usuario } from 'src/models/usuarios/Usuario';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-juego',
  templateUrl: './crear-juego.component.html',
  styleUrls: ['./crear-juego.component.css']
})
export class CrearJuegoComponent implements OnInit {

  ID_TIPO_JUEGO: number = 1; //Comido

  pistas: string[] = []

  errorPista: boolean = false;
  errorGeneral: boolean = false;
  mensajeErrorG: string = "";

  constructor(
    private fb: FormBuilder,
    private comidoService: ComidoService,
    private juegosService: JuegosService,
    private usuarioService: UsuarioService,
    private router: Router
  ) { }

  miFormulario: FormGroup = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(4)],],
    palabra: ['', [Validators.required, Validators.minLength(3)],],
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

    const palabra: string = this.miFormulario.get("palabra")?.value
    if (palabra.includes("\n") || palabra.includes("\t") || palabra.includes(" ")) {
      Swal.fire(
        'Palabra invalida',
        'Quita los espacios',
        'info'
      )
      return;
    }

    if (this.pistas.length == 0) {
      this.errorGeneral = true;
      this.mensajeErrorG = "Debes agregar almenos una pista"
      return
    }

    const nombre = this.miFormulario.get("nombre")?.value
    const usuario: Usuario = this.usuarioService.getUsuarioSesion()!;

    //Guardar instancia juego
    const nuevaInstancia: InstanciaJuego = new InstanciaJuego(0, nombre, usuario.id_usuario, this.ID_TIPO_JUEGO);
    this.juegosService.guardarInstanciaJuego(nuevaInstancia).subscribe((resp: InstanciaJuego) => {
      //Guardar las configuraciones en la base de datos
      const comido = new Comido(0, resp.id_instancia_juego, palabra, this.pistas);
      this.comidoService.saveComido(comido).subscribe((resp: boolean) => {
        if (resp) {
          Swal.fire(
            'Se ha guardado el juego',
            '',
            'success'
          )
          this.router.navigate([`profesor/creados`])
          this.miFormulario.reset();
          this.pistas = [];
        }
      })
    })
  }

  campoEsValido(control: string) {
    return this.miFormulario.controls[control].errors && this.miFormulario.controls[control].touched;
  }

  vistaPrevia() {

  }

}
