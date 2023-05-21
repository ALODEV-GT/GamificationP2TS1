
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

  constructor(private router:Router, private memoramaService:MemoramaServiceService) { }

  ngOnInit(): void {
    //this.usurio = usurio del servicio
    this.memoramaService.getTemaJuegosCreados(this.usuario.id_usuario).subscribe(
      (value:Tema[]) => {
        this.temas=value
      }
    )
  }

  clickSettearTemaPartida(index:number){
   this.temaPartida = this.temas[index]
   this.tituloTema = this.temaPartida.titulo

  }

  clickGoDemo(index:number){
    //servicioSesion.tema = this.temas[index]    enviar el tema mediante un servicio
    //this.router.navigate(['profesor/demo-juego'])
  }

}
