import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxCaptchaModule } from 'ngx-captcha';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { HomeComponent } from './components/home/home.component';

import { EstadisticasComponent } from './components/estadisticas/estadisticas.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { AddVotanteComponent } from './components/add-votante/add-votante.component';
import { AddCandidatoComponent } from './components/add-candidato/add-candidato.component';
import { NavComponent } from './components/nav/nav.component';

import { CifrarService } from './services/cifrar.service';
import { AddUsuarioComponent } from './components/add-usuario/add-usuario.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    EstadisticasComponent,
    AddVotanteComponent,
    AddCandidatoComponent,
    NavComponent,
    AddUsuarioComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    NgxCaptchaModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    NgxChartsModule,
    AppRoutingModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
  ],
  providers: [CifrarService],
  bootstrap: [AppComponent],
})
export class AppModule {}
