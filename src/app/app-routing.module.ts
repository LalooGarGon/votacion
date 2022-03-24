import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCandidatoComponent } from './components/add-candidato/add-candidato.component';
import { AddUsuarioComponent } from './components/add-usuario/add-usuario.component';
import { AddVotanteComponent } from './components/add-votante/add-votante.component';
import { EstadisticasComponent } from './components/estadisticas/estadisticas.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'estadisticas', component: EstadisticasComponent },
  { path: 'agregarVotante', component: AddVotanteComponent },
  { path: 'agregarCandidato', component: AddCandidatoComponent },
  { path: 'agregarUsuario', component: AddUsuarioComponent },
  { path: '', pathMatch: 'full', redirectTo: 'login' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
