export class Aula {
  constructor(
    public codigo_aula: string,
    public id_usuario_creador: number,
    public nombre: string,
    public archivado: boolean
  ) { }
}
