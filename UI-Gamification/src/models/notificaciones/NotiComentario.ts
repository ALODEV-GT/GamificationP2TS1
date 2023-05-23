export class NotiComentario {
  constructor(
    public id_noti_comentario: number,
    public id_usuario_noti: number,
    public id_comentario: number,
    public visto: boolean
  ) { }
}
