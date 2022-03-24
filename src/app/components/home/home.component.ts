import { Component, OnInit } from '@angular/core';
import { Candidato } from 'src/app/models/candidatos';
import { LoginService } from 'src/app/services/login.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { CifrarService } from 'src/app/services/cifrar.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  candidatos: Candidato[] = [];
  cargado: boolean = false;
  estado: any;
  claveKey = '123456$#@$^@1ERF';

  constructor(
    private _loginService: LoginService,
    private router: Router,
    public EncrDecr: CifrarService
  ) {}

  ngOnInit(): void {

    this.estado = localStorage.getItem('estado');
    this.obtenerCandidatos();
  }

  votar(id: any, nombre: string) {

    console.log(nombre);
    console.log(id);
    let nVoto = this._loginService.obtenerVotoCandidato(id).subscribe((doc) => {
      console.log(doc.votos);
      nVoto.unsubscribe();
      let votado = this._loginService
        .votarCandidato(id, doc.votos + 1)
        .then(() => {
          console.log('votado');
          this.router.navigate(['/', 'estadisticas']);
        });
    });
  }

  obtenerCandidatos() {
    this._loginService
      .obtenerCandidatos(this.EncrDecr.set(this.claveKey, this.estado))
      .subscribe((doc) => {
        console.log(doc);

        this.candidatos = [];
        doc.forEach((element: any) => {
          this.candidatos.push({
            id: element.payload.doc.id,
            ...element.payload.doc.data(),
          });
        });
      });
  }
}
