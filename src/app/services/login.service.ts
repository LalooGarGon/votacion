import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, Subject } from 'rxjs';
import { User } from '../models/user';
import { Candidato } from '../models/candidatos';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private user$ = new Subject<any>();
  private candidato$ = new Subject<any>();

  constructor(private firestore: AngularFirestore) {}

  addUser(user: User): Promise<any> {
    return this.firestore.collection('users').add(user);
  }

  getUser(user: User): Observable<any> {
    return this.firestore
      .collection('users', (ref) => ref.where('curp', '==', user.curp))
      .valueChanges();
  }

  addCandidato(candidato: Candidato): Promise<any> {
    return this.firestore.collection('candidatos').add(candidato);
  }

  obtenerCandidatos(estado: string): Observable<any> {
    return this.firestore
      .collection('candidatos', (ref) => ref.where('estado', '==', estado))
      .snapshotChanges();
  }

  obtenerVotoCandidato(id: any): Observable<any> {
    return this.firestore.collection('candidatos').doc(id).valueChanges();
  }

  votarCandidato(id: any, nuevosVotos: any): Promise<any> {
    return this.firestore
      .doc(`candidatos/${id}`)
      .update({ votos: nuevosVotos });
  }
}
