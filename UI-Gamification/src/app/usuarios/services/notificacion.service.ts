import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsuarioService } from './usuario.service';
import { NotiSolicitudAula } from 'src/models/notificaciones/NotiSolicitudAula';
import { Observable } from 'rxjs';
import { Usuario } from 'src/models/usuarios/Usuario';
import { NotiAceptadoAulaI, NotiRechazadoAulaI, NotiSolicitudAulaI } from 'src/models/notificaciones/interfaces/NotificacionesInterfaces';
import { NotiAceptadoAula } from 'src/models/notificaciones/NotiAceptadoAula';
import { NotiRechazadoAula } from 'src/models/notificaciones/NotiRechazadoAula';

interface Noti {
  id_noti: number;
}

@Injectable({
  providedIn: 'root'
})
export class NotificacionService {

  private baseUrl: string = "http://localhost:3000/api/notificaciones/";

  constructor(
    private http: HttpClient,
    private usuarioService: UsuarioService
  ) { }

  //Notificacion solicitu para unirse a un aula
  guardarNotiSolicitudAula(noti: NotiSolicitudAula): Observable<boolean> {
    return this.http.post<boolean>(`${this.baseUrl}guardar-noti-solicitu-aula`, noti);
  }

  getNotiSolicitudesAula(): Observable<NotiSolicitudAulaI[]> {
    const usuario: Usuario = this.usuarioService.getUsuarioSesion()!;
    return this.http.get<NotiSolicitudAulaI[]>(`${this.baseUrl}get-noti-solicitudes-aula?id_usuario=${usuario.id_usuario}`);
  }

  existeNotificacionSolcitiudAula(codigoAula: string): Observable<boolean> {
    const usuario: Usuario = this.usuarioService.getUsuarioSesion()!;
    return this.http.get<boolean>(`${this.baseUrl}existe-noti-solicitud-aula?id_usuario=${usuario.id_usuario}&codigo_aula=${codigoAula}`);
  }

  setVistoNotificacionSolcitiudAula(idNotificacion: number) {
    const noti: Noti = { id_noti: idNotificacion }
    return this.http.put<any>(`${this.baseUrl}set-visto-noti-solicitud-aula`, noti);
  }

  //Notificacion para indiciar que fue aceptado en un aula
  guardarNotiAceptadoAula(noti: NotiAceptadoAula): Observable<boolean> {
    return this.http.post<boolean>(`${this.baseUrl}guardar-noti-aceptado-aula`, noti);
  }

  getNotisAceptadoAula(): Observable<NotiAceptadoAulaI[]> {
    const usuario: Usuario = this.usuarioService.getUsuarioSesion()!;
    return this.http.get<NotiAceptadoAulaI[]>(`${this.baseUrl}get-notis-aceptado-aula?id_usuario=${usuario.id_usuario}`);
  }

  //Notificacion para indiciar que fue rechazado en un aula
  guardarNotiRechazadoAula(noti: NotiRechazadoAula): Observable<boolean> {
    return this.http.post<boolean>(`${this.baseUrl}guardar-noti-rechazado-aula`, noti);
  }

  getNotisRechazadoAula(): Observable<NotiRechazadoAulaI[]> {
    const usuario: Usuario = this.usuarioService.getUsuarioSesion()!;
    return this.http.get<NotiRechazadoAulaI[]>(`${this.baseUrl}get-notis-rechazado-aula?id_usuario=${usuario.id_usuario}`);
  }
}
