import { Component, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-juego',
  templateUrl: './juego.component.html',
  styleUrls: ['./juego.component.css']
})
export class JuegoComponent {

  @ViewChild('pacman', { static: false }) pacman!: ElementRef;

  posicionY: number = 50;
  posicionX: number = 465;

  moverPacman() {

    if (this.pacman.nativeElement) {
      for (let i = 1; i <= 100; i++) {
        setTimeout(() => {
          this.posicionX += 1;
          this.pacman.nativeElement.style.left = `${this.posicionX}px`;
        }, i * 30);
      }
    }

    let audioInicio = new Audio();
    audioInicio.src = "/assets/comido/sonidos/game_start.wav";
    audioInicio.load();
    audioInicio.play();

  }

}
