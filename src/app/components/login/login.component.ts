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
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  aFormGroup = new FormGroup({});
  claveKey = '123456$#@$^@1ERF';

  constructor(
    private formBuilder: FormBuilder,
    private _loginService: LoginService,
    private router: Router,
    private EncrDecr: CifrarService
  ) {}

  ngOnInit(): void {
    if (localStorage.getItem('logueado') == '1') {
      this.router.navigate(['/', 'home']);
    }

    this.aFormGroup = this.formBuilder.group({
      curp: ['', Validators.required],
      password: ['', Validators.required],
      recaptcha2: [],
    });
  }

  siteKey: string = '6LfaegEfAAAAAL5mDbj1hoBljDm8YlUawf8mxkKZ';

  submit() {
    if (this.aFormGroup.valid) {
      /*const USER: User = {
        curp: this.aFormGroup.value.curp,
        password: this.aFormGroup.value.password,
        nombre: 'Yomero',
        level: 2,
      };
      this._loginService.addUser(USER).then(
        () => {
          console.log('tarjeta registrado');
          this.aFormGroup.reset();
        },
        (error) => {
          console.log(error);
        }
      );*/

      const USER: User = {
        curp: this.EncrDecr.set(this.claveKey, this.aFormGroup.value.curp),
        password: this.EncrDecr.set(
          this.claveKey,
          this.aFormGroup.value.password
        ),
        nombre: '',
        level: 0,
        estado: '',
        yaVoto: 0,
      };

      this._loginService.getUser(USER).subscribe((doc) => {
        if (doc.length == 0) {
          alert('Datos no encontrados');
          this.aFormGroup.reset();
        } else {
          doc.forEach((element: any) => {
            if (USER.password == element.password) {
              console.log(element);
              console.log(element.level);
              localStorage.removeItem('level');
              localStorage.setItem('level', element.level);
              localStorage.removeItem('estado');
              localStorage.setItem(
                'estado',
                this.EncrDecr.get(this.claveKey, element.estado)
              );
              localStorage.removeItem('yaVoto');
              localStorage.setItem('yaVoto', element.yaVoto);
              localStorage.setItem('logueado', '1');
              this.router.navigate(['/', 'home']);
            } else {
              alert('Credenciales incorrectas');
            }
          });
        }
      });
    } else {
      alert('Completa los campos');
    }
  }
}
