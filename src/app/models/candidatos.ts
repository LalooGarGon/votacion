export class Candidato {
  id?: string;
  nombre: string;
  frase: string;
  votos: number;
  estado: string;

  constructor(nombre: string, frase: string, votos: number, estado: string) {
    this.nombre = nombre;
    this.frase = frase;
    this.votos = votos;
    this.estado = estado;
  }
}
