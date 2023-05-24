export class Punteo {
  constructor(
    public id_puntuacion: number,
    public id_instancia_juego: number,
    public id_usuario: number,
    public codigo_aula: string,
    public puteo: number,
    public numero_errores: number,
    public puntos_perdidos: number
  ) { }
}
