import { UsuarioService } from './../../../../usuarios/services/usuario.service';

import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MemoramaServiceService } from '../../services/memorama-service.service';
import { Tema } from '../../models/tema';
import { Usuario } from 'src/models/usuarios/Usuario';

@Component({
  selector: 'app-area-juegos-creados',
  templateUrl: './area-juegos-creados.component.html',
  styleUrls: ['./area-juegos-creados.component.css']
})
export class AreaJuegosCreadosComponent implements OnInit {

  temas:Tema[]=[]
  tituloTema=''
  temaPartida!:Tema
  usuario:Usuario=new Usuario()

  constructor(private router:Router, private memoramaService:MemoramaServiceService,
    private usuariosService:UsuarioService) { }

  ngOnInit(): void {
    this.usuario = this.usuariosService.getUsuarioSesion()!
    this.memoramaService.getTemaJuegosCreados(this.usuario.id_usuario).subscribe(
      (value:Tema[]) => {
        this.temas=value
      }
    )
  }

  clickEditarDificultad(index:number, dificultad:number){
   switch (dificultad) {
    case 1:
        this.temas[index].dificultad='Facil'
        this.memoramaService.setDificultad(this.temas[index]).subscribe(
          (value:Tema) => {
          }
        )
      break;
    case 2:
        this.temas[index].dificultad='Medio'
        this.memoramaService.setDificultad(this.temas[index]).subscribe(
          (value:Tema) => {
          }
        )
      break;
    case 3:
        this.temas[index].dificultad='Dificil'
        this.memoramaService.setDificultad(this.temas[index]).subscribe(
          (value:Tema) => {
          }
        )
     break;
     default:
       break;
   }

  }

  clickGoDemo(index:number){
    this.router.navigate(['profesor/area-creacion/memorama/demo',this.temas[index].id])
  }

}
