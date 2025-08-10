// src/app/core/services/etudiant.service.ts
import { Injectable } from '@angular/core';
import { Apollo, ApolloBase } from 'apollo-angular';
import { gql } from 'apollo-angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Etudiant } from '../models/etudiant';



// 1. Nouvelle requête GraphQL pour la recherche par prénom
const RECHERCHER_ETUDIANTS_PAR_PRENOM = gql`
  query($prenom: String!) {
    etudiantsParPrenom(prenom: $prenom) {
      id
      matricule
      nom
      prenom
      telephone
      adresse
      classeId
    }
  }
`;

const LISTER_ETUDIANTS = gql`
  query {
    etudiants {
      id
      matricule
      nom
      prenom
      telephone
      adresse
      classeId
    }
  }
`;


@Injectable({
  providedIn: 'root',
})
export class EtudiantService {
  private etudiantClient: ApolloBase;
  private apiUrl = 'http://localhost:8080/api/etudiant';

  constructor(private apollo: Apollo, private http: HttpClient) {
    // this.apolloClient = this.apollo.use('etudiantClient');
    this.etudiantClient = this.apollo.use('etudiantClient');

    // this.apolloClient = this.apollo;
  }


  listerEtudiants(): Observable<Etudiant[]> {
    return this.etudiantClient
      .watchQuery<{ etudiants: Etudiant[] }>({
        query: LISTER_ETUDIANTS,
      })
      .valueChanges.pipe(map((result) => result.data.etudiants));
  }

  ajouterEtudiant(etudiant: Etudiant): Observable<Etudiant> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<Etudiant>(this.apiUrl + '/', etudiant, { headers });
  }

  modifierEtudiant(id: string, etudiant: Etudiant): Observable<Etudiant> {
    return this.http.put<Etudiant>(`${this.apiUrl}/${id}`, etudiant);
  }

  supprimerEtudiant(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // 2. Nouvelle méthode pour la recherche
  rechercherEtudiantsParPrenom(prenom: string): Observable<Etudiant[]> {
    return this.etudiantClient
      .watchQuery<{ etudiantsParPrenom: Etudiant[] }>({ // Notez le nom ici aussi
        query: RECHERCHER_ETUDIANTS_PAR_PRENOM,
        variables: {
          prenom,
        },
      })
      .valueChanges.pipe(map((result) => result.data.etudiantsParPrenom)); // Et ici
  }
  

}