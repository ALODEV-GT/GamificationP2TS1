export interface Rep1 {
  codigo: string;
  registros: Registro[];
}

export interface Registro {
  id_instancia_juego: number;
  nombre_usuario: string;
  apellido: string;
  usuario: string;
  nombre_partida: string;
  numero_errores: number;
  puntos_perdidos: number;
  puteo: number;
}


export interface JuegoCompartidoI {
  id_instancia_juego: number,
  id_tipo_juego: number,
  nombre: string
}

