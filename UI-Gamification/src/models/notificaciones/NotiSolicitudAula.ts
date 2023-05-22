export class NotiSolicitudAula {
  constructor(
    public id_noti_solicitud_aula: number,
    public id_usuario_noti: number,
    public id_usuario_solicitante: number,
    public codigo_aula: string,
    public visto: boolean
  ) { }
}
