export class NotiRechazadoAula {
  constructor(
    public id_noti_rechazado_aula: number,
    public id_usuario_noti: number,
    public codigo_aula: string,
    public visto: boolean
  ) { }
}
