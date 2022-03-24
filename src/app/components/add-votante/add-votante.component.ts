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

import { CifrarService } from 'src/app/services/cifrar.service';

@Component({
  selector: 'app-add-votante',
  templateUrl: './add-votante.component.html',
  styleUrls: ['./add-votante.component.css'],
})
export class AddVotanteComponent implements OnInit {
  formVotante = new FormGroup({});
  claveKey = '123456$#@$^@1ERF';

  constructor(
    private formBuilder: FormBuilder,
    private _loginService: LoginService,
    private router: Router,
    private EncrDecr: CifrarService
  ) {
    this.formVotante = this.formBuilder.group({
      nombre: ['', Validators.required],
      curp: ['', Validators.required],
      password: ['', Validators.required],
      estado: ['Aguascalientes', Validators.required],
    });
  }

  ngOnInit(): void {}

  submit() {
    console.log(this.formVotante.value);

    if (this.formVotante.valid) {
      const USER: User = {
        curp: this.EncrDecr.set(this.claveKey, this.formVotante.value.curp),
        password: this.EncrDecr.set(
          this.claveKey,
          this.formVotante.value.password
        ),
        nombre: this.EncrDecr.set(this.claveKey, this.formVotante.value.nombre),
        level: 3,
        estado: this.EncrDecr.set(this.claveKey, this.formVotante.value.estado),
        yaVoto: 0,
      };
      this._loginService.addUser(USER).then(
        () => {
          console.log('votante registrado');
          alert('Registrado');
          this.formVotante.reset();
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
