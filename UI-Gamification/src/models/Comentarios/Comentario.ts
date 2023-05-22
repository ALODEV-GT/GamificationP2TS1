export class Comentario {
  constructor(
    public id_comentario: number,
    public id_publicacion: number,
    public id_usuario: number,
    public comentario: string
  ) { }
}
