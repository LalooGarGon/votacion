export class User {
  id?: string;
  curp: string;
  password: string;
  nombre: string;
  level: number;
  estado: string;
  yaVoto: number;

  constructor(
    curp: string,
    password: string,
    nombre: string,
    level: number,
    estado: string,
    yaVoto: number
  ) {
    this.curp = curp;
    this.password = password;
    this.nombre = nombre;
    this.level = level;
    this.estado = estado;
    this.yaVoto = yaVoto;
  }
}
