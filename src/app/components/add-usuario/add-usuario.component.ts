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
  selector: 'app-add-usuario',
  templateUrl: './add-usuario.component.html',
  styleUrls: ['./add-usuario.component.css'],
})
export class AddUsuarioComponent implements OnInit {
  formUsuario = new FormGroup({});
  claveKey = '123456$#@$^@1ERF';

  constructor(
    private formBuilder: FormBuilder,
    private _loginService: LoginService,
    private router: Router,
    private EncrDecr: CifrarService
  ) {
    this.formUsuario = this.formBuilder.group({
      nombre: ['', Validators.required],
      curp: ['', Validators.required],
      password: ['', Validators.required],
      estado: ['Aguascalientes', Validators.required],
      level: [1, Validators.required],
    });
  }

  ngOnInit(): void {}

  submit() {
    console.log(this.formUsuario.value);

    if (this.formUsuario.valid) {
      const USER: User = {
        curp: this.EncrDecr.set(this.claveKey, this.formUsuario.value.curp),
        password: this.EncrDecr.set(
          this.claveKey,
          this.formUsuario.value.password
        ),
        nombre: this.EncrDecr.set(this.claveKey, this.formUsuario.value.nombre),
        level: this.formUsuario.value.level,
        estado: this.EncrDecr.set(this.claveKey, this.formUsuario.value.estado),
        yaVoto: 0,
      };
      this._loginService.addUser(USER).then(
        () => {
          console.log('votante registrado');
          alert('Registrado');
          this.formUsuario.reset();
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
