export interface NotiSolicitudAulaI {
  id_noti_solicitud_aula: number,
  id_usuario_solicitante: number,
  codigo_aula: string,
  nombre_aula: string,
  nombre: string,
  apellido: string,
  usuario: string
}

export interface NotiAceptadoAulaI {
  id_noti_aceptado_aula: number,
  codigo_aula: string,
  nombre_aula: string
}

export interface NotiRechazadoAulaI {
  id_noti_rechazado_aula: number,
  codigo_aula: string,
  nombre_aula: string
}
