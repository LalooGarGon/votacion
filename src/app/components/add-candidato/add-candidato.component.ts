import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { User } from 'src/app/models/user';
import { LoginService } from 'src/app/services/login.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ThisReceiver } from '@angular/compiler';
import { Candidato } from 'src/app/models/candidatos';

import { CifrarService } from 'src/app/services/cifrar.service';

@Component({
  selector: 'app-add-candidato',
  templateUrl: './add-candidato.component.html',
  styleUrls: ['./add-candidato.component.css'],
})
export class AddCandidatoComponent implements OnInit {
  formCandidato = new FormGroup({});
  claveKey = '123456$#@$^@1ERF';

  constructor(
    private formBuilder: FormBuilder,
    private _loginService: LoginService,
    private router: Router,
    private EncrDecr: CifrarService
  ) {
    this.formCandidato = this.formBuilder.group({
      nombre: ['', Validators.required],
      frase: ['', Validators.required],
      estado: ['Aguascalientes', Validators.required],
    });
  }

  ngOnInit(): void {}

  submit() {
    console.log(this.formCandidato.value);

    if (this.formCandidato.valid) {
      const CANDIDATO: Candidato = {
        nombre: this.EncrDecr.set(
          this.claveKey,
          this.formCandidato.value.nombre
        ),
        frase: this.EncrDecr.set(this.claveKey, this.formCandidato.value.frase),
        votos: 0,
        estado: this.EncrDecr.set(
          this.claveKey,
          this.formCandidato.value.estado
        ),
      };
      this._loginService.addCandidato(CANDIDATO).then(
        () => {
          alert('Candidato Registrado');
          console.log('candidato registrado');
          this.formCandidato.reset();
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      alert('Completa los campos');
    }
  }
}
