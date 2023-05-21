export class Publicacion {
  constructor(
    public id_publicacion: number,
    public id_usuario: number,
    public codigo_aula: string,
    public contenido_publicacion: string
  ) { }
}
