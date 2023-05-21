import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as bootstrap from 'bootstrap';
import { Aula } from 'src/models/aulas/Aula';
import { UsuarioService } from '../../../services/usuario.service';
import { AulaService } from '../../../services/aula.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mis-aulas',
  templateUrl: './mis-aulas.component.html',
  styleUrls: ['./mis-aulas.component.css']
})
export class MisAulasComponent implements OnInit {
  @ViewChild('myModal', { static: true }) myModal!: ElementRef

  aulas = [1, 2, 3, 4, 5]
  misAulas: Aula[] = []

  myModalVar: any;

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private aulaService: AulaService
  ) {
    this.listarAulas()
  }

  listarAulas() {
    this.aulaService.getMisAulas().subscribe((resp: Aula[]) => {
      this.misAulas = resp;
    })
  }

  formularioNuevoAula: FormGroup = this.fb.group({
    codigoAula: ['', [Validators.required, Validators.minLength(4)],],
    nombreAula: ['', [Validators.required, Validators.minLength(5)]],
  },

  )

  ngOnInit(): void {
    const myModal = this.myModal.nativeElement;
    this.myModalVar = new bootstrap.Modal(myModal);
  }

  openModal() {
    this.myModalVar.show();
  }

  crearAula() {
    const idUsuario = this.usuarioService.getUsuarioSesion()?.id_usuario || 0;
    const codigoAula = this.formularioNuevoAula.get("codigoAula")?.value;
    const nombreAula = this.formularioNuevoAula.get("nombreAula")?.value;
    const nuevoAula = new Aula(codigoAula, idUsuario, nombreAula, false)

    this.aulaService.validarCodigoAula(codigoAula).subscribe((resp: boolean) => {
      if (!resp) { //Si no esta en uso el codigo
        this.aulaService.guardarAula(nuevoAula).subscribe((resp: boolean) => {
          if (resp) {
            Swal.fire({
              icon: "success",
              title: nombreAula,
              text: "Se ha creado correctamente"
            })

            this.formularioNuevoAula.reset()
            this.myModalVar.hide();
            this.listarAulas()
          } else {
            Swal.fire({
              icon: "error",
              title: nombreAula,
              text: "No se pudo crear"
            })
          }
        })
      } else {
        Swal.fire({
          icon: "error",
          title: codigoAula,
          text: "Ya esta en uso este codigo"
        })
      }
    })



  }

}
