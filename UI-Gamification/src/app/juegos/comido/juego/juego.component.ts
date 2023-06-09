import { Component, ViewChild, ElementRef, Input, OnInit } from '@angular/core';
import { Comido } from '../models/Comido';
import { ComidoService } from '../services/comido.service';
import { Router } from '@angular/router';
import { Punteo } from '../models/Punteo';
import { UsuarioService } from '../../../usuarios/services/usuario.service';
import { Usuario } from 'src/models/usuarios/Usuario';

interface Letter {
  id: string,
  value: string,
  correctValue: string
}

interface Coin {
  id: number,
  x: number,
  y: number
  visible: boolean
}

@Component({
  selector: 'app-juego',
  templateUrl: './juego.component.html',
  styleUrls: ['./juego.component.css']
})
export class JuegoComponent implements OnInit {
  @Input() esDemo!: boolean;
  @Input() id_instancia_juego!: number
  @Input() codigoAula!: string

  @ViewChild('pacman', { static: false }) pacman!: ElementRef;
  @ViewChild('ghost', { static: false }) ghost!: ElementRef;
  @ViewChild('fruit', { static: false }) fruit!: ElementRef;
  @ViewChild('inputLett') inputLett!: any;
  @ViewChild('btnIng') btnIng!: any;

  posicionXPacman: number = 465;
  posicionXGhost: number = 50;
  posicionXFruit: number = 894;

  widthPacman: number = 71;
  widthCoin: number = 17;
  widthFruit: number = 56;
  widthGhost: number = 70;

  //Game config
  clues: string[] = []

  //DEMO CONFIGS


  game: Comido = new Comido(0, 0, "code", this.clues);

  //Letters
  letters: Letter[] = []

  //Coins
  coins: Coin[] = []
  coinDifferenceX: number = 0

  //Fruit
  eatedFruit = false;

  //Pacman
  isPacmanDead = false;

  //Points
  BASE_POINT: number = 20;
  counter: number = 0;
  points: number = 0;
  multiplicador: number = 1;
  puntosPerdidos: number = 0;
  numErrores: number = 0;

  messaje: string = "";
  errorMessaje: string = "";

  //comparition
  inputLetter: string = "";

  constructor(
    private comidoService: ComidoService,
    private router: Router,
    private usuarioService: UsuarioService
  ) {

  }
  ngOnInit(): void {
    if (this.esDemo) {
      this.game.palabra = "game-learn"
      this.game.pistas = ["Nombre de la pagina"]
      this.createDivLetters();
      this.createDivCoins();
      this.soundStartGame();
    } else {
      this.comidoService.getConfigsGame(Number(this.id_instancia_juego)).subscribe((resp: Comido) => {
        this.game = resp;
        this.createDivLetters();
        this.createDivCoins();
        this.soundStartGame();
      })
    }
  }

  createDivLetters() {
    const word = this.game.palabra;
    for (let i = 0; i < word.length; i++) {
      let l: Letter = { id: i.toString(), value: "", correctValue: word[i] }
      this.letters.push(l)
    }
  }

  createDivCoins() {
    const word = this.game.palabra;
    this.coinDifferenceX = (this.posicionXFruit - this.posicionXPacman - this.widthPacman) / (word.length)
    for (let i = 1; i < word.length; i++) {
      let c: Coin = { id: i, x: (this.posicionXPacman + this.widthPacman) + (i * this.coinDifferenceX - this.widthCoin), y: 78, visible: true }
      this.coins.push(c)
    }
  }

  showValues() {
    this.letters.forEach(element => {
      element.value = element.correctValue;
    });
  }

  movePacman() {
    const isLast: boolean = this.isLast()

    if (this.pacman.nativeElement) {
      for (let i = 1; i <= this.coinDifferenceX; i++) {
        setTimeout(() => {
          this.posicionXPacman += 1;
          this.pacman.nativeElement.style.left = `${this.posicionXPacman}px`;
        }, i * 30);
      }
    }

    this.sumPoints(this.coinDifferenceX * 30)
    this.desabledButtons(false, this.coinDifferenceX * 30)

    this.eatCoin(isLast)
  }

  isLast() {
    if (this.counter == this.game.palabra.length - 1) {
      this.coinDifferenceX += this.widthFruit;
      return true;
    } else {
      return false;
    }
  }

  sumPoints(time: number) {
    setTimeout(() => {
      this.points += this.BASE_POINT * this.multiplicador;
      this.multiplicador++;
    }, time);
  }

  resPoints(time: number) {
    setTimeout(() => {
      const ptsPerdidos = Math.floor(this.points * .20)
      this.points = this.points - ptsPerdidos;
      this.puntosPerdidos += ptsPerdidos;
      this.numErrores++;
      this.multiplicador = 1;
    }, time);
  }

  eatCoin(isLast: boolean) {
    setTimeout(() => {
      if (isLast) {
        this.soundEatFruit()
        this.eatedFruit = true;
        this.win()
      } else {
        this.soundEatCoin()
        this.coins[this.counter++].visible = false;
      }

    }, this.coinDifferenceX * 30)
  }

  win() {
    setTimeout(() => {
      this.soundWin()
      this.messaje = "GANASTE"
      this.desabledButtons(true, 1)
      this.guardarPunteo();
    }, 500)
    this.redirect(500 + 5000);
  }

  guardarPunteo() {
    const usuario: Usuario = this.usuarioService.getUsuarioSesion()!;
    const punteo: Punteo = new Punteo(0, this.id_instancia_juego, usuario.id_usuario,this.codigoAula,this.points,this.numErrores,this.puntosPerdidos);
    this.comidoService.guardarPunteo(punteo).subscribe((resp: boolean) => {
      if (resp) {
        console.log("punteo guardado");
      }else{

      }
    })
  }

  moveGhost() {
    const willPacmanDie = this.willPacmanDie();

    if (this.ghost.nativeElement) {
      for (let i = 1; i <= this.coinDifferenceX * 2; i++) {
        setTimeout(() => {
          this.posicionXGhost += 1;
          this.ghost.nativeElement.style.left = `${this.posicionXGhost}px`;
        }, i * 30);
      }
    }

    this.resPoints(this.coinDifferenceX * 30 * 2)
    this.desabledButtons(false, this.coinDifferenceX * 30 * 2)

    if (willPacmanDie) {
      this.eatPacman()
    }
  }

  willPacmanDie() {
    if ((this.posicionXGhost + this.widthGhost + this.coinDifferenceX * 2) > this.posicionXPacman) {
      this.coinDifferenceX = ((this.posicionXPacman) - (this.posicionXGhost + this.widthGhost)) / 2
      return true;
    } else {
      return false;
    }
  }

  eatPacman() {
    setTimeout(() => {
      this.soundDeath()
      this.isPacmanDead = true;
      this.messaje = "PERDISTE"
      this.desabledButtons(true, 1);
      this.guardarPunteo();
    }, this.coinDifferenceX * 2 * 30);
    this.redirect(this.coinDifferenceX * 2 * 30);
  }

  redirect(time: number) {
    setTimeout(() => {
      if (this.esDemo) {
        this.router.navigate([`inicio/principal`])
      } else {
        this.router.navigate([`estudiante/aula/${this.codigoAula}`])
      }
    }, time + 6000);
  }

  soundEatFruit() {
    let audioInicio = new Audio();
    audioInicio.src = "/assets/comido/sonidos/eat_fruit.wav";
    audioInicio.load();
    audioInicio.play();
  }

  soundEatCoin() {
    let audioInicio = new Audio();
    audioInicio.src = "/assets/comido/sonidos/credit.wav";
    audioInicio.load();
    audioInicio.play();
  }

  soundStartGame() {
    let audioInicio = new Audio();
    audioInicio.src = "/assets/comido/sonidos/game_start.wav";
    audioInicio.load();
    audioInicio.play();
  }

  soundDeath() {
    let audioInicio = new Audio();
    audioInicio.src = "/assets/comido/sonidos/death_1.wav";
    audioInicio.load();
    audioInicio.play();
  }

  soundWin() {
    let audioInicio = new Audio();
    audioInicio.src = "/assets/comido/sonidos/win.wav";
    audioInicio.load();
    audioInicio.play();
  }

  validation() {
    this.errorMessaje = "";
    if (!this.inputLetter) {
      this.errorMessaje = "Ingresa una letra"
      return;
    }
    if (this.inputLetter.length > 1) {
      this.errorMessaje = "Solo debes ingresar una letra"
      return;
    }

    this.desabledButtons(true, 1)


    const itFound = this.findLetter();
    if (itFound) {
      this.movePacman()
    } else {
      this.moveGhost()
    }

    this.inputLetter = "";
  }

  findLetter(): boolean {
    for (let i = 0; i < this.letters.length; i++) {
      if (!this.letters[i].value) {
        if (this.letters[i].correctValue.toLowerCase() == this.inputLetter.toLowerCase()) {
          this.letters[i].value = this.letters[i].correctValue
          return true;
        }
      }
    }
    return false;
  }

  desabledButtons(activate: boolean, time: number) {
    setTimeout(() => {
      this.inputLett.nativeElement.disabled = activate;
      this.btnIng.nativeElement.disabled = activate;
    }, time);
  }
}

