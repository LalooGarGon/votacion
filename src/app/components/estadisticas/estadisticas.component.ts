import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Estadistica } from 'src/app/models/estadisticas';
import { CifrarService } from 'src/app/services/cifrar.service';

import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.css'],
})
export class EstadisticasComponent implements OnInit {
  estado2: any;
  estadoNombre: string = '';
  formEstadistica = new FormGroup({});
  escuchando: boolean = true;

  claveKey = '123456$#@$^@1ERF';
  single: Estadistica[] = [];
  view: [number, number] = [500, 400];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = false;
  showXAxisLabel = true;
  xAxisLabel = 'Candidatos';
  showYAxisLabel = true;
  yAxisLabel = 'Votos';

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA'],
  };

  constructor(
    private formBuilder: FormBuilder,
    private _loginService: LoginService,
    private EncrDecr: CifrarService
  ) {
    this.formEstadistica = this.formBuilder.group({
      estadoEstadistica: ['Aguascalientes', Validators.required],
    });
    // Object.assign(this, { this.single });
    this.estado2 = localStorage.getItem('estado');
    this.estadoNombre = this.estado2;
    try {
      this.getEstadisticas(this.estado2);
    } catch (error) {}
  }

  ngOnInit(): void {}

  getEstadisticas(estado3: any) {
    console.log('Obteniendo ' + estado3);

    let activo = this._loginService
      .obtenerCandidatos(this.EncrDecr.set(this.claveKey, estado3))
      .subscribe(
        (doc) => {
          console.log(this.escuchando);
          if (this.escuchando === false) {
            console.log('Cancelando');

            // activo.unsubscribe();
          }

          this.single = [];
          doc.forEach((element: any) => {
            this.single.push({
              name: this.EncrDecr.get(
                this.claveKey,
                element.payload.doc.data().nombre
              ),
              value: element.payload.doc.data().votos,
            });
          });
          console.log(this.single);
        },
        (error) => {
          console.log('error');
        }
      );
  }

  onSelect(event: any) {
    console.log(event);
  }

  cambiar() {
    console.log(this.formEstadistica.value.estadoEstadistica);
    this.escuchando = false;
    this.getEstadisticas(this.formEstadistica.value.estadoEstadistica);
    this.escuchando = true;
    this.estadoNombre = this.formEstadistica.value.estadoEstadistica;
  }
}
